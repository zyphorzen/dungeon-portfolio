import { experience } from "../../data/portfolio";

export default function Experience() {
  return (
    <ol className="space-y-5 border-l border-amber-400/30 pl-4">
      {experience.map((e) => (
        <li key={e.role + e.company}>
          <h3 className="font-semibold">
            {e.role} <span className="text-amber-300">@ {e.company}</span>
          </h3>
          <p className="text-xs text-stone-400">{e.period}</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-stone-300">
            {e.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
