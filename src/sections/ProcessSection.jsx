import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

function ProcessSection({ data }) {
  return (
    <SectionWrapper id="process" title="Process" subtitle="Discover / Define / Deliver">
      <div className="grid gap-4 md:grid-cols-3">
        {data.process.map((step, index) => (
          <motion.article
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: "easeInOut" }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="rounded-2xl border border-slate-200/80 bg-white/75 p-5 shadow-lg shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/60 dark:shadow-black/20"
          >
            <div className="mb-3 text-2xl">{step.icon}</div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{step.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.description}</p>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default ProcessSection;
