"use client";
import { Mail, MessageSquare, Send } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "animeshyadav132@gmail.com",
    href: "mailto:animeshyadav132@gmail.com",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "animesh-94",
    href: "https://github.com/animesh-94",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "Animesh Yadav",
    href: "https://www.linkedin.com/in/animesh-yadav-111947256/",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:animeshyadav132@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <motion.section
      id="contact"
      className="section-container"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <div className="mb-12">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          — Communication_Handler
        </motion.p>
        <motion.h2
          className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Contact
        </motion.h2>
      </div>

      {/* Contact links — clean, subtle row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {contacts.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-6 py-5 border border-neutral-200 bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            <div className="w-10 h-10 border border-neutral-200 group-hover:border-black group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0">
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-0.5">{label}</p>
              <p className="font-mono text-xs font-black text-black truncate group-hover:underline underline-offset-2">{value}</p>
            </div>
          </a>
        ))}
      </motion.div>

      {/* Message form */}
      <motion.div
        className="border border-black bg-white p-8 md:p-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {/* Form header */}
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-neutral-100">
          <MessageSquare size={18} className="text-black shrink-0" />
          <span className="font-mono text-sm font-black uppercase tracking-widest text-black">
            Send a message
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name + Email row */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-black px-4 py-3.5 text-sm text-black placeholder:text-neutral-300 focus:outline-none transition-colors font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@email.com"
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-black px-4 py-3.5 text-sm text-black placeholder:text-neutral-300 focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="What's on your mind?"
              className="w-full bg-neutral-50 border border-neutral-200 focus:border-black px-4 py-3.5 text-sm text-black placeholder:text-neutral-300 focus:outline-none transition-colors font-mono resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="flex items-center gap-2.5 px-8 py-4 bg-black text-white font-mono font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black border border-black transition-all"
            whileHover={{ x: 2, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {sent ? (
              <>✓ &nbsp;Mail client opened</>
            ) : (
              <>
                <Send size={13} />
                Send message
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
}
