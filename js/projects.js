// js/projects.js - Dynamic Projects Data and Modal Logic

const projectData = [
    {
        id: 1,
        title: "AI Mental Health Analyzer",
        tag: "AI / NLP",
        shortDesc: "Built an NLP-based system to analyze user text and detect sentiment and stress levels. Real-time predictions with a full-stack ML application.",
        description: "Mental health issues are often undetected due to lack of accessible screening tools. Traditional methods require clinical visits, creating barriers for early intervention. This solution is an AI-powered web application that analyzes text input to detect emotional states, stress levels, and provides actionable insights.",
        tech: ["Python", "NLP", "Flask", "React", "BERT"],
        live: "#",
        github: "#",
        image: "https://placehold.co/1200x600/4a90e2/white?text=AI+Mental+Health+Analyzer"
    },
    {
        id: 2,
        title: "Breast Cancer Prediction",
        tag: "Machine Learning",
        shortDesc: "Developed a machine learning classifier to predict malignant vs benign tumors. Implemented preprocessing pipelines and deployed via Streamlit.",
        description: "Early detection of breast cancer is crucial for successful treatment. This project implements several machine learning algorithms to classify tumors based on biopsy data. It includes a comprehensive data analysis pipeline and a user-friendly interface for clinicians.",
        tech: ["Scikit-Learn", "Pandas", "Streamlit", "Matplotlib"],
        live: "#",
        github: "#",
        image: "https://placehold.co/1200x600/e24a90/white?text=Breast+Cancer+Prediction"
    },
    {
        id: 3,
        title: "VoiceBrief AI",
        tag: "AI / Voice",
        shortDesc: "AI-powered system to generate concise summaries from voice inputs. Integrated speech processing with NLP for automated brief generation.",
        description: "In a fast-paced world, consuming long voice recordings is time-consuming. VoiceBrief AI transcribes voice notes and uses LLMs to extract key action items and summaries, significantly increasing productivity for professionals.",
        tech: ["SpeechRecognition", "GPT-4", "Python", "Whisper"],
        live: "#",
        github: "#",
        image: "https://placehold.co/1200x600/4ae290/white?text=VoiceBrief+AI"
    },
    {
        id: 4,
        title: "Riddhi Makvana Creative Studio",
        tag: "Web Design",
        shortDesc: "A creative portfolio website for Riddhi Makvana, a graphic designer. Features engaging visuals, smooth animations, and a modern design aesthetic.",
        description: "A highly visual and interactive portfolio designed to showcase creative work. The project focuses on storytelling through design, using advanced animations and a minimal UI to let the work shine.",
        tech: ["HTML", "CSS", "JavaScript", "GSAP"],
        live: "https://rohit3576.github.io/Riddhi-Makvana-Creative-Studio/",
        github: "#",
        image: "https://placehold.co/1200x600/904ae2/white?text=Creative+Studio"
    },
    {
        id: 5,
        title: "Yuvas Film Production",
        tag: "Film Production",
        shortDesc: "A dynamic website for Yuvas Film Production - a film production house focused on nurturing storytellers.",
        description: "Designed and developed a digital presence for a film production house. The site features cinematic video backgrounds, project galleries, and a contact system tailored for potential collaborators and clients.",
        tech: ["HTML", "CSS", "JavaScript", "WordPress"],
        live: "https://yuvasfilmproduction.com/",
        github: "#",
        image: "https://placehold.co/1200x600/e2904a/white?text=Film+Production"
    }
];

function initProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    // Clear existing content
    grid.innerHTML = '';

    // Render cards
    projectData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-id', project.id);
        
        card.innerHTML = `
            <div class="project-info">
                <span class="project-tag">${project.tag}</span>
                <h3>${project.title}</h3>
                <p>${project.shortDesc}</p>
                <div class="tech-stack">
                    ${project.tech.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
                    ${project.tech.length > 3 ? `<span>+${project.tech.length - 3}</span>` : ''}
                </div>
                <div class="project-links">
                    <button class="btn-secondary view-details-btn">View Details</button>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openProjectModal(project.id));
        grid.appendChild(card);
    });

    // GSAP Entrance Animation for Cards
    gsap.from(".project-card", {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all" // Clear transform after animation to avoid conflicts with tilt
    });

    // Modal close listeners
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
    }

    // Re-init tilt if available
    if (window.initCardTilt) window.initCardTilt();
}

function openProjectModal(projectId) {
    const project = projectData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-description');
    const tech = document.getElementById('modal-tech');
    const live = document.getElementById('modal-live');
    const github = document.getElementById('modal-github');
    const img = document.getElementById('modal-image');

    title.textContent = project.title;
    desc.textContent = project.description;
    img.src = project.image;
    
    tech.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');
    
    live.href = project.live;
    github.href = project.github;

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scroll

    // Cinematic Modal Animation
    gsap.fromTo(modal, 
        { backgroundColor: "rgba(0,0,0,0)", backdropFilter: "blur(0px)" },
        { backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)", duration: 0.5 }
    );

    gsap.fromTo(".modal-content", 
        { y: 60, opacity: 0, scale: 0.9, rotateX: -5 },
        { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 0.6, ease: "power4.out", delay: 0.1 }
    );
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    gsap.to(".modal-content", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scroll
        }
    });

    gsap.to(modal, {
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "blur(0px)",
        duration: 0.4
    });
}

// Barba compatibility
window.initProjects = initProjects;

// Initial call is handled by main.js or transitions.js
// No need for duplicate event listeners here

