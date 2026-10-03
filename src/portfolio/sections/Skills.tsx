import { skills } from "../../data/portfolio";

export default function Skills() {
  return (
    <div className="space-y-5">
      {skills.map((g) => (
        <div key={g.category}>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-300">
            {g.category}
          </h3>
          <ul className="space-y-2">
            {g.items.map((s) => (
              <li key={s.name}>
                <div className="mb-1 flex justify-between text-sm text-stone-300">
                  <span>{s.name}</span>
                  <span>{s.level}%</span>
                </div>
                <div className="h-1.5 rounded bg-white/10">
                  <div
                    className="h-full rounded bg-amber-400"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
