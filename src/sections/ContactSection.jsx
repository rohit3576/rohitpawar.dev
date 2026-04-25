import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

function ContactSection({ data }) {
  return (
    <SectionWrapper id="contact" title="Let's work together" subtitle="Contact">
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="rounded-3xl border border-slate-200/80 bg-white/80 p-8 text-center shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/60 dark:shadow-black/25"
      >
        <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          Open to meaningful collaborations, product builds, and modern web + AI projects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${data.email}`}
            className="rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300/35"
          >
            Email
          </a>
          <a
            href={data.socials.find((item) => item.label === "LinkedIn")?.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-200/80 bg-white/80 px-5 py-2.5 text-sm text-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600/80 dark:bg-slate-800/70 dark:text-slate-100"
          >
            LinkedIn
          </a>
          <a
            href={data.socials.find((item) => item.label === "GitHub")?.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-200/80 bg-white/80 px-5 py-2.5 text-sm text-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600/80 dark:bg-slate-800/70 dark:text-slate-100"
          >
            GitHub
          </a>
        </div>
      </motion.div>
      <footer className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
        Rohit Pawar - Full Stack & AI Developer
      </footer>
    </SectionWrapper>
  );
}

export default ContactSection;
