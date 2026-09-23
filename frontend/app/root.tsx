import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  // Favicon — must use BASE_URL prefix so it resolves under /source/ on GitHub Pages
  { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.ico`, type: "image/x-icon" },
  // DNS + TLS handshake for Google Fonts before the stylesheet is parsed
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Mobile browser chrome colour */}
        <meta name="theme-color" content="#FFFFFB" />
        {/* Caching: JS/CSS bundles have content-hash names → long-lived cache via CDN */}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-brand-cream px-6 pt-24 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">{message}</h1>
      <p className="mt-3 text-base text-slate-600">{details}</p>
      <a href={import.meta.env.BASE_URL} className="mt-6 inline-block text-brand-purple font-semibold hover:text-brand-coral">
        ← Back home
      </a>
      {stack && (
        <pre className="mt-6 w-full p-4 overflow-x-auto text-sm bg-white border border-brand-lavender/60 rounded-xl">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
