import { isTouch } from "../utils/device";
import { useGame } from "./gameStore";
import Minimap from "./Minimap";
import QuestIndicator from "./QuestIndicator";

export default function HUD() {
  const started = useGame((s) => s.started);
  const zone = useGame((s) => s.zone);
  if (!started) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 select-none">
      <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
        <div className="rounded border border-amber-400/30 bg-black/60 px-3 py-1.5 text-sm tracking-widest text-amber-200 backdrop-blur-sm">
          ⚑ {zone.toUpperCase()}
        </div>
        <Minimap />
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
