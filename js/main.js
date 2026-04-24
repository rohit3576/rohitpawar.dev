// Global JavaScript - Cinematic Modular Version
let lenis = null;

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initAdvancedParallax();
    initProfileTilt();
    initCardTilt();
    initNavbar();
    initMobileMenu();
    initContactForm();
    
    if (window.initProjects) {
        window.initProjects();
    }
    
    if (window.initBarba) {
        window.initBarba();
    }
    
    if (window.initBackground3D) {
        window.initBackground3D();
    }
    
    if (window.initAnimations) {
        window.initAnimations();
    }
});

// Smooth Scroll with Lenis
function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    
    lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

function getLenis() {
    return lenis;
}

// Advanced Multi-Layer Parallax
function initAdvancedParallax() {
    if (window.innerWidth < 1024) return;
    
    const blobs = document.querySelectorAll('.blob');
    const gradientLayer = document.querySelector('.gradient-layer');
    
    if (!blobs.length) return;
    
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let scrollY = 0;
    
    // Mouse tracking with smooth interpolation
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
        mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    });
    
    // Scroll tracking
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    }, { passive: true });
    
    let ticking = false;
    
    function updateParallax() {
        targetMouseX += (mouseX - targetMouseX) * 0.04;
        targetMouseY += (mouseY - targetMouseY) * 0.04;
        
        const scrollOffset = scrollY * 0.3;
        
        if (gradientLayer) {
            gsap.set(gradientLayer, {
                x: targetMouseX * 50,
                y: targetMouseY * 30 + scrollOffset * 0.2
            });
        }
        
        // Background blob - slowest
        if (blobs[0]) {
            gsap.set(blobs[0], {
                x: targetMouseX * 80,
                y: targetMouseY * 50 + scrollOffset * 0.1
            });
        }
        
        // Middle blob - medium
        if (blobs[1]) {
            gsap.set(blobs[1], {
                x: -targetMouseX * 60,
                y: -targetMouseY * 40 + scrollOffset * 0.15
            });
        }
        
        // Front blob - fastest
        if (blobs[2]) {
            gsap.set(blobs[2], {
                x: targetMouseX * 40,
                y: -targetMouseY * 30 + scrollOffset * 0.2
            });
        }
        
        ticking = false;
    }
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousemove', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    updateParallax();
}

// Profile Image Tilt Effect
function initProfileTilt() {
    const profileWrapper = document.querySelector('.profile-image-wrapper');
    if (!profileWrapper || window.innerWidth < 1024) return;
    
    const profileInner = profileWrapper.querySelector('.profile-image-inner');
    if (!profileInner) return;
    
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    
    profileWrapper.addEventListener('mousemove', (e) => {
        const rect = profileWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        targetX = (y - centerY) / 8;
        targetY = (centerX - x) / 8;
    });
    
    profileWrapper.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });
    
    function animateTilt() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        
        gsap.set(profileInner, {
            rotateX: currentX,
            rotateY: currentY,
            duration: 0
        });
        
        requestAnimationFrame(animateTilt);
    }
    
    animateTilt();
}

// Project Card 3D Tilt Effect
function initCardTilt() {
    if (window.innerWidth < 1024) return; // Disable on mobile/tablet for performance
    
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let isHovered = false;
        let rect = null;
        
        card.addEventListener('mouseenter', () => {
            isHovered = true;
            rect = card.getBoundingClientRect(); // Cache rect on enter
            gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!rect) return;
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt based on cursor position
            targetX = (y - centerY) / 10;
            targetY = (centerX - x) / 10;
        });
        
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            targetX = 0;
            targetY = 0;
            gsap.to(card, { 
                scale: 1, 
                rotateX: 0, 
                rotateY: 0, 
                duration: 0.5, 
                ease: "power2.out" 
            });
        });
        
        function animateCard() {
            if (!isHovered && Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
                requestAnimationFrame(animateCard);
                return;
            }

            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
            
            gsap.set(card, {
                rotateX: currentX,
                rotateY: currentY,
                transformPerspective: 1000
            });
            
            requestAnimationFrame(animateCard);
        }
        
        animateCard();
    });
}

// Navbar Scroll Effect
function initNavbar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// Mobile Menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileToggle || !mobileMenu) return;
    
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('nav-open');
        
        if (lenis) {
            if (mobileMenu.classList.contains('open')) {
                lenis.stop();
            } else {
                lenis.start();
            }
        }
    });
    
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('nav-open');
            if (lenis) lenis.start();
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        if (!btn) return;
        
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerText = 'Message Sent!';
            btn.style.background = '#28a745';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Export for global access
window.getLenis = getLenis;
window.initSmoothScroll = initSmoothScroll;
window.initAdvancedParallax = initAdvancedParallax;
window.initProfileTilt = initProfileTilt;
window.initCardTilt = initCardTilt;
