"use client";
import { Server, Database, GitBranch, Cpu, Globe, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
  { category: "Languages", items: ["C++", "Java", "TypeScript", "JavaScript", "Python"] },
  { category: "Backend", items: ["Node.js", "Express", "Next.js", "REST APIs", "Socket Programming"] },
  { category: "Systems", items: ["OpenMP", "POSIX Threads", "TCP/IP", "Memory Management", "Concurrency"] },
  { category: "Tools", items: ["Git", "Docker", "Linux", "Vim", "GDB", "Valgrind"] },
];

const highlights = [
  { icon: Server, label: "Systems Programming", desc: "HTTP servers, socket I/O, protocol-level code in C++" },
  { icon: Cpu, label: "Parallel Computing", desc: "OpenMP, POSIX threads, lock-free data structures" },
  { icon: Database, label: "Low-Level Design", desc: "Design patterns, SOLID principles, OOP in Java" },
  { icon: Globe, label: "Full-Stack Dev", desc: "React, Next.js, TypeScript end-to-end applications" },
  { icon: GitBranch, label: "Open Source", desc: "Active contributor, 19+ public repositories" },
  { icon: Code2, label: "Competitive Programming", desc: "LeetCode & Codeforces — DSA problem solving" },
];

export default function About() {
  return (
    <motion.section 
      id="about" 
      className="pt-48 pb-24 section-container bg-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Background Marker */}
      <div className="absolute top-0 right-0 p-8 font-mono text-[80px] text-neutral-50 font-black select-none pointer-events-none hidden lg:block uppercase tracking-tighter leading-none">
        IDENTITY<br />_V3.0
      </div>

      <div className="relative mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
           initial={{ x: -20, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-black"></span>
            <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-neutral-400">System_Attributes</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter">About_Me</h2>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start mt-8 relative">
        {/* Left — bio */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-10 mb-12">
            <h3 className="font-mono text-black text-xs mb-8 uppercase font-black tracking-widest">// bio_instance.json</h3>
            <div className="font-mono text-sm text-neutral-600 space-y-4">
              <p>{"{"}</p>
              <p className="ml-6">"identity": <span className="text-black font-black">"Animesh Yadav"</span>,</p>
              <p className="ml-6">"status": <span className="text-black font-bold">"Software Engineer"</span>,</p>
              <p className="ml-6">"specialization": ["Systems", "Backend", "HFT"],</p>
              <p className="ml-6">"operating_philosophy": <span className="text-black italic">&quot;Bare metal over magic&quot;</span></p>
              <p>{"}"}</p>
            </div>
          </div>

          <div className="space-y-6 pt-10 text-neutral-600 leading-relaxed text-base font-medium">
            <p>
              I build software that prioritizes performance and structural integrity. My expertise lies in <span className="text-black font-black underline decoration-2">systems-level engineering</span> and architecting scalable backend solutions.
            </p>

            <p className="text-neutral-400 leading-relaxed text-sm italic border-l-4 border-black pl-6 py-2">
              &quot;I believe the best engineers understand what happens at every layer of the stack — from protocol bytes to high-level design patterns.&quot;
            </p>
          </div>

          <a
            href="mailto:animeshyadav132@gmail.com"
            className="inline-flex items-center justify-center mt-10 px-10 py-4 border-2 border-black bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Contact_Direct →
          </a>
        </motion.div>

        {/* Right — skills + highlights */}
        <motion.div 
          className="space-y-10"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {/* Tech Stack Box */}
          <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest mb-8 font-black">Expertise_Matrix</h3>
            <div className="space-y-6">
              {skills.map((group) => (
                <div key={group.category} className="flex flex-col gap-3">
                  <span className="text-[10px] text-black font-black font-mono tracking-[0.2em] uppercase">{group.category}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-neutral-100 text-black text-[10px] font-mono font-bold border-2 border-neutral-100 uppercase tracking-tighter">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* highlights */}
          <div className="grid grid-cols-2 gap-6">
            {highlights.map(({ icon: Icon, label, desc }, index) => (
              <motion.div 
                key={label} 
                className="p-6 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <Icon size={20} className="text-black mb-4 group-hover:rotate-12 transition-transform" />
                <p className="text-[10px] font-black text-black uppercase mb-2 tracking-tighter">{label}</p>
                <p className="text-[10px] text-neutral-500 leading-tight font-medium">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
