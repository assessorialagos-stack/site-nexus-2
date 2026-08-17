/** Header simples — logo oficial centralizada no topo. */
export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="shell flex items-center justify-center py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-12 rounded-full object-cover"
          width={48}
          height={48}
        />
      </div>
    </header>
  );
}
