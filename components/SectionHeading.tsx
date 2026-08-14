/** Cabeçalho padrão de seção (tema claro): eyebrow + H2 + fio + lead. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className={`text-h2 text-ink text-balance ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
      <div className={`rule mt-5 ${isCenter ? "mx-auto" : ""}`} />
      {lead ? <p className="mt-5 text-body text-muted">{lead}</p> : null}
    </div>
  );
}
