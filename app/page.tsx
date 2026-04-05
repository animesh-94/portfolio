import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import LeetCodeStats from "@/components/sections/LeetCodeStats";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <LeetCodeStats />
      <GitHubActivity />
      <Contact />
    </>
  );
}
