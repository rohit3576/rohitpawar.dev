import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

function ExperienceSection({ data }) {
  return (
    <SectionWrapper id="experience" title="Experience" subtitle="Professional Journey">
      <div className="relative space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-slate-300/70 dark:before:bg-slate-600/70">
        {data.experience.map((item) => (
          <motion.div
            key={item.title}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 24 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative ml-12 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/60"
          >
            <span className="absolute -left-10 top-8 h-3.5 w-3.5 rounded-full bg-blue-500" />
            <p className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              {item.period}
            </p>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.details}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default ExperienceSection;
