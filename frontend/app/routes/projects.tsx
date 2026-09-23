import type { Route } from "./+types/projects";
import { PageWrapper, SectionHeader, ProjectCard } from "../components/ui";
import { cn } from "../styles";
import { projects } from "../data";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Projects — Soleil Pham" }];
}

export default function Projects() {
  return (
    <PageWrapper>
      <SectionHeader label="Projects" title="Things I've Built" />
      <div className={cn.itemList}>
        {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
      </div>
    </PageWrapper>
  );
}
