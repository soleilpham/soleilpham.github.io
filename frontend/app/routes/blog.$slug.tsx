import type { Route } from "./+types/blog.$slug";
import { Link, useParams } from "react-router";
import { PageWrapper, TagMuted } from "../components/ui";
import { cn } from "../styles";
import posts from "../blog/index";

export function meta({ params }: Route.MetaArgs) {
  const post = posts.find((p) => p.slug === params.slug);
  return [{ title: post ? `${post.title} — Soleil Pham` : "Post not found" }];
}

const backLink = (
  <Link to="/blog" className={`${cn.accentLink} text-sm font-semibold`}>
    ← Back to blog
  </Link>
);

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageWrapper>
        <p className={`${cn.bodyText} mb-4`}>Post not found.</p>
        {backLink}
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="mb-6">{backLink}</div>

      <article className={`${cn.card} p-5 sm:p-6`}>
        <p className={`${cn.mutedText} mb-1`}>{post.date}</p>
        <h1 className={`${cn.sectionTitle} mb-3`}>{post.title}</h1>
        {post.tags.length > 0 && (
          <div className={`${cn.itemTags} mb-5`}>
            {post.tags.map((t) => <TagMuted key={t}>{t}</TagMuted>)}
          </div>
        )}
        <div className={`${cn.divider} mb-5`} />
        <p className={`${cn.bodyText} text-slate-700 whitespace-pre-wrap`}>{post.content}</p>
      </article>
    </PageWrapper>
  );
}
