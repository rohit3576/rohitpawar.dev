// Barba.js Transitions - True 3D Cinematic Version
let barbaInitialized = false;

function initBarba() {
    if (barbaInitialized) return;
    barbaInitialized = true;

    // Add perspective to body
    document.body.style.perspective = '1200px';
    document.body.style.transformStyle = 'preserve-3d';

    barba.init({
        sync: true,
        transitions: [{
            name: '3d-cinematic-transition',
            async leave(data) {
                const currentContainer = data.current.container;
                
                cleanupAnimations();
                if (window.cleanupHero3D) window.cleanupHero3D();
                
                await gsap.to(currentContainer, {
                    opacity: 0,
                    scale: 0.94,
                    rotateY: 8,
                    rotateX: -3,
                    translateZ: -100,
                    duration: 0.7,
                    ease: 'power3.inOut',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center'
                });
            },
            async enter(data) {
                window.scrollTo(0, 0);
                
                const nextContainer = data.next.container;
                
                gsap.set(nextContainer, {
                    opacity: 0,
                    scale: 0.94,
                    rotateY: -8,
                    rotateX: 3,
                    translateZ: 50,
                    filter: 'blur(4px)'
                });
                
                await gsap.to(nextContainer, {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    rotateX: 0,
                    translateZ: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                    onComplete: () => {
                        if (window.initParallax) window.initParallax();
                        if (window.initProfileTilt) window.initProfileTilt();
                        if (window.initCardTilt) window.initCardTilt();
                        if (window.initAnimations) window.initAnimations();
                        if (window.initHero3D) window.initHero3D();
                        if (window.initBackground3D) window.initBackground3D();
                    }
                });
                
                if (window.getLenis && window.getLenis()) {
                    window.getLenis().scrollTo(0, { immediate: true });
                }
            }
        }],
        views: [{
            namespace: 'home',
            beforeEnter() {
                if (window.initThree) window.initThree();
            }
        }, {
            namespace: 'about',
            beforeEnter() {
            }
        }, {
            namespace: 'projects',
            beforeEnter() {
            }
        }, {
            namespace: 'contact',
            beforeEnter() {
            }
        }]
    });

    barba.hooks.after(({ next }) => {
        updateActiveNavLink(next.namespace);
        refreshScrollTrigger();
    });
}

function cleanupAnimations() {
    gsap.killTweensOf('*');
    ScrollTrigger.getAll().forEach(st => st.kill());
    if (window.teardownPageAnimations) {
        window.teardownPageAnimations();
    }
}

function refreshScrollTrigger() {
    ScrollTrigger.refresh();
}

function updateActiveNavLink(namespace) {
    if (!namespace) return;
    const links = document.querySelectorAll('.nav-link');
    const pageMap = {
        'home': 'index.html',
        'about': 'about.html',
        'projects': 'projects.html',
        'contact': 'contact.html'
    };
    const targetPage = pageMap[namespace] || 'index.html';
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetPage) {
            link.classList.add('active');
        }
    });
}

window.initBarba = initBarba;
window.cleanupAnimations = cleanupAnimations;
