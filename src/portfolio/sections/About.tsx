import { about } from "../../data/portfolio";

export default function About() {
  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-bold">{about.name}</h3>
      <p className="text-sm text-amber-300">
        {about.title} • {about.location}
      </p>
      {about.bio.map((p, i) => (
        <p key={i} className="leading-relaxed text-stone-300">
          {p}
        </p>
      ))}
    </div>
  );
}
