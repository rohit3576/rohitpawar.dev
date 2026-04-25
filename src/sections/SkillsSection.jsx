import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

function SkillsSection({ data }) {
  return (
    <SectionWrapper id="skills" title="Skills" subtitle="Frontend, Backend, AI/ML">
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {data.skills.map((group) => (
          <motion.div
            key={group.category}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="rounded-2xl border border-slate-200/80 bg-white/75 p-5 shadow-lg shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/60 dark:shadow-black/20"
          >
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs text-slate-600 dark:border-slate-600/80 dark:bg-slate-800/70 dark:text-slate-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default SkillsSection;
