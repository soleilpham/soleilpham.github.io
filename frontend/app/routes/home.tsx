import type { Route } from "./+types/home";
import { Link } from "react-router";
import {
  PageWrapper,
  ProjectCard,
  PublicationCard,
} from "../components/ui";
import { cn } from "../styles";
import { home, projects, publication } from "../data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Soleil Pham" },
    { name: "description", content: home.bio },
  ];
}

export default function Home() {
  const pubs = publication.comingSoon ? [] : publication.items;

  return (
    <PageWrapper>
      {/* Intro */}
      <section className="mb-12">
        <p className={cn.sectionLabel}>Welcome</p>
        <h1 className={cn.sectionTitle}>
          {home.greeting}
        </h1>
        <div className="flex items-center gap-1 mt-3">
          <div className="h-0.5 w-8 rounded-full bg-brand-amber" />
          <div className="h-0.5 w-3 rounded-full bg-brand-coral" />
        </div>
        <p className={`mt-5 ${cn.bodyText} max-w-2xl`}>{home.bio}</p>
      </section>

      {pubs.length > 0 && (
        <HomeSection label="Publications" to="/publication">
          {pubs.map((pub, i) => <PublicationCard key={pub.title} pub={pub} index={i} />)}
        </HomeSection>
      )}

      <HomeSection label="Featured Projects" to="/projects">
        {projects.slice(0, 3).map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </HomeSection>
    </PageWrapper>
  );
}

function HomeSection({ label, to, children }: { label: string; to: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className={cn.sectionLabel}>{label}</h2>
        <Link to={to} className={`${cn.accentLink} text-sm font-semibold`}>
          View all →
        </Link>
      </div>
      <div className={cn.itemList}>{children}</div>
    </section>
  );
}
