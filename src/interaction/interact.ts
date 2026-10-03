import { playInteract } from "../audio/audio";
import { isInputBlocked } from "../ui/gameStore";
import { getPromptLabel, triggerCurrent } from "./store";

export function tryInteract() {
  if (isInputBlocked() || !getPromptLabel()) return;
  triggerCurrent();
  playInteract();
}
