"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Terminal, PenLine, Gamepad2, Mail } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { id: "home", icon: Home, href: "/", label: "HME" },
    { id: "about", icon: User, href: "/about", label: "ABT" },
    { id: "projects", icon: Terminal, href: "/#projects", label: "WRK" },
    { id: "blog", icon: PenLine, href: "/blog", label: "BLG" },
    { id: "games", icon: Gamepad2, href: "/games", label: "GME" },
    { id: "contact", icon: Mail, href: "/#contact", label: "CNT" },
  ];

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-0 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href.startsWith("/#") && pathname === "/");
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-3 transition-all relative group ${
                isActive
                  ? "bg-black text-white"
                  : "text-black hover:bg-neutral-50"
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 3 : 2} />
              <span className="text-[8px] font-black tracking-tighter uppercase font-mono">{item.label}</span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
