// ===== MODEL =====
const correctOrder = {
    seed: "seed",     // Gieo hạt
    sprout: "sprout", // Nảy mầm
    flower: "flower", // Ra hoa
    fruit: "fruit"    // Kết quả
};

let draggedItem = null;
let correctCount = 0;

const soundCorrect = document.getElementById("sound-correct");
const soundWrong = document.getElementById("sound-wrong");
const videoBtn = document.getElementById("videoBtn");
const videoOverlay = document.getElementById("videoOverlay");
const closeVideo = document.getElementById("closeVideo");
const video = document.getElementById("rainVideo");

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
            soundCorrect.currentTime = 0;
            soundCorrect.play();

            slot.innerHTML = "";
            const img = draggedItem.querySelector("img").cloneNode(true);
            slot.appendChild(img);

            slot.style.border = "3px solid #4caf50";
            draggedItem.remove();
            draggedItem = null;
            correctCount++;

            if (correctCount === 4) {
                videoBtn.classList.remove("hidden");
            }
        } else {
            soundWrong.currentTime = 0;
            soundWrong.play();
            slot.classList.add("shake");
            setTimeout(() => slot.classList.remove("shake"), 300);
        }
    });
});

// Điều khiển Video
videoBtn.addEventListener("click", () => {
    videoOverlay.classList.remove("hidden");
    video.play();
});

closeVideo.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    video.pause();
    video.currentTime = 0;
    videoOverlay.classList.add("hidden");
});

function goHome() {
    window.location.href = "../../index.html";
}