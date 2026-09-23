export function ComingSoon({
  title = "Coming Soon",
  message = "This section is currently under construction. Check back soon!",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-2xl bg-brand-lavender/20 border border-brand-lavender/50 flex items-center justify-center mb-5">
        <svg
          width={28}
          height={28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-purple"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">{title}</h2>
      <p className="text-base text-slate-500 max-w-sm leading-relaxed">{message}</p>
      <div className="mt-6 flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
