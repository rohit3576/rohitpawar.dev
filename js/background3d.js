// js/background3d.js - Global 3D Background System
let bgScene, bgCamera, bgRenderer, bgParticles;
let bgAnimationId = null;
let bgContainer = null;
let bgMouseX = 0, bgMouseY = 0;

function initBackground3D() {
    bgContainer = document.getElementById('global-bg-3d');
    if (!bgContainer) return;

    // Clean up if already exists
    cleanupBackground3D();

    bgScene = new THREE.Scene();
    bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    bgCamera.position.z = 5;

    bgRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    bgRenderer.domElement.style.position = 'fixed';
    bgRenderer.domElement.style.top = '0';
    bgRenderer.domElement.style.left = '0';
    bgRenderer.domElement.style.zIndex = '-1';
    bgContainer.appendChild(bgRenderer.domElement);

    createParticles();
    animateBackground();

    window.addEventListener('resize', onBackgroundResize, { passive: true });
    document.addEventListener('mousemove', onBackgroundMouseMove, { passive: true });
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleCount = 100;
    const spread = 12;

    for (let i = 0; i < particleCount; i++) {
        vertices.push(
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x0071e3,
        size: 0.03,
        transparent: true,
        opacity: 0.4
    });

    bgParticles = new THREE.Points(geometry, material);
    bgScene.add(bgParticles);

    // Connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0071e3, transparent: true, opacity: 0.05 });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    
    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const dx = vertices[i*3] - vertices[j*3];
            const dy = vertices[i*3+1] - vertices[j*3+1];
            const dz = vertices[i*3+2] - vertices[j*3+2];
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < 2.5) {
                linePositions.push(vertices[i*3], vertices[i*3+1], vertices[i*3+2]);
                linePositions.push(vertices[j*3], vertices[j*3+1], vertices[j*3+2]);
            }
        }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    bgScene.add(lines);
}

function onBackgroundMouseMove(e) {
    bgMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    bgMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

function animateBackground() {
    bgAnimationId = requestAnimationFrame(animateBackground);

    if (bgParticles) {
        bgParticles.rotation.y += 0.0003;
        bgParticles.rotation.x += 0.0001;
    }

    if (bgCamera && window.innerWidth >= 1024) {
        bgCamera.position.x += (bgMouseX * 0.15 - bgCamera.position.x) * 0.02;
        bgCamera.position.y += (bgMouseY * 0.15 - bgCamera.position.y) * 0.02;
        bgCamera.lookAt(bgScene.position);
    }

    if (bgRenderer && bgScene && bgCamera) {
        bgRenderer.render(bgScene, bgCamera);
    }
}

function onBackgroundResize() {
    if (!bgCamera || !bgRenderer) return;
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
}

function cleanupBackground3D() {
    if (bgAnimationId) cancelAnimationFrame(bgAnimationId);
    if (bgContainer) bgContainer.innerHTML = '';
    if (bgRenderer) bgRenderer.dispose();
    window.removeEventListener('resize', onBackgroundResize);
    document.removeEventListener('mousemove', onBackgroundMouseMove);
}

window.initBackground3D = initBackground3D;
window.cleanupBackground3D = cleanupBackground3D;

document.addEventListener('DOMContentLoaded', initBackground3D);
