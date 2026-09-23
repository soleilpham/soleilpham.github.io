/**
 * Barrel re-export — import any component from here or directly from its file.
 *
 * components/
 *   BulletList.tsx   — bulleted list with purple ▸ marker
 *   Buttons.tsx      — PrimaryButton, OutlineButton, SmallCodeLink, SmallPrimaryLink
 *   Card.tsx         — Card (optional hover variant)
 *   ComingSoon.tsx   — placeholder for in-progress sections
 *   Divider.tsx      — horizontal rule using brand-lavender
 *   Icons.tsx        — GitHubIcon, LinkedInIcon, EmailIcon, CVIcon, LeetCodeIcon,
 *                      LocationIcon, DownloadIcon, ExternalLinkIcon
 *   PageWrapper.tsx  — max-width content wrapper
 *   SectionHeader.tsx— label + title heading block
 *   StatCard.tsx     — numbered highlight card
 *   StatusBadge.tsx  — "Under Review" / "In Preparation" badge
 *   Tags.tsx         — Tag (amber), TagMuted (lavender), TagWhite (slate)
 */

export { BulletList }        from "./BulletList";
export {
  PrimaryButton,
  OutlineButton,
  SmallCodeLink,
  SmallPrimaryLink,
}                            from "./Buttons";
export { Card }              from "./Card";
export { ComingSoon }        from "./ComingSoon";
export { Divider }           from "./Divider";
export {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  CVIcon,
  LeetCodeIcon,
  DevpostIcon,
  YouTubeIcon,
  LocationIcon,
  DownloadIcon,
  ExternalLinkIcon,
}                            from "./Icons";
export { PageWrapper }       from "./PageWrapper";
export { ProjectCard }       from "./ProjectCard";
export { PublicationCard, EqualContributionNote } from "./PublicationCard";
export { SectionHeader }     from "./SectionHeader";
export { StatCard }          from "./StatCard";
export { StatusBadge }       from "./StatusBadge";
export { Tag, TagMuted, TagWhite } from "./Tags";
