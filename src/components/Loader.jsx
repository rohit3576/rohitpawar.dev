import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
      <div className="space-y-6 text-center">
        <motion.div
          className="mx-auto h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-500 dark:border-slate-700 dark:border-t-blue-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          className="text-sm tracking-[0.3em] text-slate-500 dark:text-slate-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          LOADING EXPERIENCE
        </motion.p>
      </div>
    </div>
  );
}

export default Loader;
