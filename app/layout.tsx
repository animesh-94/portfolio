import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Animesh Yadav — Systems Engineer",
  description:
    "Portfolio of Animesh Yadav — CS student specializing in systems programming, backend engineering, and low-level design. C++, Java, TypeScript.",
  keywords: ["Animesh Yadav", "portfolio", "systems engineer", "C++", "backend", "LLD", "Next.js"],
  authors: [{ name: "Animesh Yadav", url: "https://github.com/animesh-94" }],
  openGraph: {
    title: "Animesh Yadav — Systems Engineer",
    description: "Personal portfolio with projects, blog, games, and more.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="font-mono antialiased bg-bg-primary text-text-primary selection:bg-accent-green/20 selection:text-accent-green">
        <main className="min-h-screen pt-24 pb-32">{children}</main>
        <Navbar />
      </body>
    </html>
  );
}
