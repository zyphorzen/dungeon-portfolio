import { useGame } from "./gameStore";
import QuestIndicator from "./QuestIndicator";
import { isTouch } from "../utils/device";

export default function HUD() {
  const started = useGame((s) => s.started);
  const zone = useGame((s) => s.zone);
  if (!started) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      <div className="absolute left-4 top-4 rounded border border-amber-400/30 bg-black/60 px-3 py-1.5 text-sm tracking-widest text-amber-200 backdrop-blur-sm">
        ⚑ {zone.toUpperCase()}
      </div>
      <div className="absolute right-4 top-4">
        <QuestIndicator />
      </div>
      {!isTouch && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-amber-200/60">
          WASD gerak • Shift lari • Mouse kamera • E interaksi • M suara • ESC
          menu
        </p>
      )}
    </div>
  );
}
