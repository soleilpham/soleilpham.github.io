/**
 * Typed data layer — imports from app/portfolio/ and re-exports with types.
 * To update website content, edit the corresponding file in app/portfolio/.
 * To add blog posts, see app/blog/index.ts.
 */
import rawProfile     from "./portfolio/profile.json";
import rawHome        from "./portfolio/home.json";
import rawProjects    from "./portfolio/projects.json";
import rawPublication from "./portfolio/publication.json";

// ─── Types ─────────────────────────────────────────────────────────────────

export type ProfileLink = {
  label: string;
  sub: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "cv" | "leetcode" | "devpost";
};

export type Profile = {
  displayName: string;
  fullName: string;
  photo: string;
  titles: string[];
  university: string;
  location: string;
  links: ProfileLink[];
};

export type Stat = {
  value: string;
  label: string;
};

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  github?: string;
  githubPrivate?: boolean;
  githubBackend?: string;
  githubFrontend?: string;
  live?: string;
  devpost?: string;
  youtube?: string;
};

export type Publication = {
  title: string;
  authors: string;
  conference: string;
  /** URL, "TBA" (shown greyed out, unclickable), or omitted (hidden) */
  paper?: string;
  video?: string;
  code?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
};

// ─── Exports ───────────────────────────────────────────────────────────────

export const profile   = rawProfile   as Profile;
export const home      = rawHome      as { greeting: string; bio: string; stats: Stat[] };
export const projects  = rawProjects  as Project[];
const rawPub = rawPublication as { comingSoon: boolean; items: Publication[] };
export const publication = {
  ...rawPub,
  // Items titled "NAME" are placeholders — hidden until the title is final
  items: rawPub.items.filter((p) => p.title !== "NAME"),
};
