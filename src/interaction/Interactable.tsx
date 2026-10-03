import { useEffect } from "react";
import type { ReactNode } from "react";
import { registerInteractable } from "./store";

type Props = {
  id: string;
  label: string;
  position: [number, number];
  radius?: number;
  onInteract: () => void;
  children?: ReactNode;
};

export default function Interactable({
  id,
  label,
  position,
  radius = 2.6,
  onInteract,
  children,
}: Props) {
  const [x, z] = position;

  useEffect(
    () => registerInteractable({ id, label, x, z, radius, onInteract }),
    [id, label, x, z, radius, onInteract],
  );

  return children ? <group position={[x, 0, z]}>{children}</group> : null;
}
