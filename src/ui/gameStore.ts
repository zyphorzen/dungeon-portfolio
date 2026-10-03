import { useSyncExternalStore } from "react";
import type { RoomId } from "../dungeon/config";
import { isPortfolioOpen } from "../portfolio/store";
import { startAudio } from "../audio/audio";

type State = {
  sceneReady: boolean;
  started: boolean;
  paused: boolean;
  zone: string;
  visited: RoomId[];
};

let state: State = {
  sceneReady: false,
  started: false,
  paused: false,
  zone: "Hub",
  visited: [],
};
const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export const getState = () => state;

export function useGame<T>(select: (s: State) => T): T {
  return useSyncExternalStore(subscribe, () => select(state));
}

export const markSceneReady = () => set({ sceneReady: true });
export const setPaused = (paused: boolean) => set({ paused });
export const resetQuest = () => set({ visited: [] });

export function setZone(zone: string) {
  if (zone !== state.zone) set({ zone });
}

export function visitRoom(id: RoomId) {
  if (!state.visited.includes(id)) set({ visited: [...state.visited, id] });
}

export function lockPointer() {
  const el = document.querySelector("canvas");
  try {
    const p = el?.requestPointerLock() as unknown as Promise<void> | undefined;
    p?.catch?.(() => {});
  } catch {}
}

export function startGame() {
  set({ started: true, paused: false });
  startAudio();
  lockPointer();
}

export const isInputBlocked = () =>
  !state.started || state.paused || isPortfolioOpen();
