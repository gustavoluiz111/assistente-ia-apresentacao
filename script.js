// --- Lâmpada ---
const lampada = document.getElementById("lampada");
const body = document.body;
lampada.addEventListener("click", ()=>{
  lampada.classList.toggle("acesa");
  body.classList.toggle("claro");
});

// --- Mascote ---
const mascote = document.getElementById("mascote");
const balao = document.createElement("div");
balao.classList.add("balao");
document.body.appendChild(balao);

const dicas = [
  "Separe plásticos, metais e circuitos!",
  "Reaproveite peças antigas.",
  "Use sensores para automatizar.",
  "Pequenos robôs ajudam a reciclar."
];
let dicaIndex=0;

mascote.addEventListener("click", ()=>{
  balao.style.display="block";
  balao.textContent=dicas[dicaIndex];
  dicaIndex=(dicaIndex+1)%dicas.length;
  balao.style.transform="scale(0)";
  balao.style.opacity="0";
  setTimeout(()=>{balao.style.transform="scale(1)"; balao.style.opacity="1";},10);
  const rect=mascote.getBoundingClientRect();
  balao.style.bottom=`${window.innerHeight - rect.top + 20}px`;
  balao.style.right=`${window.innerWidth - rect.right}px`;
});
document.addEventListener("click",(e)=>{
  if(!mascote.contains(e.target) && !balao.contains(e.target)) balao.style.display="none";
});

// --- Partículas ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles=[];
function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
window.addEventListener('resize',resize); resize();
function createParticles(){ 
  for(let i=0;i<100;i++){ 
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*2+1,
      dx:(Math.random()-0.5)*0.5,
      dy:(Math.random()-0.5)*0.5
    });
  } 
}
createParticles();
function animate(){ 
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(0,255,255,0.7)';
    ctx.fill(); 
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  });
  requestAnimationFrame(animate); 
}
animate();

// --- Scroll fade-in ---
const fadeEls=document.querySelectorAll('.fade-in');
window.addEventListener('scroll',()=>{
  const triggerBottom=window.innerHeight*0.85; 
  fadeEls.forEach(el=>{
    const boxTop=el.getBoundingClientRect().top;
    if(boxTop<triggerBottom) el.classList.add('visible');
  });
});

// --- THREE.js 3D ---
const threeCanvas=document.getElementById('three-canvas');
const scene3D=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({canvas:threeCanvas, alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);

const geometry=new THREE.BoxGeometry();
const material=new THREE.MeshBasicMaterial({color:0x00ffff,


