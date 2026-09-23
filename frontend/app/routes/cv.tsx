import type { Route } from "./+types/cv";
import { PageWrapper, SectionHeader } from "../components/ui";
import { cn } from "../styles";
import resumeUrl from "../assets/resume.pdf?url";

export function meta({}: Route.MetaArgs) {
  return [{ title: "CV — Soleil Pham" }];
}

export default function CV() {
  return (
    <PageWrapper>
      <SectionHeader label="CV" title="Curriculum Vitae" />

      {/* Inline PDF viewer */}
      <div className={`${cn.card} overflow-hidden`}>
        <iframe
          src={resumeUrl}
          title="Resume — Soleil Pham"
          loading="lazy"
          className="w-full"
          style={{ height: "82vh", minHeight: 600 }}
        />
        {/* Fallback for browsers that block inline PDFs */}
        <div className={`${cn.divider} px-5 py-3 flex flex-wrap items-center justify-between gap-2`}>
          <p className={cn.mutedText}>
            PDF not rendering?{" "}
            <a href={resumeUrl} download className={cn.textLink}>
              Download it directly
            </a>
          </p>
          <a href={resumeUrl} target="_blank" rel="noreferrer" className={`text-sm ${cn.textLink}`}>
            Open in new tab ↗
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
