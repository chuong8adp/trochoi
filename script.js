// const gameGrid = document.getElementById("gameGrid");

// for (let i = 1; i <= 15; i++) {
//     const gameCard = document.createElement("div");
//     gameCard.className = "game-card";
//     gameCard.innerHTML = `
//         <div class="game-img">🎮</div>
//         <p>Trò chơi ${i}</p>
//     `;

//     gameCard.onclick = () => openGame(i);

//     gameGrid.appendChild(gameCard);
// }

// function openGame(id) {
//     alert("Bạn chọn trò chơi " + id);
// }
const gameGrid = document.getElementById("gameGrid");


// Danh sách game
const games = [
    { id: 1, name: "Quy Trình Phát Triển Của Bướm", category: "giaoduc", url: "games/butterfly/butterfly.html" },
    { id: 2, name: "Truy Tìm Pin Năng Lượng", category: "giaoduc", url: "games/robot/robot.html" },
    { id: 3, name: "Quy Trình Tạo Mưa", category: "giaoduc", url: "games/rain/rain.html" },
    { id: 4, name: "Thi Nghiệm Tan Hay Không Tan", category: "giaoduc", url: "games/solubility/thi-nghiem.html" },
    { id: 5, name: "Thí Nghiệm Vật Nổi Vật Chìm", category: "giaoduc", url: "games/TN/noi-chim.html" },
    { id: 6, name: "Quy Trình Phát Triển Cây Cà Chua", category: "giaoduc", url: "games/tomato/tomato.html" },

    { id: 7, name: "Tô Màu", category: "giaoduc", url: "games/color/to-mau.html" },
    { id: 8, name: "Tương Ứng", category: "giaoduc", url: "games/Tuongung/toan-hoc.html" },
    { id: 9, category: "toan" },

    { id: 10, category: "khoahoc" },
    { id: 11, category: "khoahoc" },
    { id: 12, category: "khoahoc" },

    { id: 13, category: "tuduy" },
    { id: 14, category: "tuduy" },
    { id: 15, category: "tuduy" }
];

// render game
function renderGames(filter) {
    gameGrid.innerHTML = "";

    const filtered = filter === "all"
        ? games
        : games.filter(g => g.category === filter);

    filtered.forEach(game => {
        const div = document.createElement("div");
        div.className = "game-card";
        div.innerHTML = `
            <div class="game-img">🎮</div>
            <p> ${game.name}</p>
        `;

        div.onclick = () => openGame(game);

        gameGrid.appendChild(div);
    });
}

// click sidebar
document.querySelectorAll(".sidebar li").forEach(item => {
    item.addEventListener("click", function () {

        // remove active
        document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");

        const text = this.innerText;

        if (text.includes("Trang chủ")) renderGames("all");
        else if (text.includes("giáo dục")) renderGames("giaoduc");
        else if (text.includes("toán")) renderGames("toan");
        else if (text.includes("khoa học")) renderGames("khoahoc");
        else if (text.includes("tư duy")) renderGames("tuduy");
    });
});

// mặc định load tất cả
renderGames("all");

function openGame(game) {
    if (game.url) {
        window.location.href = game.url;
    } else {
        alert("Game này chưa có!");
    }
}
