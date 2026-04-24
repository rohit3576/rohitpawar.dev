document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Loading Screen
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');

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

    // 2. Three.js Background (Floating Sphere)
    let scene, camera, renderer, sphere;

    function initThree() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x4a90e2, // Soft blue
            metalness: 0.5,
            roughness: 0.1,
            transmission: 0.9,
            transparent: true,
            thickness: 0.5
        });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 3;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        function animate() {
            requestAnimationFrame(animate);
            sphere.rotation.y += 0.002;
            sphere.rotation.x += 0.001;
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
        gsap.utils.toArray(".timeline").forEach(timeline => {
            gsap.from(timeline.querySelector("::before"), {
                scaleY: 0,
                transformOrigin: "top",
                ease: "none",
                scrollTrigger: {
                    trigger: timeline,
                    start: "top center",
                    end: "bottom center",
                    scrub: true
                }
            });
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
    if (typingText) type(); // Only run if element exists

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
            const cards = document.querySelectorAll('.skill-card, .project-card, .featured-card');
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

    // 6. Smooth Page Transitions
    function goToPage(url) {
        pageContent.classList.add('fade-out');
        gsap.to(pageContent, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                window.location.href = url;
            }
        });
    }

    document.querySelectorAll('a[href^="index.html"], a[href^="about.html"], a[href^="projects.html"], a[href^="contact.html"], a[href^="project-detail.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) { // Handle internal anchor links
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else { // Handle external page links
                e.preventDefault();
                goToPage(href);
            }
        });
    });

    // 7. Scroll Progress
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
        
        // Sticky Navbar
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        }
        else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = "";
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 8. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // 9. Handle Window Resize
    window.addEventListener('resize', () => {
        if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });

    // 10. Form Submission (Prevent Default)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }
});
