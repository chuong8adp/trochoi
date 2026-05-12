// ===== MODEL =====
const correctOrder = {
    egg: "egg",
    larva: "larva",
    pupa: "pupa",
    butterfly: "butterfly"
};

let draggedItem = null;
let correctCount = 0;

// Âm thanh
const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");

// Video
const videoBtn = document.getElementById("videoBtn");
const videoOverlay = document.getElementById("videoOverlay");
const closeVideo = document.getElementById("closeVideo");
const video = document.getElementById("butterflyVideo");

// ===== CONTROLLER =====
document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("dragstart", () => {
        draggedItem = item;
    });
});

document.querySelectorAll(".slot").forEach(slot => {

    slot.addEventListener("dragover", e => {
        e.preventDefault();
    });

    slot.addEventListener("drop", () => {
        if (!draggedItem) return;

        const slotType = slot.dataset.slot;
        const itemType = draggedItem.dataset.item;

        if (correctOrder[slotType] === itemType) {

            // ÂM THANH ĐÚNG
            soundCorrect.currentTime = 0;
            soundCorrect.play();

            // XÓA NỘI DUNG CŨ
            slot.innerHTML = "";

            // CLONE ẢNH
            const img = draggedItem.querySelector("img").cloneNode(true);
            slot.appendChild(img);

            slot.style.border = "3px solid #4caf50";

            draggedItem.remove();
            draggedItem = null;

            correctCount++;

            // HIỆN NÚT VIDEO KHI ĐÚNG 4 Ô
            if (correctCount === 4) {
                videoBtn.classList.remove("hidden");
            }

        } else {
            // ÂM THANH SAI
            soundWrong.currentTime = 0;
            soundWrong.play();

            slot.classList.add("shake");
            setTimeout(() => slot.classList.remove("shake"), 300);
        }
    });
});

// ===== VIDEO CONTROL =====
videoBtn.addEventListener("click", () => {
    videoOverlay.classList.remove("hidden");
    video.play();
});

closeVideo.addEventListener("click", () => {
    // Thoát fullscreen nếu có
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    // Dừng và reset video
    video.pause();
    video.currentTime = 0;

    // Ẩn overlay
    videoOverlay.classList.add("hidden");
});

function goHome() {
    window.location.href = "../../index.html";
}
