/** Cabeçalho padrão de seção: H2 + fio dourado + lead opcional. */
export default function SectionHeading({
  title,
  lead,
  align = "center",
  className = "",
}: {
  title: string;
  lead?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`${isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"} ${className}`}
    >
      <h2 className="text-balance text-ink">{title}</h2>
      <div className={`gold-rule mt-5 ${isCenter ? "mx-auto" : ""}`} />
      {lead ? <p className="mt-5 text-body text-muted">{lead}</p> : null}
    </div>
  );
}
