import { contact } from "../../data/portfolio";

export default function Contact() {
  return (
    <div className="space-y-4">
      <p className="text-stone-300">
        Email:{" "}
        <a
          className="text-sky-300 hover:underline"
          href={`mailto:${contact.email}`}
        >
          {contact.email}
        </a>
      </p>
      <ul className="flex flex-wrap gap-3">
        {contact.links.map((l) => (
          <li key={l.label}>
            <a
              className="rounded border border-amber-400/40 px-3 py-1.5 text-sm text-amber-200 hover:bg-amber-300/10"
              href={l.url}
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
