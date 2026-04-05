"use client";
import { ExternalLink, Star, GitFork, Zap } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const projects = [
  {
    name: "NextFlow",
    description:
      "NextFlow is a premium, high-performance AI orchestrator designed to transform complex multi-modal workflows into a fluid, visual experience. Built with a signature glassmorphic aesthetic and a cutting-edge Next.js 16 stack, it provides a sophisticated environment for architecting advanced AI pipelines.",
    url: "https://nextflow-eight.vercel.app/",
    tech: ["Topological Sort", "DAG", "NextJs", "Orchestration: Trigger.dev"],
    featured: true,
    tag: "Distributed AI Worflow",
  },
  {
    name: "PortfolioOptimizer",
    description:
      "Clean client–server architecture: all quantitative logic (portfolio optimization, risk analysis) runs in a high-performance C++ backend. React frontend for visualization.",
    url: "http://portfolio-optimizer-frontend.s3-website.eu-north-1.amazonaws.com/",
    tech: ["C++", "JavaScript", "React", "REST API"],
    featured: true,
    tag: "Finance / Systems",
  },
  {
    name: "graph-navigator",
    description:
      "Interactive graph algorithm visualizer built with TypeScript. Real-time BFS/DFS traversal, articulation points, and bridge detection with animated step-by-step execution.",
    url: "https://github.com/animesh-94/graph-navigator",
    tech: ["TypeScript", "React", "Algorithms", "Visualization"],
    featured: true,
    tag: "Algorithms / DSA",
  },
  {
    name: "parallel_algorithm",
    description:
      "Benchmarks sequential vs OpenMP-parallel BFS, matrix multiplication, and merge sort in C++. Analyzes scalability, speedup, and synchronization overhead across core counts.",
    url: "https://github.com/animesh-94/parallel_algorithm",
    tech: ["C++", "OpenMP", "Algorithms", "Parallel Computing"],
    featured: true,
    tag: "Systems / HPC",
  },
  {
    name: "LLD-and-OOPS-JAVA",
    description:
      "Comprehensive repository of Low-Level Design patterns and OOP concepts in Java — Strategy, Observer, Factory, SOLID principles with detailed annotations.",
    url: "https://github.com/animesh-94/LLD-and-OOPS-JAVA",
    tech: ["Java", "Design Patterns", "OOP", "LLD"],
    tag: "Architecture",
  },
  {
    name: "HTTP-server-in-C-",
    description:
      "Lightweight HTTP server built from scratch in C++. Demonstrates socket programming, HTTP/1.1 request parsing, and protocol-level I/O without any framework.",
    url: "https://github.com/animesh-94/HTTP-server-in-C-",
    tech: ["C++", "Socket Programming", "HTTP", "TCP/IP"],
    tag: "Systems / Networking",
  },
  {
    name: "Hackathon_ChatBot",
    description:
      "JavaScript-based chatbot featuring automated responses, basic NLP concepts, and event-driven logic. Built during a hackathon.",
    url: "https://github.com/animesh-94/Hackathon_ChatBot",
    tech: ["JavaScript", "NLP", "Event-Driven"],
    tag: "AI / Hackathon",
  },
];

const cpStats = [
  {
    platform: "LeetCode",
    username: "_animesh_94",
    url: "https://leetcode.com/u/_animesh_94/",
    color: "#f89f1b",
    icon: "🟡",
    stats: [
      { label: "Profile", value: "Active" },
      { label: "Focus", value: "DSA & Interviews" },
      { label: "Topics", value: "Trees, Graphs, DP" },
    ],
  },
  {
    platform: "Codeforces",
    username: "_animesh_94",
    url: "https://codeforces.com/profile/_animesh_94",
    color: "#1890ff",
    icon: "🔵",
    stats: [
      { label: "Profile", value: "Active" },
      { label: "Focus", value: "Competitive Programming" },
      { label: "Topics", value: "Greedy, Math, DP" },
    ],
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <motion.section
      id="projects"
      className="pt-48 pb-24 section-container bg-white border-y border-neutral-100 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Background Marker */}
      <div className="absolute top-0 right-0 p-8 font-mono text-[80px] text-neutral-50 font-black select-none pointer-events-none hidden lg:block uppercase tracking-tighter leading-none">
        DEPLOYED<br />_WORKS
      </div>

      <div className="relative mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-black"></span>
            <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Project_Repository</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter">Feature_Builds</h2>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 bg-neutral-100 p-2 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black">Status: LIVE_FEED</span>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-8 mb-24">
        {featured.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-10 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex flex-col group relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Project Index */}
            <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-black text-neutral-50 group-hover:text-neutral-100 transition-colors">
              0{i + 1}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {p.tech.map(t => (
                <span key={t} className="px-2 py-1 bg-black text-white text-[9px] font-mono font-black uppercase tracking-tighter">
                  {t}
                </span>
              ))}
            </div>

            <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tight group-hover:underline decoration-4 underline-offset-8">
              {p.name}
            </h3>

            <p className="text-neutral-600 leading-relaxed text-sm mb-10 flex-1">
              {p.description}
            </p>

            <div className="flex items-center gap-4 mt-auto">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-black tracking-widest text-black">
                Explore_Source →
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="divider">Archive_Prototypes</div>
      <div className="grid md:grid-cols-3 gap-6 mb-12 mt-8">
        {rest.map((p, index) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex flex-col group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (index * 0.05) }}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-black text-xs uppercase group-hover:underline">{p.name}</h4>
              <span className="text-black text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed mb-6 flex-1 italic">"{p.description}"</p>
            <div className="flex flex-wrap gap-1 text-[9px] text-neutral-400 font-mono font-bold uppercase tracking-tighter">
              {p.tech.join(" // ")}
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <a
          href="https://github.com/animesh-94"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-5 border-2 border-black bg-white text-black font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
        >
          Explore full_history_repository ↗
        </a>
      </motion.div>
    </motion.section>
  );
}
