import { useSyncExternalStore } from "react";
import { getPromptLabel, subscribe } from "../interaction/store";
import { tryInteract } from "../interaction/interact";
import { input } from "../player/input";
import { isTouch } from "../utils/device";
import { setPaused, useGame } from "./gameStore";
import Joystick from "./Joystick";

const btn =
  "pointer-events-auto touch-none rounded-full border border-amber-400/50 bg-black/50 text-amber-200 backdrop-blur-sm";

export default function TouchControls() {
  const started = useGame((s) => s.started);
  const label = useSyncExternalStore(subscribe, getPromptLabel);
  if (!isTouch || !started) return null;

  const sprintOff = () => {
    input.sprint = false;
  };

  return (
    <div className="absolute inset-0 z-20 select-none">
      <button
        className={`${btn} absolute left-1/2 top-4 h-10 w-10 -translate-x-1/2`}
        onClick={() => setPaused(true)}
      >
        II
      </button>
      <Joystick />
      <div className="absolute bottom-8 right-8 flex items-end gap-4">
        <button
          className={`${btn} h-16 w-16 text-xs`}
          onPointerDown={() => {
            input.sprint = true;
          }}
          onPointerUp={sprintOff}
          onPointerCancel={sprintOff}
          onPointerLeave={sprintOff}
        >
          LARI
        </button>
        <button
          className={`${btn} h-20 w-20 text-xl font-bold ${label ? "bg-amber-400/30" : "opacity-40"}`}
          disabled={!label}
          onClick={tryInteract}
        >
          E
        </button>
      </div>
    </div>
  );
}
