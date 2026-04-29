import {
  BrainCircuit,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Phone,
  Server,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
  summary: string;
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  linkLabel: string;
  href: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const profile = {
  name: 'Rohit Pawar',
  title: 'Full Stack & AI Developer',
  location: 'Vasai-Virar, Maharashtra, India',
  phone: '+91 73979 73352',
  email: 'rohit03576@gmail.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
  resume: '/resume/rohit-pawar-resume.jpg',
  intro:
    'Computer Engineering student building full stack web applications and AI-driven systems. I focus on scalable, real-world products with clean architecture, applied machine learning, and reliable deployment paths.',
  education: {
    degree: 'Bachelor of Engineering (Computer Engineering)',
    school: "Vidyavardhini's College of Engineering and Technology",
    year: '2026',
  },
  achievement: '1st Place - VNPS Project Showcase (Flappy Bird Game)',
};

export const navItems = ['About', 'Skills', 'Stack', 'Projects', 'Experience', 'Contact'];

export const contactItems = [
  { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, icon: Phone },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: profile.location, href: '#contact', icon: MapPin },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive UI'],
    summary: 'Fast, accessible interfaces with polished interaction states and clean component structure.',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Java', 'Node.js', 'Express.js', 'REST APIs', 'MySQL', 'SQL'],
    summary: 'API-first systems with practical data modeling, backend logic, and deployment awareness.',
  },
  {
    title: 'AI / ML',
    icon: BrainCircuit,
    skills: ['Python', 'Machine Learning', 'NLP', 'RAG Systems', 'scikit-learn', 'Streamlit'],
    summary: 'Applied ML products for prediction, sentiment analysis, summarization, and AI workflows.',
  },
  {
    title: '3D / Design',
    icon: Palette,
    skills: ['React Three Fiber', 'GSAP', 'Interactive Motion', 'Product UI', 'GitHub'],
    summary: 'Premium web presentation with tasteful 3D, smooth animation, and performance-minded delivery.',
  },
];

export const techStack = [
  'React',
  'JavaScript',
  'Node',
  'Express',
  'Java',
  'Python',
  'MySQL',
  'SQL',
  'NLP',
  'RAG',
  'Streamlit',
  'Git',
  'GitHub',
  'GSAP',
  'Three.js',
  'REST',
];

export const projects: Project[] = [
  {
    title: 'AI-Based Mental Health Sentiment & Stress Analyzer',
    description:
      'NLP-based full stack ML application that analyzes user text, detects sentiment and stress levels, and serves real-time predictions through a deployable interface.',
    tech: ['Python', 'NLP', 'Machine Learning', 'Full Stack', 'Real-time Predictions'],
    linkLabel: 'Live App',
    href: '#contact',
  },
  {
    title: 'Breast Cancer Prediction System',
    description:
      'Machine learning classifier for malignant vs benign tumor prediction with preprocessing pipelines and a Streamlit deployment workflow.',
    tech: ['Python', 'scikit-learn', 'Streamlit', 'Data Preprocessing'],
    linkLabel: 'Live App',
    href: '#contact',
  },
  {
    title: 'VoiceBrief-AI',
    description:
      'AI-powered voice summarization system that uses speech processing and NLP techniques to generate concise summaries from voice inputs.',
    tech: ['AI', 'NLP', 'Speech Processing', 'GitHub'],
    linkLabel: 'GitHub Repository',
    href: profile.github,
  },
  {
    title: 'Flappy Bird Game',
    description:
      'Award-winning project showcase entry recognized with 1st place at VNPS Project Showcase, built as an interactive game experience.',
    tech: ['JavaScript', 'Game Logic', 'UI', 'Project Showcase'],
    linkLabel: 'Project Details',
    href: '#contact',
  },
];

export const experiences: Experience[] = [
  {
    role: 'Freelance Full Stack & AI Developer',
    company: 'Personal and freelance projects',
    period: '2024 - Present',
    points: [
      'Developed full stack and AI-powered applications for personal and freelance use.',
      'Built and deployed machine learning models and interactive web applications.',
      'Managed end-to-end development including backend logic, AI integration, and deployment.',
    ],
  },
  {
    role: 'Full Stack Web Developer Intern',
    company: 'Yuvas Film Production',
    period: 'Jan 2025 - Jun 2025',
    points: [
      'Developed and maintained responsive web applications using HTML, CSS, JavaScript, and React.',
      'Assisted in backend integration and implemented new features based on project requirements.',
      'Collaborated on testing, debugging, and deployment processes.',
    ],
  },
];

export const utilityStats = [
  { value: '2026', label: 'B.E. Computer Engineering' },
  { value: '4+', label: 'Production-minded projects' },
  { value: '1st', label: 'VNPS Project Showcase' },
];

export const stackHighlights = [
  { icon: Database, label: 'SQL + MySQL data layers' },
  { icon: BrainCircuit, label: 'NLP, ML, and RAG systems' },
  { icon: Sparkles, label: 'Interactive React motion' },
];
