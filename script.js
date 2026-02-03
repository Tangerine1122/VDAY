const bg = document.getElementById("bg");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const subtitle = document.getElementById("subtitle");
const hint = document.getElementById("hint");

const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const burst = document.getElementById("burst");

const colors = ["#ff4fa0","#ff6bb2","#ffa0cf","#ff2f8e","#ff84c2","#ffb3dc"];

/* floating pixel hearts */
function spawnBgHeart(){
  const h = document.createElement("div");
  h.className = "floatHeart";
  h.style.left = (Math.random() * 110) + "vw";
  h.style.top = (80 + Math.random() * 50) + "vh";
  h.style.setProperty("--c", colors[Math.floor(Math.random()*colors.length)]);
  h.style.setProperty("--dur", (9 + Math.random()*10).toFixed(2) + "s");
  h.style.setProperty("--s", (0.7 + Math.random()*1.8).toFixed(2));
  h.style.animationDelay = (Math.random()*2.5).toFixed(2) + "s";

  const px = document.createElement("div");
  px.className = "pixel";
  h.appendChild(px);

  bg.appendChild(h);
  setTimeout(() => h.remove(), 24000);
}
for(let i=0;i<14;i++) spawnBgHeart();
setInterval(spawnBgHeart, 700);

/* NO button runs away but stays INSIDE its container (mobile-safe) */
let noCount = 0;
function runNo(){
  noCount++;

  const wrap = document.querySelector(".noWrap");
  const wr = wrap.getBoundingClientRect();
  const br = noBtn.getBoundingClientRect();

  const pad = 6;
  const maxX = Math.max(pad, wr.width - br.width - pad);
  const maxY = Math.max(pad, wr.height - br.height - pad);

  noBtn.style.left = (pad + Math.random() * (maxX - pad)) + "px";
  noBtn.style.top  = (pad + Math.random() * (maxY - pad)) + "px";

  const lines = [
    "why you clicking no 😭",
    "stoppp 😔",
    "be nice pls 🥺",
    "okay… you’re teasing 😳",
    "just say YES already 🩷"
  ];
  hint.textContent = lines[Math.min(noCount, lines.length - 1)];
}
noBtn.addEventListener("mouseenter", runNo);
noBtn.addEventListener("click", runNo);
noBtn.addEventListener("touchstart", (e)=>{ e.preventDefault(); runNo(); }, {passive:false});

/* confetti hearts */
function heartBurst(){
  burst.innerHTML = "";
  burst.style.display = "block";

  const n = 44;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for(let i=0;i<n;i++){
    const c = document.createElement("div");
    c.className = "conf";
    c.style.left = cx + "px";
    c.style.top  = cy + "px";
    c.style.setProperty("--cc", colors[Math.floor(Math.random()*colors.length)]);

    const a = Math.random() * Math.PI * 2;
    const d = 120 + Math.random() * 280;
    const dx = Math.cos(a) * d;
    const dy = Math.sin(a) * d + 140;

    c.style.setProperty("--dx", dx.toFixed(0) + "px");
    c.style.setProperty("--dy", dy.toFixed(0) + "px");
    c.style.animationDelay = (Math.random() * 0.12).toFixed(2) + "s";

    burst.appendChild(c);
  }

  setTimeout(() => { burst.style.display = "none"; }, 1400);
}

/* YES modal */
yesBtn.addEventListener("click", () => {
  subtitle.textContent = "HEHEHE I KNEW IT 😌💗";
  heartBurst();
  overlay.style.display = "grid";
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
  if(e.target === overlay) overlay.style.display = "none";
});
