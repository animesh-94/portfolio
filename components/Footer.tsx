import { Mail, Trophy, Code2 } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t-2 border-black py-24 bg-white relative overflow-hidden">
      {/* Footer Grid Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      <div className="section-container relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300">Terminal_Output</span>
            </div>
            <p className="font-sans text-2xl text-black font-black uppercase tracking-tighter">
              Animesh_Yadav
            </p>
            <p className="text-[10px] font-mono text-neutral-400 mt-3 uppercase tracking-[0.2em] font-black">
              Engineering high-performance systems // ms {"->"} μs
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: FiGithub, href: "https://github.com/animesh-94", label: "GitHub" },
              { icon: FiLinkedin, href: "https://www.linkedin.com/in/animesh-yadav-111947256/", label: "LinkedIn" },
              { icon: Code2, href: "https://leetcode.com/u/_animesh_94/", label: "LeetCode" },
              { icon: Trophy, href: "https://codeforces.com/profile/_animesh_94", label: "Codeforces" },
              { icon: Mail, href: "mailto:animeshyadav132@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-14 h-14 border-2 border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-mono text-neutral-300 uppercase tracking-widest font-black">
            © {new Date().getFullYear()} ANIMESH_YADAV. ALL_SYSTEMS_OPERATIONAL [v2.4.0]
          </p>
          <div className="flex gap-8">
            <span className="font-mono text-[8px] text-neutral-200 font-black uppercase">Latency: 0.04ms</span>
            <span className="font-mono text-[8px] text-neutral-200 font-black uppercase">Status: 200 OK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
