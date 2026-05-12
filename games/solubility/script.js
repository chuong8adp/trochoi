let draggedItem = null;

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

// Thiết lập kéo
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", () => {
        draggedItem = item;
    });
});

// Thiết lập thả
document.querySelectorAll(".slot").forEach(slot => {
    slot.addEventListener("dragover", e => {
        e.preventDefault();
    });

    slot.addEventListener("drop", () => {
        if (!draggedItem) return;

        const slotType = slot.dataset.slot;
        const itemType = draggedItem.dataset.item;

        if (slotType === itemType) {
            soundCorrect.currentTime = 0;
            soundCorrect.play();
            
            // Tạo bản sao hiệu ứng trong cốc
            const clone = draggedItem.querySelector("img").cloneNode(true);
            slot.appendChild(clone);

            if (itemType === "dissolve") {
                clone.className = "dissolving";
            } else {
                clone.className = "sinking";
            }

            // Hình ảnh ở khay chọn biến mất
            draggedItem.classList.add("fade-out");
            draggedItem = null;
        } else {
            soundWrong.currentTime = 0;
            soundWrong.play();
            slot.classList.add("shake");
            setTimeout(() => slot.classList.remove("shake"), 300);
        }
    });
});

function goHome() {
    window.location.href = "../../index.html";
}