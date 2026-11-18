import { useRef, useState } from "react";

/**
 * Two-sided card that flips on the Y axis.
 *
 * - Mouse/trackpad devices: hovering flips the card (pure CSS, see .flip-card in app.css).
 * - Touch devices: tapping anywhere on the card toggles it. Taps on links/buttons inside
 *   the card are ignored so they still work normally.
 * - Keyboard / screen readers: each face has a real <button> ("Details" / "Back"), and
 *   tabbing into a link on the back turns the card around (CSS :has(:focus-within)).
 *
 * Both faces share one CSS grid cell, so the card is as tall as its taller face and
 * never needs a fixed height.
 */
export function FlipCard({
  front,
  back,
  label,
  className = "",
  style,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  /** Short name used in the accessible button labels, e.g. the project title. */
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [flipped, setFlipped] = useState(false);
  const detailsBtn = useRef<HTMLButtonElement>(null);
  const backBtn = useRef<HTMLButtonElement>(null);

  // Move focus with the flip so keyboard users never end up on a hidden face.
  function show() {
    setFlipped(true);
    requestAnimationFrame(() => backBtn.current?.focus({ preventScroll: true }));
  }
  function hide() {
    setFlipped(false);
    requestAnimationFrame(() => detailsBtn.current?.focus({ preventScroll: true }));
  }

  function onCardClick(e: React.MouseEvent) {
    // Hover already flips on precise pointers; only toggle on touch/coarse pointers.
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (flipped) hide();
    else setFlipped(true);
  }

  return (
    <article
      className={`flip-card animate-fade-up ${flipped ? "is-flipped" : ""} ${className}`}
      style={style}
      onClick={onCardClick}
    >
      <div className="flip-card-inner">
        <div className="flip-face flip-front" inert={flipped || undefined}>
          {front}
          <FlipButton ref={detailsBtn} onClick={show} ariaLabel={`Show details for ${label}`}>
            <span className="flip-hint-hover">Hover for details</span>
            <span className="flip-hint-touch">Tap for details</span>
            <span aria-hidden="true">↻</span>
          </FlipButton>
        </div>
        <div className="flip-face flip-back">
          {back}
          <FlipButton ref={backBtn} onClick={hide} ariaLabel={`Hide details for ${label}`}>
            <span aria-hidden="true">↺</span> Back
          </FlipButton>
        </div>
      </div>
    </article>
  );
}

function FlipButton({
  ref,
  onClick,
  ariaLabel,
  children,
}: {
  ref: React.Ref<HTMLButtonElement>;
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flip-button mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple hover:text-brand-coral transition-colors"
    >
      {children}
    </button>
  );
}
