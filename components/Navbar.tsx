"use client";
import { link } from "fs";
import { transform } from "next/dist/build/swc/generated-native";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path/win32";
import React, { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisble] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = 0;

    const handleScroll = () => {
      const currenScrollY = window.scrollY;

      if (currenScrollY > lastScrollY && currenScrollY > 100) {
        if (!isOpen) {
          setIsVisble(false);
        }
        setIsScrolled(true);
      } else if (currenScrollY < lastScrollY || currenScrollY <= 100) {
        setIsVisble(true);
        setIsScrolled(currenScrollY <= 50);
      }

      lastScrollY = currenScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0" tabIndex={0}>
            <Link
              href="/"
              className="font-zentry text-2xl font-bold text-white"
            >anix_94</Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-7">
              {links.map((link, idx) => (
                <Link href={link.href} className="nav-hover-btn">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
