import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { useResponsive } from "../hooks/useResponsive";

function ProjectsSection({ data }) {
  const [activeProject, setActiveProject] = useState(data.projects[0]?.title ?? "");
  const { isDesktop } = useResponsive();

  return (
    <SectionWrapper id="work" title="Work" subtitle="Selected Projects">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {data.projects.map((project) => (
          <motion.article
            key={project.title}
            onClick={() => setActiveProject((prev) => (prev === project.title ? "" : project.title))}
            whileHover={isDesktop ? { y: -8, rotateX: 3, rotateY: -3, scale: 1.01 } : { y: -3 }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className={`overflow-hidden rounded-3xl border bg-white/80 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:bg-slate-900/55 dark:shadow-black/25 ${
              activeProject === project.title
                ? "border-blue-400/70 shadow-blue-300/30 dark:shadow-blue-900/30"
                : "border-slate-200/80 dark:border-slate-700/70"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img src={project.image} alt={project.title} className="h-44 w-full object-cover" loading="lazy" />
            <div className="space-y-4 p-5 sm:p-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {activeProject === project.title
                  ? project.summary
                  : `${project.summary.slice(0, 110)}...`}
              </p>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">{project.impact}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs text-slate-600 dark:border-slate-600/80 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                >
                  GitHub {"->"}
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
                >
                  Live Demo {"->"}
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default ProjectsSection;
