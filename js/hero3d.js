// js/hero3d.js - Three.js 3D Avatar Integration
let heroScene, heroCamera, heroRenderer, heroModel;
let heroAnimationId = null;
let heroContainer = null;
let heroMouseX = 0, heroMouseY = 0;

function initHero3D() {
    heroContainer = document.getElementById('hero-3d');
    if (!heroContainer) return;

    // Clean up existing scene if any
    cleanupHero3D();

    // Scene Setup
    heroScene = new THREE.Scene();
    
    // Camera Setup
    heroCamera = new THREE.PerspectiveCamera(40, heroContainer.clientWidth / heroContainer.clientHeight, 0.1, 1000);
    heroCamera.position.set(0, 1.2, 3);
    heroCamera.lookAt(0, 0.8, 0);

    // Renderer Setup
    heroRenderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    heroRenderer.setSize(heroContainer.clientWidth, heroContainer.clientHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // PBR Rendering Configuration
    heroRenderer.outputColorSpace = THREE.SRGBColorSpace;
    heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    heroRenderer.toneMappingExposure = 1.2;
    heroRenderer.shadowMap.enabled = true;
    heroRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    heroContainer.appendChild(heroRenderer.domElement);

    // --- LIGHTING SETUP ---
    heroScene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(3, 5, 5);
    heroScene.add(mainLight);

    // Hemisphere light gives a nice gradient from sky to ground
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 2.0);
    hemiLight.position.set(0, 20, 0);
    heroScene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    heroScene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x0071e3, 1.5); // Slight blue rim light
    backLight.position.set(-3, 5, -5);
    heroScene.add(backLight);

    // Model Loading
    const loader = new THREE.GLTFLoader();
    loader.load(
        'assets/models/avatar.glb',
        (gltf) => {
            // Remove existing avatar if any to prevent duplicates
            const existingAvatar = heroScene.getObjectByName("avatar");
            if (existingAvatar) {
                heroScene.remove(existingAvatar);
            }

            heroModel = gltf.scene;
            heroModel.name = "avatar";
            
            // Traverse and Fix Materials/Shadows
            heroModel.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    if (child.material) {
                        child.material.needsUpdate = true;
                    }
                }
            });

            // Adjust scale
            heroModel.scale.set(1.8, 1.8, 1.8);

            // Center model correctly using Bounding Box
            const box = new THREE.Box3().setFromObject(heroModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // Position adjustment: Center it and lift slightly so face is visible
            heroModel.position.set(-center.x, -center.y, -center.z);
            heroModel.position.y += size.y * 0.4;
            
            // Store the baseline Y for animation
            heroModel.userData.baselineY = heroModel.position.y;
            
            heroScene.add(heroModel);

            // GSAP Entrance Animation
            gsap.from(heroModel.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5,
                ease: "power3.out"
            });
            
            gsap.from(heroModel.position, {
                y: -2,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out"
            });

            // GSAP Scroll-based Rotation
            gsap.to(heroModel.rotation, {
                y: Math.PI * 2,
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
        },
        undefined,
        (error) => {
            console.error('An error happened loading the avatar:', error);
        }
    );

    // Mouse Interaction
    document.addEventListener('mousemove', onHeroMouseMove, { passive: true });
    window.addEventListener('resize', onHeroResize, { passive: true });

    animateHero3D();
}

function onHeroMouseMove(e) {
    heroMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    heroMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

function animateHero3D() {
    heroAnimationId = requestAnimationFrame(animateHero3D);

    const time = Date.now() * 0.001;

    if (heroModel) {
        // Slow rotation
        heroModel.rotation.y += 0.005;

        // Floating effect
        const baselineY = heroModel.userData.baselineY || 0;
        heroModel.position.y = baselineY + Math.sin(time) * 0.1;

        // Mouse interaction (Slight rotation)
        if (window.innerWidth >= 768) {
            heroModel.rotation.x += (heroMouseY * 0.2 - heroModel.rotation.x) * 0.05;
            heroModel.rotation.y += (heroMouseX * 0.2 - heroModel.rotation.y) * 0.05;
        }
    }

    if (heroRenderer && heroScene && heroCamera) {
        heroRenderer.render(heroScene, heroCamera);
    }
}

function onHeroResize() {
    if (!heroCamera || !heroRenderer || !heroContainer) return;

    const width = heroContainer.clientWidth;
    const height = heroContainer.clientHeight;

    heroCamera.aspect = width / height;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(width, height);

    if (heroModel) {
        heroModel.scale.set(1.8, 1.8, 1.8);
    }
}

function cleanupHero3D() {
    if (heroAnimationId) {
        cancelAnimationFrame(heroAnimationId);
        heroAnimationId = null;
    }

    document.removeEventListener('mousemove', onHeroMouseMove);
    window.removeEventListener('resize', onHeroResize);

    if (heroContainer && heroContainer.children.length > 0) {
        heroContainer.innerHTML = '';
    }

    if (heroRenderer) {
        heroRenderer.dispose();
        heroRenderer = null;
    }

    if (heroScene) {
        heroScene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(m => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        heroScene = null;
    }

    heroModel = null;
    heroCamera = null;
}

// Re-initialize for Barba.js
window.initHero3D = initHero3D;
window.cleanupHero3D = cleanupHero3D;

// Initial call if on home page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('hero-3d')) {
        initHero3D();
    }
});