"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navItems = [
  { href: "/shop", label: "Shop" },
  { href: "/quote", label: "Bulk Pricing" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex min-w-fit items-center gap-3" href="/">
          <span className="material-symbols-outlined rounded bg-slate-900 p-2 text-white">hardware</span>
          <span className="text-lg font-extrabold tracking-normal text-slate-950">{siteConfig.businessName}</span>
        </Link>
        <form action="/search" className="hidden flex-1 items-center rounded border border-slate-200 bg-slate-50 px-3 md:flex">
          <span className="material-symbols-outlined text-slate-500">search</span>
          <input
            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
            name="q"
            placeholder="Search products, SKU, or material"
            type="search"
          />
        </form>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link className="hover:text-orange-700" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a className="hidden items-center gap-2 text-sm font-semibold text-slate-700 xl:flex" href={siteConfig.whatsappHref}>
          <span className="material-symbols-outlined text-[20px] text-green-700">chat</span>
          WhatsApp
        </a>
        <Link className="hidden rounded bg-orange-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-700 sm:inline-flex" href="/quote">
          Request Quote
        </Link>
        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="ml-auto rounded border border-slate-200 p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex items-center rounded border border-slate-200 bg-slate-50 px-3">
            <span className="material-symbols-outlined text-slate-500">search</span>
            <input className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" name="q" placeholder="Search catalog" type="search" />
          </form>
          <nav className="grid gap-2 text-sm font-semibold">
            {navItems.map((item) => (
              <Link className="rounded px-2 py-2 hover:bg-slate-50" href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="rounded bg-orange-600 px-3 py-2 text-white" href="/quote" onClick={() => setOpen(false)}>
              Request Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
