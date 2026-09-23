import { cn } from "../styles";
import type { Project } from "../data";
import { SmallCodeLink, SmallPrimaryLink } from "./Buttons";
import { GitHubIcon, DevpostIcon, YouTubeIcon } from "./Icons";
import { TagMuted } from "./Tags";

export function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className={cn.itemCard} style={{ animationDelay: `${index * 40}ms` }}>
      <h3 className={cn.itemTitle}>{p.title}</h3>
      {p.desc && <p className={`${cn.itemBody} mb-4`}>{p.desc}</p>}
      <div className={cn.itemTags}>
        {p.tags.map((t) => <TagMuted key={t}>{t}</TagMuted>)}
      </div>
      <div className={cn.itemLinks}>
        {p.github && (
          <SmallCodeLink href={p.github} disabled={p.githubPrivate} disabledLabel="Repo is private">
            <GitHubIcon size={13} /> {p.githubPrivate ? "Repo is private" : "Code"}
          </SmallCodeLink>
        )}
        {p.githubBackend && (
          <SmallCodeLink href={p.githubBackend}>
            <GitHubIcon size={13} /> Backend
          </SmallCodeLink>
        )}
        {p.githubFrontend && (
          <SmallCodeLink href={p.githubFrontend}>
            <GitHubIcon size={13} /> Frontend
          </SmallCodeLink>
        )}
        {p.devpost && (
          <SmallCodeLink href={p.devpost}>
            <DevpostIcon size={13} /> Devpost
          </SmallCodeLink>
        )}
        {p.youtube && (
          <SmallCodeLink href={p.youtube}>
            <YouTubeIcon size={13} /> Video
          </SmallCodeLink>
        )}
        {p.live && <SmallPrimaryLink href={p.live}>Live ↗</SmallPrimaryLink>}
      </div>
    </article>
  );
}
