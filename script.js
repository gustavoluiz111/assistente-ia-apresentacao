// Tema claro/escuro
const lampada = document.getElementById('lampada');
lampada.addEventListener('click', ()=>{
  document.body.classList.toggle('claro');
});

// Balão mascote
const mascote = document.getElementById('mascote');
mascote.addEventListener('click', ()=>{
  alert('Olá! Eu sou o mascote do EcoRobôs! Explore os projetos e aprenda sobre sustentabilidade.');
});

// Partículas simples
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for(let i=0;i<100;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx: (Math.random()-0.5)*0.5,
    dy: (Math.random()-0.5)*0.5
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(0,255,255,0.7)';
    ctx.fill();
    p.x+=p.dx; 
    p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Cubos 3D futuristas (Three.js)
let scene, camera, renderer, cubes = [];

function initThree(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
  renderer = new THREE.WebGLRenderer({canvas:document.getElementById('three-canvas'), alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.z = 50;

  const geometry = new THREE.BoxGeometry(5,5,5);
  const material = new THREE.MeshBasicMaterial({color:0x00ffff, wireframe:true});
  
  for(let i=0;i<30;i++){
    let cube = new THREE.Mesh(geometry, material.clone());
    cube.position.set((Math.random()-0.5)*100, (Math.random()-0.5)*50, (Math.random()-0.5)*50);
    cube.rotation.set(Math.random()*2, Math.random()*2, Math.random()*2);
    scene.add(cube);
    cubes.push(cube);
  }
}

function animateThree(){
  requestAnimationFrame(animateThree);
  cubes.forEach(c=>{
    c.rotation.x += 0.01;
    c.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}

initThree();
animateThree();

// Redimensionamento
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
