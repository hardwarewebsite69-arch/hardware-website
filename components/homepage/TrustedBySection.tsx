const trustedCompanies = [
  "Bamburi Cement", "Safari Hotels", "County Schools", "Lamu Contractors",
  "Coastal Factories", "Ministry of Works", "Aga Khan Hospital", "Kenya Ports",
];

export function TrustedBySection() {
  return (
    <section className="w-full overflow-hidden border-y border-[#e5e7eb] bg-[#f9fafb] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-[#9ca3af]">
          Trusted by contractors, hotels, schools &amp; hospitals across Kenya
        </p>
        <div className="relative overflow-hidden">
          <div className="trust-scroll flex w-max items-center gap-10">
            {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-base font-bold tracking-tight text-[#9ca3af]/70 transition-colors hover:text-[#111827]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
