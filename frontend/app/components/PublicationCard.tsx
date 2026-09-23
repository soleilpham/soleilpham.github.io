import { cn } from "../styles";
import type { Publication } from "../data";
import { SmallCodeLink } from "./Buttons";
import { CVIcon, GitHubIcon, YouTubeIcon } from "./Icons";

export function PublicationCard({ pub, index = 0 }: { pub: Publication; index?: number }) {
  return (
    <article className={cn.itemCard} style={{ animationDelay: `${index * 60}ms` }}>
      {pub.conference !== "TBA" && (
        <div className="mb-3">
          <span className={cn.tagLavender}>{pub.conference}</span>
        </div>
      )}
      <h3 className={cn.itemTitle}>{pub.title}</h3>
      <p className={cn.itemBody}>{pub.authors}</p>
      {(pub.paper || pub.video || pub.code) && (
        <div className={cn.itemLinks}>
          {pub.paper && <PubLink href={pub.paper} label="Paper" icon={<CVIcon size={13} />} />}
          {pub.video && <PubLink href={pub.video} label="Video" icon={<YouTubeIcon size={13} />} />}
          {pub.code && <PubLink href={pub.code} label="Code" icon={<GitHubIcon size={13} />} />}
        </div>
      )}
    </article>
  );
}

/** Footnote shown below any list that contains †-marked authors. */
export function EqualContributionNote({ pubs }: { pubs: Publication[] }) {
  if (!pubs.some((p) => p.authors.includes("†"))) return null;
  return <p className={`mt-6 ${cn.mutedText}`}>† These authors contributed equally to this work.</p>;
}

function PubLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const tba = href === "TBA";
  return (
    <SmallCodeLink href={href} disabled={tba} disabledLabel={`${label} not yet available`}>
      {icon} {label}
    </SmallCodeLink>
  );
}
