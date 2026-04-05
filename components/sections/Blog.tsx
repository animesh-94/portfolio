"use client";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function Blog() {
  return (
    <motion.section 
      id="blog" 
      className="py-24 section-container bg-white relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Background Marker */}
      <div className="absolute top-0 right-0 p-8 font-mono text-[80px] text-neutral-50 font-black select-none pointer-events-none hidden lg:block uppercase tracking-tighter leading-none">
        KNOWLEDGE<br />_BASE
      </div>

      <div className="relative mb-20">
        <motion.div 
          className="flex items-center gap-3 mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="w-8 h-1 bg-black"></span>
          <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-neutral-400">Technical_Writings</span>
        </motion.div>
        <motion.h2 
          className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Engineering_Blog
        </motion.h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {blogPosts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (i + 1) }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="p-10 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex flex-col group relative overflow-hidden h-full"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-4xl font-black text-neutral-100 group-hover:text-black transition-colors duration-500 select-none">
                  0{i + 1}
                </span>
                <ArrowRight size={22} className="text-black group-hover:translate-x-2 transition-transform duration-500" />
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] font-mono uppercase font-black tracking-widest text-neutral-300 border-2 border-neutral-50 px-2 py-0.5 group-hover:border-black group-hover:text-black transition-colors duration-500">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-black text-black group-hover:underline underline-offset-8 decoration-4 text-xl leading-tight mb-6 uppercase tracking-tighter">
                {post.title}
              </h3>

              <p className="text-sm text-neutral-500 leading-relaxed flex-1 mb-10 font-medium">{post.excerpt}</p>

              <div className="flex items-center gap-3 text-[10px] text-black font-black font-mono border-t-2 border-neutral-50 pt-6 group-hover:border-black transition-colors duration-500 mt-auto uppercase tracking-widest">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
