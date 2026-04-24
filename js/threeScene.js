// Three.js Scene - Lightweight with Mouse Interaction
let scene, camera, renderer, particles;
let animationId = null;
let container = null;
let mouseX = 0, mouseY = 0;

function initThree() {
    container = document.getElementById('three-canvas-container');
    if (!container) return;

    cleanupThree();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    container.appendChild(renderer.domElement);

    createParticles();
    animate();
    
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onWindowResize, { passive: true });
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleCount = 100;
    const spread = 10;

    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * spread;
        const y = (Math.random() - 0.5) * spread;
        const z = (Math.random() - 0.5) * spread;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0x0071e3,
        size: 0.03,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x0071e3, 
        transparent: true, 
        opacity: 0.06 
    });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const positions = geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i*3] - positions[j*3];
            const dy = positions[i*3+1] - positions[j*3+1];
            const dz = positions[i*3+2] - positions[j*3+2];
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < 2.5) {
                linePositions.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
                linePositions.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
            }
        }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
}

function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    animationId = requestAnimationFrame(animate);

    if (particles && camera) {
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;
        
        // Smooth camera movement based on mouse
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function cleanupThree() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onWindowResize);
    
    if (container && container.children.length > 0) {
        container.innerHTML = '';
    }
    
    if (renderer) {
        renderer.dispose();
        renderer = null;
    }
    
    if (scene) {
        scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(m => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        scene = null;
    }
    
    particles = null;
    camera = null;
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Export for Barba.js re-initialization
window.initThree = initThree;
window.cleanupThree = cleanupThree;
