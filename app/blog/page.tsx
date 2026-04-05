import Blog from "@/components/sections/Blog";

export const metadata = {
  title: "Blog | Animesh Yadav",
  description: "Technical blog and notebooks from Animesh Yadav.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-20">
      <Blog />
    </main>
  );
}
