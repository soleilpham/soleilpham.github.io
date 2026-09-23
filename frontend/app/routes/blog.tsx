import type { Route } from "./+types/blog";
import { Link } from "react-router";
import { PageWrapper, SectionHeader, TagMuted } from "../components/ui";
import { cn } from "../styles";
import posts from "../blog/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Blog — Soleil Pham" }];
}

export default function Blog() {
  return (
    <PageWrapper>
      <SectionHeader label="Blog" title="Writing" />
      {posts.length > 0 && (
        <div className={cn.itemList}>
          {posts.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={cn.itemCard}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className={cn.itemTitle}>{post.title}</h2>
                <span className={`${cn.mutedText} shrink-0`}>{post.date}</span>
              </div>
              {post.summary && (
                <p className={`${cn.itemBody} mb-4`}>{post.summary}</p>
              )}
              {post.tags.length > 0 && (
                <div className={cn.itemTags}>
                  {post.tags.map((t) => <TagMuted key={t}>{t}</TagMuted>)}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
