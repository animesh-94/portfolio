"use client";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";

export default function GitHubActivity() {
  return (
    <motion.section 
      id="github" 
      className="py-12 section-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="divider">GitHub Activity</div>
      
      <div className="border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 flex flex-col items-center gap-6 overflow-hidden">
        <div className="flex items-center gap-3 w-full border-b border-neutral-100 pb-4 mb-2">
          <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest">
            github.com/<a href="https://github.com/animesh-94" target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:underline">animesh-94</a>
          </span>
        </div>

        <div className="w-full overflow-x-auto pb-4 scrollbar-thin flex justify-start md:justify-center">
          <div className="min-w-max px-2">
            <GitHubCalendar
              username="animesh-94"
              colorScheme="light"
              blockSize={12}
              blockMargin={2}
              theme={{
                light: ["#f5f5f5", "#d1d5db", "#9ca3af", "#4b5563", "#000000"],
              }}
              labels={{
                totalCount: "{{count}} contributions in last year",
              }}
              style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "#666" }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
