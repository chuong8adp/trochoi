// Các bộ màu mẫu để bé thực hiện pha trộn
const colorLessons = [
    { target: "orange", name: "CAM", components: ["red", "yellow"], hint: "Đỏ + Vàng" },
    { target: "green", name: "XANH LÁ", components: ["blue", "yellow"], hint: "Xanh dương + Vàng" },
    { target: "purple", name: "TÍM", components: ["red", "blue"], hint: "Đỏ + Xanh dương" }
];

const extraColors = ["pink", "brown", "black", "white", "cyan"];
let currentLesson = {};
let selectedColors = [];

const paper = document.getElementById("drawing-paper");
const paperHint = document.getElementById("paper-hint");
const palette = document.getElementById("palette");
const successTick = document.getElementById("success-tick");

function initGame() {
    // Reset toàn bộ trạng thái về ban đầu
    selectedColors = [];
    paper.style.backgroundColor = "white";
    paperHint.style.display = "block";
    successTick.style.display = "none";
    palette.innerHTML = "";

    // Chọn ngẫu nhiên 1 màu mục tiêu mới
    currentLesson = colorLessons[Math.floor(Math.random() * colorLessons.length)];
    
    document.getElementById("target-color-circle").style.backgroundColor = currentLesson.target;
    document.getElementById("target-name").innerText = currentLesson.name;
    document.getElementById("formula-hint").innerText = `(Gợi ý: ${currentLesson.hint})`;

    // Chuẩn bị danh sách 5 màu (2 màu đúng + 3 màu nhiễu)
    let colorsForPalette = [...currentLesson.components];
    let shuffledExtras = [...extraColors].sort(() => 0.5 - Math.random());
    colorsForPalette.push(...shuffledExtras.slice(0, 3));
    
    // Xáo trộn vị trí các màu trên khay chọn
    colorsForPalette.sort(() => 0.5 - Math.random());

    colorsForPalette.forEach(color => {
        const div = document.createElement("div");
        div.className = "color-item";
        div.style.backgroundColor = color;
        div.dataset.color = color;
        div.onclick = () => {
            if (selectedColors.includes(color)) {
                selectedColors = selectedColors.filter(c => c !== color);
                div.classList.remove("selected");
            } else if (selectedColors.length < 2) {
                selectedColors.push(color);
                div.classList.add("selected");
            }
        };
        palette.appendChild(div);
    });
}

// Xử lý khi bé nhấp vào tờ giấy để "quệt" màu
paper.onclick = () => {
    if (selectedColors.length === 0) return;
    
    paperHint.style.display = "none";
    let mixedColor = "white";
    const sortedSelection = [...selectedColors].sort().join("+");
    const sortedCorrect = [...currentLesson.components].sort().join("+");

    if (selectedColors.length === 1) {
        mixedColor = selectedColors[0];
    } else if (sortedSelection === sortedCorrect) {
        mixedColor = currentLesson.target;
    } else {
        mixedColor = "#8d6e63"; // Màu nâu xám nếu pha sai quy tắc
    }

    paper.style.backgroundColor = mixedColor;

    // Nếu pha đúng màu mục tiêu, hiển thị dấu tích xanh
    if (mixedColor === currentLesson.target) {
        successTick.style.display = "block";
    } else {
        successTick.style.display = "none";
    }
};

document.getElementById("resetBtn").onclick = initGame;

function goHome() {
    window.location.href = "../../index.html";
}

// Khởi tạo trò chơi khi vừa mở trang
window.onload = initGame;