import About from "@/components/sections/About";

export const metadata = {
  title: "About | Animesh Yadav",
  description: "Learn more about Animesh Yadav, a systems engineer and backend developer.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <About />
    </main>
  );
}
