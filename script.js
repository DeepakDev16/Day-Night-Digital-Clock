const clockElement = document.getElementById("clock");
const greetingElement = document.getElementById("greeting");
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

// 🌗 Auto-detect theme
(function autoTheme() {
  const hour = new Date().getHours();
  if (hour >= 19 || hour < 6) {
    body.classList.add("night-mode");
    toggleBtn.textContent = "☀️ Day Mode";
  } else {
    body.classList.add("day-mode");
    toggleBtn.textContent = "🌙 Night Mode";
  }
})();

// 🕒 Update Clock + Greeting
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  const h12 = hours % 12 || 12;
  const timeString = `
    ${h12.toString().padStart(2, "0")}:
    ${minutes.toString().padStart(2, "0")}:
    ${seconds.toString().padStart(2, "0")} 
    <span class="ampm">${ampm}</span>`;
  clockElement.innerHTML = timeString;

  // Dynamic greeting
  if (hours < 12) greetingElement.textContent = "Good Morning ☀️";
  else if (hours < 17) greetingElement.textContent = "Good Afternoon 🌤️";
  else if (hours < 20) greetingElement.textContent = "Good Evening 🌇";
  else greetingElement.textContent = "Good Night 🌙";
}
setInterval(updateClock, 1000);
updateClock();

// 🌙 Theme Toggle
toggleBtn.addEventListener("click", () => {
  const isNight = body.classList.toggle("night-mode");
  body.classList.toggle("day-mode", !isNight);
  toggleBtn.textContent = isNight ? "☀️ Day Mode" : "🌙 Night Mode";
});

// 💫 Floating Particles Animation
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedY = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = body.classList.contains("night-mode") ? "rgba(255,255,255,0.7)" : "rgba(255,255,200,0.7)";
    ctx.fill();
  }
}
function initParticles() {
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animate);
}
initParticles();
animate();
