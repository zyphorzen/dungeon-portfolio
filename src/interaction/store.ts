export type InteractableData = {
  id: string;
  label: string;
  x: number;
  z: number;
  radius: number;
  onInteract: () => void;
};

const items = new Map<string, InteractableData>();
const listeners = new Set<() => void>();
let currentId: string | null = null;

const emit = () => listeners.forEach((l) => l());

export function registerInteractable(item: InteractableData) {
  items.set(item.id, item);
  return () => {
    items.delete(item.id);
    if (currentId === item.id) setCurrent(null);
  };
}

export function getInteractables() {
  return items.values();
}

export function setCurrent(id: string | null) {
  if (id === currentId) return;
  currentId = id;
  emit();
}

export function triggerCurrent() {
  if (currentId) items.get(currentId)?.onInteract();
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function getPromptLabel(): string | null {
  return currentId ? (items.get(currentId)?.label ?? null) : null;
}
