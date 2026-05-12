let draggedItem = null;
let originSlot = null;
const sourceContainer = document.getElementById("source-items");

// Hàm xáo trộn vị trí thức ăn
function shuffleItems() {
    const items = Array.from(sourceContainer.children);
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        sourceContainer.appendChild(items[j]);
    }
}

// Khởi tạo sự kiện kéo cho các phần tử
function initDragEvents(el) {
    el.addEventListener("dragstart", (e) => {
        draggedItem = el;
        originSlot = el.parentElement;
        el.style.opacity = "0.5";
    });
    el.addEventListener("dragend", () => {
        el.style.opacity = "1";
    });
}

// Gán sự kiện ban đầu cho khay thức ăn
document.querySelectorAll(".item").forEach(initDragEvents);

// Thiết lập các ô thả
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("dragover", e => e.preventDefault());

    slot.addEventListener("drop", (e) => {
        e.preventDefault();
        if (!draggedItem) return;

        // Nếu ô mục tiêu đã có hình, không cho đè
        if (slot.children.length > 0) return;

        // Nếu kéo từ một ô thả khác sang, xóa dữ liệu ô cũ
        if (originSlot.classList.contains("slot")) {
            originSlot.innerHTML = "";
            delete originSlot.dataset.currentCount;
        }

        // Tạo bản sao vật thể vào ô mới
        const newItem = draggedItem.cloneNode(true);
        newItem.style.width = "95%";
        newItem.style.height = "95%";
        newItem.style.border = "none";
        initDragEvents(newItem); // Cho phép hình ở ô này tiếp tục được kéo đi

        slot.appendChild(newItem);
        slot.dataset.currentCount = draggedItem.dataset.count;

        // Nếu kéo từ khay ban đầu, ẩn hình gốc đi
        if (originSlot.id === "source-items") {
            draggedItem.style.visibility = "hidden";
        }
    });
});

// Nút Kiểm tra kết quả
document.getElementById("submitBtn").addEventListener("click", () => {
    let allCorrect = true;
    document.querySelectorAll(".slot").forEach(slot => {
        slot.classList.remove("correct", "wrong");

        if (slot.dataset.currentCount) {
            if (slot.dataset.currentCount === slot.dataset.count) {
                slot.classList.add("correct");
            } else {
                slot.classList.add("wrong");
                allCorrect = false;
            }
        } else {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        document.getElementById("sound-correct").play();
    } else {
        document.getElementById("sound-wrong").play();
    }
});

// Nút Làm lại
document.getElementById("resetBtn").addEventListener("click", () => {
    // Xóa ô thả
    document.querySelectorAll(".slot").forEach(slot => {
        slot.innerHTML = "";
        slot.classList.remove("correct", "wrong");
        delete slot.dataset.currentCount;
    });

    // Hiện lại khay chọn và xáo trộn
    document.querySelectorAll(".item").forEach(item => {
        item.style.visibility = "visible";
        item.style.opacity = "1";
    });
    shuffleItems();
});

function goHome() {
    window.location.href = "../../index.html";
}

// Xáo trộn ngay khi vào trang
window.onload = shuffleItems;