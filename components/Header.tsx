"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSettings } from "./SettingsContext";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { href: "/shop", label: "Shop" },
  { href: "/quote", label: "Bulk Pricing" },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Logo() {
  const { settings } = useSettings();
  return (
<Link className="flex items-center gap-0 md:mr-6 group" href="/">
          <Image
            src="/hardware-logo.png"
            alt={`${settings.business_name} Logo`}
            width={50}
            height={46}
            className="rounded transition-transform group-hover:scale-105"
          />
          {/* <span className="text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap">
            {settings.business_name}
          </span> */}
        </Link>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-6 text-sm font-semibold text-neutral-600 lg:flex">
      {NAV_ITEMS.map((item) => (
        <Link
          className="relative py-1 transition-colors hover:text-[#eb5a0c] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#eb5a0c] after:transition-all hover:after:w-full"
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function SearchForm() {
  return (
    <form
      action="/search"
      className="w-full flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3 transition-all focus-within:border-neutral-400 focus-within:bg-white focus-within:ring-1 focus-within:ring-neutral-400"
    >
      <span className="material-symbols-outlined text-neutral-400 text-[22px]">
        search
      </span>
      <input
        className="w-full bg-transparent px-2.5 py-2 text-sm text-neutral-900 outline-none placeholder-neutral-400"
        name="q"
        placeholder="Search products, SKU, or material..."
        type="search"
      />
    </form>
  );
}

function DesktopActions() {
  const { whatsappHref } = useSettings();
  return (
    <div className="hidden items-center gap-4 lg:flex min-w-fit justify-end">
  

      <Link
        className="rounded bg-[#eb5a0c] px-4 py-2 text-sm font-bold tracking-wide text-white uppercase transition hover:bg-[#d44f0a]"
        href={whatsappHref}      
        >
        WhatsApp
      </Link>

      <Link
        href="/login"
        className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-bold uppercase tracking-wide text-neutral-700 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">person</span>
        Sign in
      </Link>
    </div>
  );
}

function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      aria-expanded={open}
      aria-label="Toggle navigation"
      className="ml-auto rounded-md border border-neutral-200 p-2 text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 lg:hidden"
      onClick={onToggle}
      type="button"
    >
      <span className="material-symbols-outlined flex items-center justify-center">
        {open ? "close" : "menu"}
      </span>
    </button>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="border-t border-neutral-200 bg-white px-4 py-5 shadow-inner space-y-4 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <form
        action="/search"
        className="flex items-center rounded-md border border-neutral-300 bg-neutral-50 px-3 focus-within:border-neutral-400 focus-within:bg-white"
      >
        <span className="material-symbols-outlined text-neutral-400">search</span>
        <input
          className="w-full bg-transparent px-2.5 py-2.5 text-sm outline-none text-neutral-900 placeholder-neutral-400"
          name="q"
          placeholder="Search catalog"
          type="search"
        />
      </form>

      <nav className="flex flex-col gap-1 text-sm font-bold text-neutral-700">
        {NAV_ITEMS.map((item) => (
          <Link
            className="rounded-md px-3 py-2.5 transition-colors hover:bg-neutral-50 hover:text-[#eb5a0c]"
            href={item.href}
            key={item.href}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}

        <div className="h-px bg-neutral-100 my-2" />

        <Link
          className="rounded-md px-3 py-2.5 transition-colors hover:bg-neutral-50 flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          href="/login"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-[20px]">login</span>
          Login
        </Link>

        <Link
          className="mt-2 rounded bg-[#eb5a0c] p-3 text-center text-sm font-bold tracking-wide text-white uppercase shadow-sm transition hover:bg-[#d44f0a]"
          href="/quote"
          onClick={onClose}
        >
          Request Quote
        </Link>
      </nav>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Header Component
// ---------------------------------------------------------------------------

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCloseMobileMenu = () => setMobileMenuOpen(false);
  const handleToggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/95 backdrop-blur-md antialiased font-sans">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand + Desktop Nav */}
        <div className="flex items-center gap-6 min-w-fit">
          <Logo />
          <DesktopNav />
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md justify-center mx-auto">
          <SearchForm />
        </div>

        {/* Right: Actions */}
        <DesktopActions />

        {/* Mobile Toggle */}
        <MobileMenuButton open={mobileMenuOpen} onToggle={handleToggleMobileMenu} />
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && <MobileMenu onClose={handleCloseMobileMenu} />}
    </header>
  );
}