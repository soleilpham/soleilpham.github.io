import { cn } from "../styles";
import type { Project } from "../data";
import { DetailCard } from "./DetailCard";
import { SmallCodeLink, SmallPrimaryLink } from "./Buttons";
import { GitHubIcon, DevpostIcon, YouTubeIcon } from "./Icons";
import { TagMuted } from "./Tags";

export function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const tags = (
    <span className={cn.itemTags}>
      {p.tags.map((t) => <TagMuted key={t}>{t}</TagMuted>)}
    </span>
  );

  return (
    <DetailCard
      label={p.title}
      image={p.image}
      imageAlt={`Screenshot of ${p.title}`}
      style={{ animationDelay: `${index * 40}ms` }}
      summary={
        <>
          <span className={`block ${cn.itemTitle}`}>{p.title}</span>
          {p.date && <span className={`block -mt-1 mb-3 ${cn.mutedText}`}>{p.date}</span>}
          {tags}
        </>
      }
      details={
        <>
          <h2 className={cn.itemTitle}>{p.title}</h2>
          {p.date && <p className={`-mt-1 mb-3 ${cn.mutedText}`}>{p.date}</p>}
          <div className="mb-4">{tags}</div>
          {p.desc && <p className={cn.itemBody}>{p.desc}</p>}
          <ProjectLinks p={p} />
        </>
      }
    />
  );
}

function ProjectLinks({ p }: { p: Project }) {
  const any = p.github || p.githubBackend || p.githubFrontend || p.devpost || p.youtube || p.itch || p.live;
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
      {p.itch && <SmallPrimaryLink href={p.itch}>Play on itch.io ↗</SmallPrimaryLink>}
      {p.live && <SmallPrimaryLink href={p.live}>Live ↗</SmallPrimaryLink>}
    </div>
  );
}
