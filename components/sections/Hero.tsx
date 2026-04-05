"use client";
import {
  SiCplusplus, SiTailwindcss, SiTypescript, SiNodedotjs,
  SiDocker, SiNextdotjs, SiGit, SiPython, SiReact,
  SiRedis, SiPostgresql, SiRust, SiLinux, SiApachekafka,
  SiGo, SiKubernetes, SiMongodb,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { motion } from "framer-motion";

const techStack = [
  { name: "C++",        icon: SiCplusplus },
  { name: "Java",       icon: FaJava },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python",     icon: SiPython },
  { name: "Go",         icon: SiGo },
  { name: "Rust",       icon: SiRust },
  { name: "React",      icon: SiReact },
  { name: "Next.js",    icon: SiNextdotjs },
  { name: "Node.js",    icon: SiNodedotjs },
  { name: "Docker",     icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "Redis",      icon: SiRedis },
  { name: "Kafka",      icon: SiApachekafka },
  { name: "Postgres",   icon: SiPostgresql },
  { name: "MongoDB",    icon: SiMongodb },
  { name: "Linux",      icon: SiLinux },
  { name: "Tailwind",   icon: SiTailwindcss },
  { name: "Git",        icon: SiGit },
];

export default function Hero() {
  return (
    <motion.section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center section-container pt-32 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Grid Marker */}
      <div className="absolute top-10 left-10 font-mono text-[10px] text-neutral-300 select-none hidden lg:block uppercase tracking-[0.2em]">
        POS: 28.6139° N, 77.2090° E<br />
        SEC: ALPHA_V2.0.4
      </div>

      {/* Name Heading */}
      <div className="mb-16 relative">
        <div className="absolute -left-8 top-0 h-full w-1 bg-black hidden md:block"></div>
        <motion.h1 
          className="text-7xl md:text-9xl font-black tracking-tighter text-black leading-[0.85] uppercase"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Animesh<br />
          <span className="inline-block hover:translate-x-4 transition-transform duration-500 cursor-default">Yadav</span>
        </motion.h1>
        <motion.div 
          className="mt-8 flex items-center gap-4 text-black font-mono text-xs uppercase font-black tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="w-12 h-0.5 bg-black"></span>
          Software Engineer | Backend Engineer | Competitive Programmer
        </motion.div>
      </div>

      <div className="max-w-4xl">
        <motion.div 
          className="space-y-8 text-neutral-600 leading-relaxed text-lg md:text-xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className="indent-12">
            Oh, hello. You found my website. <span className="text-black font-black underline decoration-4 underline-offset-4">Animesh here.</span>
          </p>

          <div className="text-sm italic text-neutral-400 bg-neutral-50 p-4 border border-dashed border-neutral-200">
            (If you&apos;re just here to see my work and don&apos;t care about reading—the competitive programming stats, low-latency projects, and technical experience are all below. Scroll down. I won&apos;t be offended.)
          </div>

          <p>
            I build systems. Not &quot;how to set up a website&quot;—the <span className="bg-white text-bold text-black px-2 py-0.5 whitespace-nowrap">actual engineering part</span>. Where algorithms meet bare metal. Most people find microsecond optimizations and cache-friendly data structures boring. I find them fascinating. <span className="text-black italic">We can&apos;t all have good taste.</span>
          </p>

          <p>
            This is my digital workbench. High-frequency trading architectures, distributed systems, parallel computing, and kernel-level performance. My peers keep asking why I don&apos;t just &quot;pick a simple framework.&quot; That&apos;s like asking which optimization pass is my favorite. <span className="text-black font-bold">They&apos;re all essential if you want the system to actually fly.</span>
          </p>

          <p>
            Career matters: I&apos;m a Software Engineer who treats competitive programming as a high-stakes sport. I&apos;m currently looking for the next place where I can take <span className="font-mono font-bold text-black border-b-2 border-black inline-block leading-none">ms {"->"} μs</span>.
          </p>
        </motion.div>

        {/* Infinite Tech Stack Marquee */}
        <motion.div
          className="mt-20 mb-16 border-y-2 border-black py-5 select-none relative bg-white"
          style={{ overflow: "hidden" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Fade masks */}
          <div style={{ position: "absolute", inset: "0 auto 0 0", width: 80, background: "linear-gradient(to right, white, transparent)", zIndex: 10, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: "0 0 0 auto", width: 80, background: "linear-gradient(to left, white, transparent)", zIndex: 10, pointerEvents: "none" }} />

          {/* Single strip — framer animates x from 0 to -50% infinitely */}
          <motion.div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              width: "max-content",
            }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "0 28px",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {/* Rotating icon */}
                <motion.span
                  style={{ display: "inline-flex" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                >
                  <tech.icon size={20} style={{ color: "#000" }} />
                </motion.span>
                <span className="font-mono text-sm font-black uppercase tracking-tighter text-black">
                  {tech.name}
                </span>
                <span style={{ color: "#d1d5db", fontSize: "1rem", marginLeft: 8 }}>·</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-12 py-5 border-2 border-black bg-black text-white hover:bg-white hover:text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all font-black text-sm uppercase tracking-[0.3em]"
          >
            view_work()
          </a>
          <a
            href="mailto:animeshyadav132@gmail.com"
            className="inline-flex items-center justify-center px-12 py-5 border-2 border-black bg-white text-black hover:bg-black hover:text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all font-black text-sm uppercase tracking-[0.3em]"
          >
            connect —→
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

