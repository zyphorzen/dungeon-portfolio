import { useSyncExternalStore } from "react";
import { getPromptLabel, subscribe } from "./store";

export default function InteractionPrompt() {
  const label = useSyncExternalStore(subscribe, getPromptLabel);
  if (!label) return null;

  return (
    <div className="pointer-events-none absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded border border-amber-400/40 bg-black/70 px-4 py-2 text-amber-100 shadow-lg backdrop-blur-sm">
      <kbd className="rounded border border-amber-300/60 bg-amber-300/10 px-2 py-0.5 font-mono text-sm font-bold text-amber-300">
        E
      </kbd>
      <span className="text-sm tracking-wide">{label}</span>
    </div>
  );
}
