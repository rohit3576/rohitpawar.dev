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
  title: 'Python, Java & AI/ML Developer',
  location: 'Vasai-Virar, Maharashtra, India',
  phone: '+91 73979 73352',
  email: 'rohit03576@gmail.com',
  github: 'https://github.com/rohit3576',
  linkedin: 'https://www.linkedin.com/in/rohitpawar03576/',
  resume: '/resume/Rohit_CV.pdf',
  intro:
    'Computer Engineering graduate (B.E. 2026) interested in software development, AI/ML, and building practical applications. I focus on developing intelligent workflows, scalable backend systems, and responsive user interfaces.',
  education: {
    degree: 'Bachelor of Engineering (Computer Engineering)',
    school: "Vidyavardhini's College of Engineering and Technology",
    year: '2026',
  },
  achievement: 'IEEE IC3ET 2026 Presentation & 1st Place VNPS Showcase',
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
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Responsive Design'],
    summary: 'Responsive web applications built with React.js and modern JavaScript for seamless user experiences.',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Python', 'FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'Java'],
    summary: 'Scalable backend systems and robust REST APIs designed for performance and reliability.',
  },
  {
    title: 'AI / ML',
    icon: BrainCircuit,
    skills: ['NLP', 'Recommendation Systems', 'Speech Recognition', 'RAG Systems', 'AI Inference'],
    summary: 'Intelligent workflows involving speech processing, recommendation engines, and NLP-based automation.',
  },
  {
    title: 'Tools / Data',
    icon: Database,
    skills: ['MySQL', 'SQL', 'Streamlit', 'Git', 'GitHub', 'Postman'],
    summary: 'Proficient in data management, version control, and tool-driven development pipelines.',
  },
];

export const techStack = [
  'Python',
  'JavaScript',
  'Java',
  'SQL',
  'FastAPI',
  'Node.js',
  'Express.js',
  'React.js',
  'NLP',
  'RAG Systems',
  'Speech Recognition',
  'Streamlit',
  'MySQL',
  'Git',
  'GitHub',
  'Postman',
];

export const projects: Project[] = [
  {
    title: 'Conscia: AI-Powered Ethical Shopping Companion',
    description:
      'AI-powered recommendation platform for ethical product analysis and intelligent shopping workflows. Presented the research project at IEEE IC3ET 2026 conference.',
    tech: ['Python', 'AI', 'Recommendation Systems', 'Ethical Analysis'],
    linkLabel: 'Project Details',
    href: '#contact',
  },
  {
    title: 'VoiceBrief-AI',
    description:
      'AI-powered voice transcription and summarization backend system with integrated speech-processing pipelines and NLP-based workflows.',
    tech: ['Python', 'NLP', 'Speech Processing', 'Summarization'],
    linkLabel: 'GitHub Repository',
    href: profile.github,
  },
  {
    title: 'Multilingual-ASR',
    description:
      'Multilingual speech-to-text processing system featuring robust AI inference workflows and cross-language support.',
    tech: ['Python', 'AI Inference', 'Speech-to-Text', 'Multilingual'],
    linkLabel: 'Project Details',
    href: '#contact',
  },
  {
    title: 'Flappy Bird Game System',
    description:
      'Interactive game implementing real-time rendering and collision detection logic. Secured 1st Place at VNPS Project Showcase.',
    tech: ['JavaScript', 'Game Logic', 'Real-time Rendering', 'UI Design'],
    linkLabel: 'Project Showcase',
    href: '#contact',
  },
];

export const experiences: Experience[] = [
  {
    role: 'Freelance Web & Backend Developer',
    company: 'Self-Employed',
    period: '2024 - Present',
    points: [
      'Developed responsive websites and lightweight web applications for freelance and personal projects.',
      'Built backend functionalities, REST APIs, and deployment workflows using Python, FastAPI, Node.js, and JavaScript.',
      'Worked on deployment, debugging, optimization, and integration of AI-powered features.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'Yuvas Film Production',
    period: 'Jan 2025 - Mar 2025',
    points: [
      'Developed responsive web applications using React.js, JavaScript, HTML, and CSS.',
      'Assisted in backend integration, debugging, testing, and deployment processes.',
    ],
  },
];

export const utilityStats = [
  { value: '2026', label: 'B.E. Computer Engineering' },
  { value: 'AI/ML', label: 'Focus Area' },
  { value: 'IEEE', label: 'IC3ET Presenter' },
];

export const stackHighlights = [
  { icon: BrainCircuit, label: 'NLP & AI Inference' },
  { icon: Server, label: 'FastAPI & Node Backends' },
  { icon: Sparkles, label: 'Interactive React Apps' },
];

