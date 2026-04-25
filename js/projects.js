// js/projects.js - Dynamic Projects Data and Modal Logic

const projectData = [
    {
        id: 1,
        title: "AI Mental Health Analyzer",
        tag: "AI / NLP",
        shortDesc: "Built an NLP-based system to analyze user text and detect sentiment and stress levels.",
        problem: "Mental health issues often go undetected due to the lack of accessible and private screening tools, creating barriers for early intervention.",
        approach: "Developed a full-stack application using React and Flask. Integrated a BERT-based NLP model to process user text and provide real-time sentiment and stress analysis.",
        result: "Achieved 85% accuracy in stress detection during pilot testing, providing users with a private way to monitor their emotional well-being.",
        tech: ["Python", "NLP", "Flask", "React", "BERT"],
        live: "#",
        github: "#",
        image: "https://placehold.co/1200x600/4a90e2/white?text=AI+Mental+Health+Analyzer"
    },
    {
        id: 2,
        title: "Breast Cancer Prediction",
        tag: "Machine Learning",
        shortDesc: "Developed a machine learning classifier to predict malignant vs benign tumors with high precision.",
        problem: "Accurate and early diagnosis of breast cancer is critical for survival, but manual analysis of biopsy data can be prone to human error.",
        approach: "Implemented multiple ML algorithms (SVM, Random Forest) using Scikit-Learn. Built a comprehensive data pipeline for preprocessing and feature engineering, deployed via Streamlit.",
        result: "Created a highly precise diagnostic tool with over 96% accuracy, currently used as a demo for clinical decision support systems.",
        tech: ["Scikit-Learn", "Pandas", "Streamlit", "Matplotlib"],
        live: "#",
        github: "#",
        image: "https://placehold.co/1200x600/e24a90/white?text=Breast+Cancer+Prediction"
    },
    {
        id: 3,
        title: "VoiceBrief AI",
        tag: "AI / Voice",
        shortDesc: "AI-powered system to generate concise summaries from voice inputs using Whisper and GPT-4.",
        problem: "Professionals often struggle to keep up with long voice recordings and meetings, leading to missed action items and information overload.",
        approach: "Integrated OpenAI's Whisper for high-accuracy transcription and GPT-4 for intelligent summarization. Built with Python to automate the workflow from audio input to structured brief.",
        result: "Reduced the time spent on meeting reviews by 70%, allowing users to focus on execution rather than transcription.",
        tech: ["SpeechRecognition", "GPT-4", "Python", "Whisper"],
        live: "#",
        github: "#",
        image: "https://placehold.co/1200x600/4ae290/white?text=VoiceBrief+AI"
    },
    {
        id: 4,
        title: "Creative Studio Portfolio",
        tag: "Web Design",
        shortDesc: "A high-end creative portfolio featuring advanced GSAP animations and a minimal UI.",
        problem: "Graphic designers need a digital space that reflects their creativity without the technical overhead of complex CMS systems.",
        approach: "Built a custom lightweight portfolio using vanilla JS and GSAP for performance-focused animations. Focused on a 'content-first' design philosophy with glassmorphism elements.",
        result: "Delivered a visually stunning, fast-loading site that increased client inquiries by 40% for the featured designer.",
        tech: ["HTML", "CSS", "JavaScript", "GSAP"],
        live: "https://rohit3576.github.io/Riddhi-Makvana-Creative-Studio/",
        github: "#",
        image: "https://placehold.co/1200x600/904ae2/white?text=Creative+Studio"
    },
    {
        id: 5,
        title: "Yuvas Film Production",
        tag: "Web Development",
        shortDesc: "A dynamic and cinematic digital presence for a professional film production house.",
        problem: "Yuvas Film Production lacked a centralized platform to showcase their portfolio to international clients and collaborators.",
        approach: "Developed a responsive web platform with integrated video galleries and project showcases. Optimized for high-resolution media while maintaining fast performance.",
        result: "Successfully established a global digital identity, leading to multiple successful collaborations with international storytellers.",
        tech: ["HTML", "CSS", "JavaScript", "WordPress"],
        live: "https://yuvasfilmproduction.com/",
        github: "#",
        image: "https://placehold.co/1200x600/e2904a/white?text=Film+Production"
    }
];

function initProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

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

        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openProjectModal(project.id);
        });
        grid.appendChild(card);
    });

    // GSAP Entrance Animation
    gsap.from(".project-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
    });

    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');

    if (closeBtn) closeBtn.onclick = closeProjectModal;
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeProjectModal();
        });
    }

    if (window.initCardTilt) window.initCardTilt();
}

function openProjectModal(projectId) {
    const project = projectData.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    // Update content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').innerHTML = `
        <div class="modal-section">
            <h4>The Problem</h4>
            <p>${project.problem}</p>
        </div>
        <div class="modal-section">
            <h4>Our Approach</h4>
            <p>${project.approach}</p>
        </div>
        <div class="modal-section">
            <h4>The Result</h4>
            <p>${project.result}</p>
        </div>
    `;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('modal-tech').innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');
    document.getElementById('modal-live').href = project.live;
    document.getElementById('modal-github').href = project.github;

    // Handle Lenis
    const lenis = window.getLenis ? window.getLenis() : null;
    if (lenis) {
        lenis.stop();
    }

    // Handle Cursor
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    if (cursor) cursor.style.opacity = "0";
    if (follower) follower.style.opacity = "0";

    modal.classList.add('active');
    document.body.classList.add("modal-open");

    // Animation
    gsap.fromTo(modal, 
        { backgroundColor: "rgba(0,0,0,0)", backdropFilter: "blur(0px)" },
        { backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(15px)", duration: 0.4 }
    );

    gsap.fromTo(".modal-content", 
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    gsap.to(".modal-content", {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            modal.classList.remove('active');
            document.body.classList.remove("modal-open");

            // Restart Lenis
            const lenis = window.getLenis ? window.getLenis() : null;
            if (lenis) {
                lenis.start();
            }

            // Restore Cursor
            const cursor = document.querySelector(".cursor");
            const follower = document.querySelector(".cursor-follower");
            if (cursor) cursor.style.opacity = "1";
            if (follower) follower.style.opacity = "1";
        }
    });

    gsap.to(modal, {
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "blur(0px)",
        duration: 0.3
    });
}

window.initProjects = initProjects;
