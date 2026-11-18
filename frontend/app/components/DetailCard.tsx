import { useEffect, useRef, useState } from "react";
import { publicUrl } from "../utils";

/**
 * Compact card that opens a detail popup when clicked or tapped.
 *
 * - The whole card is one <button>, so it works with mouse, touch, and keyboard alike.
 * - The popup is a native <dialog> (showModal): Esc closes it, focus is trapped inside it
 *   and returned to the card afterwards. Clicking the dimmed backdrop also closes it.
 * - `image` (a file in /public) is shown as a thumbnail on the card and as a banner in the popup.
 */
export function DetailCard({
  label,
  image,
  imageAlt,
  summary,
  details,
  style,
}: {
  /** Used for the accessible names of the card and dialog, e.g. the project title. */
  label: string;
  image?: string;
  imageAlt?: string;
  /** Content shown on the card itself. */
  summary: React.ReactNode;
  /** Content shown in the popup below the image. */
  details: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const src = image ? publicUrl(image) : undefined;

  return (
    <>
      <button
        type="button"
        className="detail-card animate-fade-up"
        style={style}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${label}: show details`}
      >
        {src && (
          <img src={src} alt="" loading="lazy" decoding="async" className="detail-card-thumb" />
        )}
        <span className="detail-card-body brand-gradient">
          {summary}
          <span className="detail-card-hint" aria-hidden="true">
            View details <span className="detail-card-arrow">→</span>
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="detail-dialog"
        aria-label={label}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // A click on the ::backdrop lands on the <dialog> element itself.
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <div className="detail-dialog-panel">
            <button
              type="button"
              className="detail-dialog-close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            {src && <img src={src} alt={imageAlt ?? label} className="detail-dialog-image" />}
            <div className="detail-dialog-body">{details}</div>
          </div>
        )}
      </dialog>
    </>
  );
}
