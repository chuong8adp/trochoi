let draggedItem = null;
const soundCorrect = document.getElementById("sound-correct");
const mainCup = document.getElementById("main-cup");

document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", () => draggedItem = item);
});

mainCup.addEventListener("dragover", e => e.preventDefault());

mainCup.addEventListener("drop", (e) => {
    if (!draggedItem) return;

    const type = draggedItem.dataset.type; // float hoặc sink
    soundCorrect.play();

    // Tạo bản sao để hiện trong cốc
    const clone = draggedItem.querySelector("img").cloneNode(true);
    clone.classList.add("placed-item");
    
    // TÍNH TOÁN VỊ TRÍ ĐỂ KHÔNG TRÙNG LẶP
    // left: ngẫu nhiên từ 10% đến 80% chiều rộng cốc
    const randomLeft = Math.floor(Math.random() * 70) + 10; 
    clone.style.left = randomLeft + "%";

    if (type === "float") {
        // Vật nổi: nằm ở tầng mặt nước (khoảng 25% - 35% từ trên xuống)
        const randomTop = Math.floor(Math.random() * 10) + 25;
        clone.style.top = randomTop + "%";
        clone.classList.add("float-anim");
    } else {
        // Vật chìm: nằm ở đáy cốc (khoảng 80% - 85% từ trên xuống)
        const randomBottom = Math.floor(Math.random() * 5) + 80;
        clone.style.top = randomBottom + "%";
        clone.classList.add("sink-anim");
    }

    mainCup.appendChild(clone);

    // Ẩn vật ở khay chọn
    draggedItem.classList.add("fade-out");
    draggedItem = null;
});

function goHome() {
    window.location.href = "../../index.html";
}