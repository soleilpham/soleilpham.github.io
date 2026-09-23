import type { Route } from "./+types/publication";
import {
  PageWrapper,
  SectionHeader,
  ComingSoon,
  PublicationCard,
  EqualContributionNote,
} from "../components/ui";
import { cn } from "../styles";
import { publication } from "../data";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Publications — Soleil Pham" }];
}

export default function Publication() {
  return (
    <PageWrapper>
      <SectionHeader label="Publications" title="Research & Publications" />

      {publication.comingSoon ? (
        <ComingSoon
          title="Papers Coming Soon"
          message="Research is in active development across three labs at Purdue. Publications will appear here once ready."
        />
      ) : (
        <>
          <div className={cn.itemList}>
            {publication.items.map((pub, i) => (
              <PublicationCard key={pub.title} pub={pub} index={i} />
            ))}
          </div>
          <EqualContributionNote pubs={publication.items} />
        </>
      )}
    </PageWrapper>
  );
}
