const trustedCompanies = [
  "Bamburi Cement", "Safari Hotels", "County Schools", "Lamu Contractors",
  "Coastal Factories", "Ministry of Works", "Aga Khan Hospital", "Kenya Ports",
];

export function TrustedBySection() {
  return (
    <section className="w-full overflow-hidden border-y border-neutral-200/60 bg-neutral-50/40 py-8 font-sans">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          
          {/* Section Subtext / Certification Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex h-7 items-center justify-center rounded bg-neutral-900 px-2 text-[10px] font-black tracking-wider text-white uppercase font-mono">
              KEBS Approved
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-450">
              Contractor Validation Strip
            </p>
          </div>

          {/* Marquee Loop */}
          <div className="relative overflow-hidden flex-1 md:max-w-3xl">
            <div className="trust-scroll flex w-max items-center gap-12">
              {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="whitespace-nowrap text-xs font-black uppercase tracking-widest text-neutral-400 transition-colors duration-300 hover:text-neutral-900 select-none cursor-default font-display"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
