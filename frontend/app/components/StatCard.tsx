export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center bg-brand-cream rounded-xl py-4 px-2 border border-brand-lavender/50">
      <p className="text-2xl font-extrabold text-brand-purple">{value}</p>
      <p className="text-sm text-slate-500 mt-1 leading-tight">{label}</p>
    </div>
  );
}
