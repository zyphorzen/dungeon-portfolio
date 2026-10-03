import type { ReactNode } from "react";

type Props = {
  open: boolean;
  title: string;
  accent?: string;
  onClose?: () => void;
  children: ReactNode;
};

export default function Modal({
  open,
  title,
  accent = "#d9a441",
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg border bg-stone-950/95 p-6 text-stone-100 shadow-2xl"
        style={{ borderColor: accent }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            className="text-xl font-bold tracking-wide"
            style={{ color: accent }}
          >
            {title}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded border border-white/20 px-2 py-0.5 text-xs text-stone-300 hover:bg-white/10"
            >
              ESC • Tutup
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
