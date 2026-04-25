import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

function AboutSection({ data }) {
  return (
    <SectionWrapper id="about" title="About" subtitle="Who I Am">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/55 dark:shadow-black/20 sm:p-8"
      >
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.6fr] md:gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Designing with clarity, building with depth.</h3>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">{data.about}</p>
            <div className="mt-4 space-y-3">
              {data.aboutStory.map((item) => (
                <p key={item} className="text-sm leading-relaxed text-slate-600 dark:text-slate-300/90">
                  {item}
                </p>
              ))}
            </div>
            <a
              href={data.resumeUrl}
              download
              className="mt-6 inline-flex rounded-full border border-slate-200/80 bg-white/80 px-5 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600/80 dark:bg-slate-900/70 dark:text-slate-100"
            >
              Download Resume
            </a>
          </div>
        </div>
      </motion.article>
    </SectionWrapper>
  );
}

export default AboutSection;
