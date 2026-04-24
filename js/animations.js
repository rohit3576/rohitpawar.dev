// GSAP Animations - Cinematic Version with Layered Timelines
gsap.registerPlugin(ScrollTrigger);

let gsapContext;

function initAnimations() {
    if (gsapContext) {
        gsapContext.revert();
    }
    
    gsapContext = gsap.context(() => {
        initCursor();
        initHomeAnimations();
        initAboutAnimations();
        initProjectAnimations();
        initContactAnimations();
        initMagneticButtons();
        initMicroInteractions();
        initLiquidGlass(); // Added Liquid Glass initialization
    });
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;
    
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        followerX += (e.clientX - followerX) * 0.12;
        followerY += (e.clientY - followerY) * 0.12;
        gsap.to(follower, { x: followerX - 18, y: followerY - 18, duration: 0.08 });
    });

    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea, .nav-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Make the inner dot disappear
            gsap.to(cursor, { scale: 0, duration: 0.15 });
            // Scale up the follower ring and fill it slightly
            gsap.to(follower, { scale: 1.5, background: 'rgba(255,255,255,0.1)', duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            // Restore inner dot
            gsap.to(cursor, { scale: 1, duration: 0.15 });
            // Restore follower ring
            gsap.to(follower, { scale: 1, background: 'transparent', duration: 0.2 });
        });
    });
}

function initHomeAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Layer 1: Set initial states
    gsap.set(['.hero-title', '.hero-subtitle', '.hero-description', '.hero-cta'], {
        opacity: 0,
        y: 80,
        skewY: 2
    });
    
    gsap.set('.hero-image', {
        opacity: 0,
        scale: 0.9,
        rotateY: -15
    });
    
    gsap.set('.parallax-bg .blob', {
        opacity: 0,
        scale: 0.8
    });

    // Layer 2: Background parallax elements
    const bgTimeline = gsap.timeline({ delay: 0.2 });
    bgTimeline
        .to('.blob-1', { opacity: 0.4, scale: 1, duration: 1.5, ease: 'power2.out' })
        .to('.blob-2', { opacity: 0.3, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=1')
        .to('.blob-3', { opacity: 0.35, scale: 1, duration: 1, ease: 'power2.out' }, '-=0.8');

    // Layer 3: Hero content sequence
    const contentTimeline = gsap.timeline({ delay: 0.4 });
    contentTimeline
        .to('.hero-title', {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.2,
            ease: 'power4.out'
        })
        .to('.hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out'
        }, '-=0.7')
        .to('.hero-description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .to('.hero-cta', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out'
        }, '-=0.4')
        .to('.hero-image', {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.8');

    // Hero section parallax on scroll
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        opacity: 0.5,
        scale: 0.95
    });
}

function initAboutAnimations() {
    const aboutSection = document.querySelector('.about-hero');
    if (!aboutSection) return;

    // Set initial states
    gsap.set('.section-title', { opacity: 0, y: 50, scale: 0.95 });
    gsap.set('.reveal-text', { opacity: 0, y: 60 });
    gsap.set('.timeline-item', { opacity: 0, x: -60, rotateY: -5 });
    gsap.set('.skill-category', { opacity: 0, y: 40, scale: 0.95 });
    gsap.set('.section-subtitle', { opacity: 0, y: 30 });

    // Section title
    gsap.to('.section-title', {
        scrollTrigger: {
            trigger: '.about-hero',
            start: 'top 80%',
            once: true
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
    });

    // About text with stagger
    gsap.to('.reveal-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 85%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Timeline
    gsap.to('.section-subtitle', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.to('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 75%',
            once: true
        },
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: 'power3.out'
    });

    // Skills
    gsap.to('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            once: true
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
    });
}

function initProjectAnimations() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Set initial states
    gsap.set('.section-title', { opacity: 0, y: 50, scale: 0.95 });
    gsap.set('.section-description', { opacity: 0, y: 40 });
    gsap.set('.project-card', { 
        opacity: 0, 
        y: 80,
        scale: 0.9,
        rotateY: -8
    });

    // Header animation
    const headerTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.projects-hero',
            start: 'top 80%',
            once: true
        }
    });
    
    headerTl
        .to('.section-title', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.section-description', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5');

    // Cards stagger animation
    gsap.to('.project-card', {
        scrollTrigger: {
            trigger: projectsGrid,
            start: 'top 85%',
            once: true
        },
        opacity: 1,
        y: 0,
        scale: 1,
        rotateY: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out'
    });

    // Card parallax on scroll
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 85%',
                scrub: 1
            },
            y: -20,
            rotateY: 2,
            ease: 'none'
        });
    });
}

function initContactAnimations() {
    const contactSection = document.querySelector('.contact-section');
    if (!contactSection) return;

    // Set initial states
    gsap.set('.contact-info > *', { opacity: 0, y: 50, scale: 0.95 });
    gsap.set('.glass-form', { opacity: 0, y: 60, scale: 0.95, rotateX: -10 });

    // Info items
    gsap.to('.contact-info > *', {
        scrollTrigger: {
            trigger: contactSection,
            start: 'top 80%',
            once: true
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Form
    gsap.to('.glass-form', {
        scrollTrigger: {
            trigger: contactSection,
            start: 'top 75%',
            once: true
        },
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });
}

function initMagneticButtons() {
    if (window.innerWidth < 1024) return;
    
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary, .logo, .project-card');
    
    magneticBtns.forEach(btn => {
        if (!btn) return;
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });
}

function initMicroInteractions() {
    // Nav link hover effect
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -2,
                color: '#0071e3',
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                color: '#1d1d1f',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Button hover scale
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.4,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });

    // Tech stack tags animation
    document.querySelectorAll('.tech-stack span').forEach((tag, i) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.tech-stack span');
                gsap.to(tags, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power2.out'
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Aurora Liquid Glass setup
function initLiquidGlass() {
    if (window.innerWidth < 768) return;

    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Pass the coordinates to CSS dynamically
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function teardownPageAnimations() {
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.killTweensOf('*');
}

window.initAnimations = initAnimations;
window.initLiquidGlass = initLiquidGlass;
window.teardownPageAnimations = teardownPageAnimations;