const View = {
  drawGrid() {
    // Giữ nguyên code cũ của bạn...
    const grid = document.getElementById("grid");
    if (!grid) return;
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${Model.size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${Model.size}, 1fr)`;
    for (let y = 0; y < Model.size; y++) {
      for (let x = 0; x < Model.size; x++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        if (x === Model.robot.x && y === Model.robot.y) cell.classList.add("robot");
        if (Model.target && x === Model.target.x && y === Model.target.y) cell.classList.add("target");
        if (Model.obstacles.some(o => o.x === x && o.y === y)) cell.classList.add("obstacle");
        grid.appendChild(cell);
      }
    }
  },

  drawProgram(activeIndex = -1) { // Thêm tham số activeIndex
    const programList = document.getElementById("program");
    if (!programList) return;

    programList.innerHTML = "";
    Model.program.forEach((cmd, index) => {
      const li = document.createElement("li");
      li.textContent =
        cmd === "up" ? "⬆" :
        cmd === "down" ? "⬇" :
        cmd === "left" ? "⬅" : "➡";

      // Nếu là lệnh đang thực hiện thì thêm class active
      if (index === activeIndex) {
        li.classList.add("active");
      }

      programList.appendChild(li);
    });
  }
};