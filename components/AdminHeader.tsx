export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-normal text-slate-950">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex min-w-0 flex-1 items-center rounded border border-slate-200 bg-slate-50 px-3 md:w-80">
            <span className="material-symbols-outlined text-slate-500">search</span>
            <input className="w-full bg-transparent px-3 py-2 text-sm outline-none" placeholder="Search admin" />
          </label>
          <button className="rounded border border-slate-200 p-2 text-slate-600" type="button" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="rounded border border-slate-200 p-2 text-slate-600" type="button" aria-label="Profile">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
    </header>
  );
}
