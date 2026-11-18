import { cn } from "../styles";
import type { Project } from "../data";
import { FlipCard } from "./FlipCard";
import { SmallCodeLink, SmallPrimaryLink } from "./Buttons";
import { GitHubIcon, DevpostIcon, YouTubeIcon } from "./Icons";
import { TagMuted } from "./Tags";

/** Tags shown on the front; the rest are counted as "+N". */
const FRONT_TAGS = 4;

export function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const frontTags = p.tags.slice(0, FRONT_TAGS);
  const moreTags = p.tags.length - frontTags.length;

  return (
    <FlipCard
      label={p.title}
      style={{ animationDelay: `${index * 40}ms` }}
      front={
        <>
          <h3 className={cn.itemTitle}>{p.title}</h3>
          <div className={cn.itemTags}>
            {frontTags.map((t) => <TagMuted key={t}>{t}</TagMuted>)}
            {moreTags > 0 && <span className={cn.tagWhite}>+{moreTags}</span>}
          </div>
        </>
      }
      back={
        <>
          <h3 className="font-bold text-slate-900 text-base leading-snug mb-2">{p.title}</h3>
          {p.desc && <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>}
          <ProjectLinks p={p} />
        </>
      }
    />
  );
}

function ProjectLinks({ p }: { p: Project }) {
  const any = p.github || p.githubBackend || p.githubFrontend || p.devpost || p.youtube || p.live;
  if (!any) return null;
  return (
    <div className={cn.itemLinks}>
      {p.github && (
        <SmallCodeLink href={p.github} disabled={p.githubPrivate} disabledLabel="Repo is private">
          <GitHubIcon size={13} /> {p.githubPrivate ? "Repo is private" : "Code"}
        </SmallCodeLink>
      )}
      {p.githubFrontend && (
        <SmallCodeLink href={p.githubFrontend}>
          <GitHubIcon size={13} /> Frontend
        </SmallCodeLink>
      )}
      {p.githubBackend && (
        <SmallCodeLink href={p.githubBackend}>
          <GitHubIcon size={13} /> Backend
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
  );
}
