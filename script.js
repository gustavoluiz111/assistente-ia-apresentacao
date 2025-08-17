// --- Lâmpada ---
const lampada = document.getElementById("lampada");
lampada.addEventListener("click", ()=>{
  lampada.classList.toggle("acesa");
  document.body.classList.toggle("claro");
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
function createParticles(){ for(let i=0;i<100;i++){ particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5});} }
createParticles();
function animate(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(0,255,255,0.7)';ctx.fill(); p.x+=p.dx; p.y+=p.dy; if(p.x<0||p.x>canvas.width)p.dx*=-1; if(p.y<0||p.y>canvas.height)p.dy*=-1;}); requestAnimationFrame(animate); }
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
const material=new THREE.MeshBasicMaterial({color:0x00ffff,wireframe:true});
const cubes=[];
for(let i=0;i<50;i++){ const cube=new THREE.Mesh(geometry,material); cube.position.set((Math.random()-0.5)*50,(Math.random()-0.5)*50,(Math.random()-0.5)*50); scene3D.add(cube); cubes.push(cube); }
camera.position.z=30;

const lines=[];
for(let i=0;i<50;i++){ const a=cubes[i]; const b=cubes[(i+Math.floor(Math.random()*cubes.length))%cubes.length]; const points=[new THREE.Vector3(a.position.x,a.position.y,a.position.z), new THREE.Vector3(b.position.x,b.position.y,b.position.z)]; const geometryLine=new THREE.BufferGeometry().setFromPoints(points); const lineMaterial=new THREE.LineBasicMaterial({color:0x00ffff,transparent:true,opacity:0.6}); const line=new THREE.Line(geometryLine,lineMaterial); scene3D.add(line); lines.push({line,a,b,t:Math.random()}); }

function mascoteDistanceEffect(){
  const rect=mascote.getBoundingClientRect();
  const mx=rect.left+rect.width/2;
  const my=rect.top+rect.height/2;
  lines.forEach(obj=>{
    const projX=(obj.a.position.x+obj.b.position.x)/2+window.innerWidth/2;
    const projY=(obj.a.position.y+obj.b.position.y)/2+window.innerHeight/2;
    const dist=Math.hypot(mx-projX,my-projY);
    obj.line.material.opacity = dist<200 ? 1 : 0.3 + 0.4*Math.sin(obj.t*2);
  });
}

function animate3D(){
  requestAnimationFrame(animate3D);
  cubes.forEach(c=>{ c.rotation.x+=0.002; c.rotation.y+=0.003; });
  lines.forEach(obj=>{
    obj.t+=0.01;
    const posA=obj.a.position;
    const posB=obj.b.position;
    const lerpX=posA.x + (posB.x-posA.x)*(0.5 + 0.5*Math.sin(obj.t));
    const lerpY=posA.y + (posB.y-posA.y)*(0.5 + 0.5*Math.sin(obj.t));
    const lerpZ=posA.z + (posB.z-posA.z)*(0.5 + 0.5*Math.sin(obj.t));
    obj.line.geometry.setFromPoints([new THREE.Vector3(posA.x,posA.y,posA.z), new THREE.Vector3(lerpX,lerpY,lerpZ)]);
    obj.line.material.opacity = 0.3 + 0.4*Math.sin(obj.t*2);
  });
  mascoteDistanceEffect();
  camera.position.x=Math.sin(Date.now()*0.0005)*10;
  camera.position.y=Math.cos(Date.now()*0.0005)*5;
  camera.lookAt(0,0,0);
  renderer.render(scene3D,camera);
}
animate3D();

window.addEventListener('resize',()=>{
  camera.aspect=window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
