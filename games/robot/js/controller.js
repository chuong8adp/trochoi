let isRunning = false;
let currentStep = 0;

// ================== HỆ THỐNG ÂM THANH ==================

// 1. Phát âm thanh giọng nói (Web Speech API)
function speak(text) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = 'vi-VN';
  msg.rate = 1.1;     
  window.speechSynthesis.speak(msg);
}

// 2. Tạo tiếng "Bíp" khi di chuyển (Sử dụng Web Audio API - không cần file)
function playMoveSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "sine";
  oscillator.frequency.value = 800;
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); 

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1); 
}

// 3. Khai báo âm thanh thắng/thua (Dùng link mẫu, bạn có thể thay bằng file nội bộ)
const sounds = {
  win: new Audio('https://actions.google.com/sounds/v1/cartoon/clapping_festive_crowd.ogg'),
  fail: new Audio('https://actions.google.com/sounds/v1/cartoon/boing.ogg')
};

// ================== ĐIỀU KHIỂN CHÍNH ==================

document.addEventListener("DOMContentLoaded", () => {
  restart();

  // Thêm lệnh khi bấm nút
  document.querySelectorAll("button[data-cmd]").forEach(btn => {
    btn.onclick = () => {
      const cmd = btn.dataset.cmd;
      Model.program.push(cmd);
      View.drawProgram();

      // Giọng nói hướng dẫn khi bé chọn lệnh
      const commands = { "up": "Đi lên", "down": "Đi xuống", "left": "Sang trái", "right": "Sang phải" };
      speak(commands[cmd]);
    };
  });

  // Chạy robot
  document.getElementById("run").onclick = async () => {
    if (isRunning || Model.program.length === 0) return;

    isRunning = true;
    speak("Robot xuất phát!");

    while (currentStep < Model.program.length) {
      const cmd = Model.program[currentStep];
      currentStep++;

      // Phát tiếng bíp và di chuyển
      playMoveSound();
      moveRobot(cmd);
      View.drawGrid();
      View.drawProgram(currentStep - 1); // Highlight lệnh đang chạy
      
      await delay(500); // Tăng delay một chút để bé kịp nhìn

      if (hitObstacle()) {
        sounds.fail.play();
        speak("Ôi không! Đụng phải đá rồi.");
        showPopup("😢 Ôi không!", "Robot đã va vào chướng ngại vật rồi!");
        return;
      }

      if (reachTarget()) {
        sounds.win.play();
        speak("Tuyệt quá! Bé đã giúp robot sạc pin thành công.");
        showPopup("🎉 Giỏi quá!", "Robot đã sạc được pin thành công!");
        return;
      }
    }

    isRunning = false;
    if (currentStep >= Model.program.length && !reachTarget()) {
        speak("Hết lệnh rồi mà vẫn chưa tới nơi. Bé thử lại nhé!");
    }
  };

  document.getElementById("reset").onclick = () => {
      speak("Làm lại nào!");
      restart();
  };
});

// Các hàm moveRobot, hitObstacle, reachTarget, restart, delay, showPopup giữ nguyên như cũ...
function moveRobot(cmd) {
  if (cmd === "up" && Model.robot.y > 0) Model.robot.y--;
  if (cmd === "down" && Model.robot.y < Model.size - 1) Model.robot.y++;
  if (cmd === "left" && Model.robot.x > 0) Model.robot.x--;
  if (cmd === "right" && Model.robot.x < Model.size - 1) Model.robot.x++;
}

function hitObstacle() {
  return Model.obstacles.some(o => o.x === Model.robot.x && o.y === Model.robot.y);
}

function reachTarget() {
  return (Model.robot.x === Model.target.x && Model.robot.y === Model.target.y);
}

function restart() {
  isRunning = false;
  currentStep = 0;
  Model.reset();
  View.drawGrid();
  View.drawProgram();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showPopup(title, message) {
  const popup = document.getElementById("popup");
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-message").textContent = message;
  popup.classList.remove("hidden");

  document.getElementById("popup-close").onclick = () => {
    popup.classList.add("hidden");
    restart();
  };
}

function goHome() {
    window.location.href = "../../index.html";
}