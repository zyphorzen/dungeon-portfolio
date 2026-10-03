import type { RoomId } from "../dungeon/config";

let active: RoomId | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function openRoom(id: RoomId) {
  active = id;
  if (document.pointerLockElement) document.exitPointerLock();
  emit();
}

export function closePortfolio() {
  active = null;
  emit();
}

export const getActiveRoom = () => active;
export const isPortfolioOpen = () => active !== null;

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}
