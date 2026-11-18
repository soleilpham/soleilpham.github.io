import { cn } from "../styles";
import { profile, type Publication } from "../data";
import { DetailCard } from "./DetailCard";
import { SmallCodeLink } from "./Buttons";
import { CVIcon, GitHubIcon, YouTubeIcon } from "./Icons";

export function PublicationCard({ pub, index = 0 }: { pub: Publication; index?: number }) {
  const venue = pub.conference !== "TBA" && (
    <span className="block mb-3">
      <span className={cn.tagLavender}>{pub.conference}</span>
    </span>
  );
  const authors = highlightName(pub.authors, profile.displayName);

  return (
    <DetailCard
      label={pub.title}
      style={{ animationDelay: `${index * 60}ms` }}
      summary={
        <>
          {venue}
          <span className={`block ${cn.itemTitle}`}>{pub.title}</span>
          <span className="block text-sm text-slate-600 leading-relaxed">{authors}</span>
        </>
      }
      details={
        <>
          {venue}
          <h2 className={cn.itemTitle}>{pub.title}</h2>
          <p className="text-sm font-bold text-brand-purple uppercase tracking-widest mt-4 mb-1">Authors</p>
          <p className={cn.itemBody}>{authors}</p>
          {(pub.paper || pub.video || pub.code) && (
            <div className={cn.itemLinks}>
              {pub.paper && <PubLink href={pub.paper} label="Paper" icon={<CVIcon size={13} />} />}
              {pub.video && <PubLink href={pub.video} label="Video" icon={<YouTubeIcon size={13} />} />}
              {pub.code && <PubLink href={pub.code} label="Code" icon={<GitHubIcon size={13} />} />}
            </div>
          )}
        </>
      }
    />
  );
}

/** Footnote shown below any list that contains †-marked authors. */
export function EqualContributionNote({ pubs }: { pubs: Publication[] }) {
  if (!pubs.some((p) => p.authors.includes("†"))) return null;
  return <p className={`mt-6 ${cn.mutedText}`}>† These authors contributed equally to this work.</p>;
}

/** Bolds every occurrence of `name` within an author list. */
function highlightName(authors: string, name: string) {
  return authors.split(name).flatMap((part, i) =>
    i === 0 ? [part] : [<strong key={i} className="font-bold text-slate-900">{name}</strong>, part],
  );
}

function PubLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const tba = href === "TBA";
  return (
    <SmallCodeLink href={href} disabled={tba} disabledLabel={`${label} not yet available`}>
      {icon} {label}
    </SmallCodeLink>
  );
}
