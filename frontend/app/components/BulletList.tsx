export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2.5 text-base text-slate-600 leading-relaxed">
          <span className="text-brand-purple mt-0.5 shrink-0 select-none">▸</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}
