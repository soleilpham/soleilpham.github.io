import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { cn } from "../styles";
import { publicUrl } from "../utils";
import { profile } from "../data";
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  CVIcon,
  LeetCodeIcon,
  DevpostIcon,
  LocationIcon,
} from "../components/ui";

const NAV_LINKS = [
  { to: "/",            label: "Home"         },
  { to: "/projects",    label: "Projects"     },
  { to: "/publication", label: "Publications" },
  { to: "/cv",          label: "CV"          },
  // { to: "/blog",        label: "Blog"        },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  github:   <GitHubIcon size={17} />,
  linkedin: <LinkedInIcon size={17} />,
  email:    <EmailIcon size={17} />,
  cv:       <CVIcon size={17} />,
  leetcode: <LeetCodeIcon size={17} />,
  devpost:  <DevpostIcon size={17} />,
};

const MAP_URL = "https://maps.app.goo.gl/qgyWv4zwnnWzVePK9";

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";

  // Close menu whenever the route changes
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`min-h-screen ${cn.pageBg}`}>

      {/* ADA: skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Backdrop — closes the menu when the user taps outside, mobile only */}
      {menuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-lavender/50">
        <nav
          aria-label="Primary navigation"
          className={`${cn.container} h-14 flex items-center justify-between gap-4`}
        >
          {/* Brand — always visible */}
          <NavLink
            to="/"
            aria-label="Soleil Pham — home"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? cn.navLinkActive + " text-xl font-bold"
                : cn.navLink + " text-xl font-bold text-slate-900"
            }
          >
            Soleil Pham
          </NavLink>

          {/* Desktop nav links — hidden on mobile */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  isActive ? cn.navLinkActive : cn.navLink
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Hamburger — visible only on mobile */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-brand-lavender/20 transition-colors gap-1.5 shrink-0"
          >
            {/* Three bars that animate into an X */}
            <span
              className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all duration-200 origin-center ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all duration-200 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-slate-700 rounded-full transition-all duration-200 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-brand-lavender/40 bg-brand-cream/95 backdrop-blur-md animate-fade-in"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-6 py-3 text-base font-medium border-b border-brand-lavender/20 transition-colors ${
                    isActive
                      ? "text-brand-purple bg-brand-lavender/10"
                      : "text-slate-700 hover:text-brand-purple hover:bg-brand-lavender/10"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* ── Body ── */}
      {/*
        pt-20 = 80px offset from the fixed 56px navbar.
        The sidebar scrolls with the page (no independent scroller).
      */}
      <div className={`${cn.container} pt-20 pb-10 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start`}>

        {/* ── Left sidebar ── */}
        {/* Sidebar: always visible on desktop; on mobile only shown on the home page */}
        <aside
          aria-label="Profile"
          className={`w-full lg:w-72 shrink-0 ${
            isHome ? "block" : "hidden lg:block"
          }`}
        >
          <div className="animate-slide-left">
            <ProfileCard />
          </div>
        </aside>

        {/* ── Main content — fades in on route change ── */}
        <main
          id="main-content"
          key={location.pathname}
          tabIndex={-1}
          className="flex-1 min-w-0 animate-fade-up outline-none"
        >
          <Outlet />
          <footer className={cn.footer}>
            © {new Date().getFullYear()} {profile.fullName}
          </footer>
        </main>
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="bg-white border border-brand-lavender/60 rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className={cn.profileCardHeader}>
        {/* fetchpriority=high: this image is always above the fold */}
        <img
          src={publicUrl(profile.photo)}
          alt={`${profile.displayName} profile photo`}
          width={180}
          height={180}
          fetchPriority="high"
          className="w-40 h-40 rounded-full border-4 border-white shadow-md object-cover"
        />
        <h2 className="mt-3 font-bold text-slate-900 text-xl leading-tight">
          {profile.displayName}
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {profile.fullName}
        </p>
        <div className="mt-3 flex flex-col items-center gap-1.5" aria-label="Roles">
          {profile.titles.map((t, i) => (
            <p key={t} className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  i === 0 ? "bg-brand-amber" : "bg-brand-coral"
                }`}
              />
              {t}
            </p>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="px-4 py-3 border-t border-brand-lavender/30">
        <a
          href={MAP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={`${profile.university}, ${profile.location} — open in Google Maps`}
          className="flex items-center gap-2 group"
        >
          <span aria-hidden="true" className="text-brand-lavender group-hover:text-brand-purple transition-colors shrink-0">
            <LocationIcon size={14} />
          </span>
          <div>
            <p className="font-semibold text-slate-800 text-sm leading-tight group-hover:text-brand-purple transition-colors">
              {profile.university}
            </p>
            <p className="text-sm text-slate-500">{profile.location}</p>
          </div>
        </a>
      </div>

      {/* Links */}
      <nav aria-label="Social and contact links">
        <div className="px-2 pb-3 border-t border-brand-lavender/30 pt-2 space-y-0.5">
          {profile.links.map(({ label, sub, href, icon }) => {
            const body = (
              <>
                <span aria-hidden="true" className={cn.profileLinkIcon}>
                  {ICON_MAP[icon]}
                </span>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 shrink-0">
                  {label}
                </span>
                <span className="ml-auto min-w-0 text-sm text-slate-500 truncate">{sub}</span>
              </>
            );
            // Internal routes go through <Link> so the /source/ basename is applied
            return href.startsWith("/") ? (
              <Link key={label} to={href} aria-label={`${label}: ${sub}`} className={cn.profileLink}>
                {body}
              </Link>
            ) : (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`${label}: ${sub}`}
                className={cn.profileLink}
              >
                {body}
              </a>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
