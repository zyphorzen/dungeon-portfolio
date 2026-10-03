import { ROOMS } from "../dungeon/config";
import { useGame } from "./gameStore";

export default function QuestIndicator() {
  const visited = useGame((s) => s.visited);
  const next = ROOMS.find((r) => !visited.includes(r.id));

  return (
    <div className="w-44 rounded border border-amber-400/30 bg-black/60 p-3 text-xs text-stone-200 backdrop-blur-sm sm:w-56 sm:text-sm">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
        Quest • {visited.length}/{ROOMS.length}
      </p>
      <p className="mb-2 text-xs text-stone-400">
        {next
          ? `Periksa altar: ${next.label}`
          : "Dungeon tuntas! Terima kasih sudah berkunjung."}
      </p>
      <ul className="space-y-0.5">
        {ROOMS.map((r) => {
          const done = visited.includes(r.id);
          return (
            <li
              key={r.id}
              className={done ? "text-stone-500 line-through" : ""}
            >
              <span style={{ color: r.accent }}>{done ? "✔" : "◇"}</span>{" "}
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
