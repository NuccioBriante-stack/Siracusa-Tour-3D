import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log("--- SCRIPT MAIN.JS AVVIATO ---");

// 1. CONFIGURAZIONE TOUR (Aggiungi qui le tue 8 foto)
const scenes = [
    { color: 'Siracusa_foto_001.jpg', depth: 'Siracusa_foto_001_depth.png' },
    { color: 'Siracusa_foto_002.jpg', depth: 'Siracusa_foto_002_depth.png' },
    { color: 'Siracusa_foto_003.jpg', depth: 'Siracusa_foto_003_depth.png' },
    { color: 'Siracusa_foto_004.jpg', depth: 'Siracusa_foto_004_depth.png' },
    { color: 'Siracusa_foto_005.jpg', depth: 'Siracusa_foto_005_depth.png' },
    { color: 'Siracusa_foto_006.jpg', depth: 'Siracusa_foto_006_depth.png' },
    { color: 'Siracusa_foto_007.jpg', depth: 'Siracusa_foto_007_depth.png' },
    { color: 'Siracusa_foto_008.jpg', depth: 'Siracusa_foto_008_depth.png' }
];

let currentSceneIndex = 0;

// 2. SCENA E MOTORE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    precision: "highp" // Forza l'alta precisione per evitare l'effetto nebbia
});
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.rotateSpeed = -0.5;

// 3. CREAZIONE SFERA
const geometry = new THREE.SphereGeometry(500, 512, 512);
geometry.scale(-1, 1, 1);
const material = new THREE.MeshPhongMaterial({
    map: textureColor,
    displacementMap: textureDepth,
    displacementScale: -25, // Valore più basso = meno distorsione e più nitidezza
    displacementBias: 0,
    shininess: 5,           // Un tocco di lucentezza per far risaltare la pietra arenaria
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 4. LUCI
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, 100, 50);
scene.add(dirLight);

const loader = new THREE.TextureLoader();

// 5. FUNZIONE PER CAMBIARE SCENA
function loadScene(index) {
    console.log("Caricamento scena " + (index + 1));
    const data = scenes[index];
    
    loader.load(data.color, (tex) => {
        material.map = tex;
        material.needsUpdate = true;
    });

    loader.load(data.depth, (depth) => {
        material.displacementMap = depth;
        material.needsUpdate = true;
        console.log("Mappa di profondità " + (index + 1) + " caricata!");
    });
}

// Carica la prima scena all'avvio
loadScene(currentSceneIndex);
camera.position.set(0, 0, 50);

// 6. COMANDI DA TASTIERA (Premi 1, 2, 3... per cambiare foto)
window.addEventListener('keydown', (e) => {
    const key = parseInt(e.key);
    if (key >= 1 && key <= scenes.length) {
        loadScene(key - 1);
    }
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

