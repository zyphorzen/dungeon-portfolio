import { projects } from "../../data/portfolio";

export default function Projects() {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <article
          key={p.title}
          className="rounded border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="mt-1 text-sm text-stone-300">{p.description}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded bg-amber-300/10 px-2 py-0.5 text-xs text-amber-200"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            {p.demo && (
              <a
                className="text-sky-300 hover:underline"
                href={p.demo}
                target="_blank"
                rel="noreferrer"
              >
                Demo
              </a>
            )}
            {"repo" in p && p.repo && (
              <a
                className="text-sky-300 hover:underline"
                href={p.repo}
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
