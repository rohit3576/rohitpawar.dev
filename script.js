document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Loading Screen
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loader.style.display = 'none';
                initCinematicAnimations();
            }
        });
    });

    // 2. Three.js Background
    let scene, camera, renderer, particles;

    function initThree() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Create Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const count = window.innerWidth < 768 ? 500 : 1500; // Performance optimization
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0x7c4dff,
            transparent: true,
            opacity: 0.5
        });

        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 3;

        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.y += 0.001;
            particles.rotation.x += 0.0005;
            renderer.render(scene, camera);
        }
        animate();
    }

    if (window.innerWidth > 768) initThree(); // Only 3D on desktop

    // 3. GSAP Cinematic Animations
    function initCinematicAnimations() {
        const tl = gsap.timeline();

        tl.to('.reveal-gsap', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        });

        // ScrollTrigger Animations
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const reveals = section.querySelectorAll('.reveal-gsap');
            if (reveals.length > 0) {
                gsap.fromTo(reveals, 
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                        }
                    }
                );
            }
        });

        // Timeline Growth Animation
        gsap.from(".timeline::before", {
            scaleY: 0,
            transformOrigin: "top",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top center",
                end: "bottom center",
                scrub: true
            }
        });
    }

    // 4. Typing Animation
    const typingText = document.getElementById('typing-text');
    const words = ["Building scalable web apps", "Intelligent AI systems", "Modern Full Stack solutions", "ML-driven insights"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();

    // 5. Interactivity: Cursor Glow & Card Tilt
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.5,
            ease: "power2.out"
        });

        // Card Tilt Effect
        if (window.innerWidth > 992) {
            const cards = document.querySelectorAll('.skill-card, .project-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                    const xc = rect.width / 2;
                    const yc = rect.height / 2;
                    const dx = x - xc;
                    const dy = y - yc;
                    
                    gsap.to(card, {
                        rotationY: dx / 10,
                        rotationX: -dy / 10,
                        duration: 0.3
                    });
                } else {
                    gsap.to(card, {
                        rotationY: 0,
                        rotationX: 0,
                        duration: 0.5
                    });
                }
            });
        }
    });

    // 6. Scroll Progress
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
        
        // Sticky Navbar
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 7. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });
});
