import { motion } from "framer-motion";

function SectionWrapper({ id, title, subtitle, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="mb-16 scroll-mt-28 sm:mb-20 md:mb-24"
    >
      <div className="mb-6 sm:mb-8">
        <p className="mb-2 text-xs uppercase tracking-[0.22em] text-blue-300 sm:text-sm">
          {subtitle}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

export default SectionWrapper;
