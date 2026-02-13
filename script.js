const btnGalaxy = document.getElementById('btn-galaxy');
const musica = document.getElementById('musicaAmor');
const phrases = ["Te amo", "Mi vida", "Mi refugio", "Siempre juntos", "Eres magia", "Mi paz", "Gracias por existir", "Amor eterno", "Mi universo", "Mi destino"];

let scene, camera, renderer, galaxyParticles, clock;

function initGalaxy() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('galaxy-container').appendChild(renderer.domElement);
    clock = new THREE.Clock();

    const geo = new THREE.BufferGeometry();
    const pos = [];
    const colors = [];
    for (let i = 0; i < 60000; i++) {
        const dist = Math.random() * 5;
        const angle = dist * 2.5 + (Math.random() - 0.5) * 0.5;
        const arm = (Math.floor(Math.random() * 3) * 2 * Math.PI) / 3;
        pos.push(Math.cos(angle + arm) * dist, (Math.random() - 0.5) * 0.3, Math.sin(angle + arm) * dist);
        const color = new THREE.Color().setHSL(0.85 + Math.random() * 0.1, 1, 0.5 + Math.random() * 0.4);
        colors.push(color.r, color.g, color.b);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 0.015, vertexColors: true, blending: THREE.AdditiveBlending });
    galaxyParticles = new THREE.Points(geo, mat);
    scene.add(galaxyParticles);

    const overlay = document.getElementById('love-phrases-overlay');
    overlay.innerHTML = '';
    phrases.forEach((txt, i) => {
        const div = document.createElement('div');
        div.className = 'love-phrase';
        div.innerText = txt;
        div.style.left = Math.random() * 70 + 15 + '%';
        div.style.top = Math.random() * 70 + 15 + '%';
        div.style.animationDelay = (i * 0.8) + 's';
        overlay.appendChild(div);
    });
}

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    camera.position.x = Math.cos(time * 0.15) * 4;
    camera.position.z = Math.sin(time * 0.15) * 4;
    camera.position.y = 1.2;
    camera.lookAt(0, 0, 0);
    galaxyParticles.rotation.y += 0.0015;
    renderer.render(scene, camera);
}

// FUNCIONES DE CONTROL
function mostrarRazones() { document.getElementById('modal-razones').classList.remove('hidden'); }
function mostrarRecuerdos() { document.getElementById('modal-recuerdos').classList.remove('hidden'); }
function cerrarModales() { 
    document.getElementById('modal-razones').classList.add('hidden'); 
    document.getElementById('modal-recuerdos').classList.add('hidden');
}

btnGalaxy.addEventListener('click', () => {
    musica.play().catch(() => console.log("Clic necesario para audio"));
    document.getElementById('view-card').classList.add('hidden');
    document.getElementById('view-galaxy').classList.remove('hidden');
    initGalaxy();
    animate();
});

window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});