import Games from "@/components/sections/Games";

export const metadata = {
  title: "Games | Animesh Yadav",
  description: "Interactive mini-games built by Animesh Yadav.",
};

export default function GamesPage() {
  return (
    <main className="min-h-screen pt-20">
      <Games />
    </main>
  );
}
