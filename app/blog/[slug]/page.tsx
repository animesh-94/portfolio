import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog-posts";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Animesh Yadav`, description: post.excerpt };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-container max-w-3xl">
        {/* Back */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#00d4ff] transition-colors font-mono mb-8"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-[#475569] font-mono">
            <Calendar size={13} />
            <span>{post.date}</span>
            <span className="mx-2">·</span>
            <span>Animesh Yadav</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#00d4ff]/30 via-[#6c5ce7]/20 to-transparent mb-10" />

        {/* Content */}
        <article className="prose-custom">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#1a2d4a]">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1a2d4a] text-sm text-[#94a3b8] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all font-medium"
          >
            <ArrowLeft size={14} /> All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
