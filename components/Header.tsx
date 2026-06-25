"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSettings } from "./SettingsContext";
import { useQuoteCart } from "./QuoteCartContext";

const NAV_ITEMS = [
  { href: "/shop", label: "Products" },
  { href: "/#categories", label: "Categories" },
  { href: "/quote", label: "Bulk Pricing" },
  { href: "/#projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

function Logo() {
  const { settings } = useSettings();
  return (
    <Link className="flex items-center gap-2 group mr-2 lg:mr-4" href="/">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/5 p-1 transition-all duration-300 group-hover:bg-orange-600/10">
        <Image
          src="/hardware-logo.png"
          alt={`${settings.business_name} Logo`}
          width={32}
          height={32}
          className="rounded object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <span className="hidden xl:inline-block text-base font-black tracking-tight text-neutral-900 font-display">
        {settings.business_name}
      </span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden items-center gap-1.5 text-sm font-semibold text-neutral-600 lg:flex">
      {NAV_ITEMS.map((item) => (
        <Link
          className="relative rounded-full px-3 py-1.5 transition-all duration-300 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
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
      className="w-full flex items-center rounded-full border border-neutral-300 bg-neutral-50/50 px-3.5 py-1.5 transition-all duration-300 focus-within:border-orange-500/40 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-500/10"
    >
      <span className="material-symbols-outlined text-neutral-400 text-[20px] select-none">
        search
      </span>
      <input
        className="w-full bg-transparent px-2 text-xs text-neutral-900 outline-none placeholder-neutral-400 font-sans"
        name="q"
        placeholder="Search 10,000+ products, SKU..."
        type="search"
      />
    </form>
  );
}

function DesktopActions() {
  const { whatsappHref } = useSettings();
  const { items } = useQuoteCart();
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="hidden items-center gap-2 lg:flex min-w-fit justify-end">
      <Link
        href="/quote"
        className="relative group flex h-10 items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:shadow-md hover:translate-y-[-1px] active:translate-y-0"
      >
        <span className="material-symbols-outlined text-base">description</span>
        Get Quote
        {totalCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-black text-white ring-2 ring-white">
            {totalCount}
          </span>
        )}
      </Link>

      <a
        className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#25d366] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#20ba5a] hover:shadow-md hover:translate-y-[-1px] active:translate-y-0"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="font-sans font-bold">WhatsApp</span>
      </a>

      <Link
        href="/login"
        className="rounded-full border border-neutral-200/80 px-3.5 h-10 text-xs font-bold text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 transition-all duration-300 flex items-center justify-center gap-1.5"
      >
        <span className="material-symbols-outlined text-[16px]">person</span>
        Staff Login
      </Link>
    </div>
  );
}

function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      aria-expanded={open}
      aria-label="Toggle navigation"
      className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 lg:hidden"
      onClick={onToggle}
      type="button"
    >
      <span className="material-symbols-outlined text-xl select-none">
        {open ? "close" : "menu"}
      </span>
    </button>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { whatsappHref } = useSettings();
  const { items } = useQuoteCart();
  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="absolute left-4 right-4 top-20 z-50 rounded-3xl border border-neutral-200/80 bg-white/95 p-5 shadow-2xl backdrop-blur-xl space-y-4 lg:hidden animate-in fade-in slide-in-from-top-4 duration-350 ease-out">
      <form
        action="/search"
        className="flex items-center rounded-full border border-neutral-300 bg-neutral-50/50 px-4 py-2"
        onSubmit={onClose}
      >
        <span className="material-symbols-outlined text-neutral-400">search</span>
        <input
          className="w-full bg-transparent px-2.5 py-1 text-sm outline-none text-neutral-900 placeholder-neutral-400"
          name="q"
          placeholder="Search catalog..."
          type="search"
        />
      </form>

      <nav className="flex flex-col gap-1 text-sm font-bold text-neutral-700">
        {NAV_ITEMS.map((item) => (
          <Link
            className="rounded-xl px-4 py-3 transition-colors hover:bg-neutral-50 hover:text-orange-600"
            href={item.href}
            key={item.href}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}

        <div className="h-px bg-neutral-100 my-2" />

        <Link
          className="rounded-xl px-4 py-3 transition-colors hover:bg-neutral-50 flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
          href="/login"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          Staff Login
        </Link>

      </nav>
    </div>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCloseMobileMenu = () => setMobileMenuOpen(false);
  const handleToggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-4 z-[10001] w-full px-4 antialiased font-sans">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 lg:gap-6 rounded-full border border-neutral-200/60 bg-white/80 px-4 lg:px-6 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.015)] backdrop-blur-md">
        {/* Left: Brand + Desktop Nav */}
        <div className="flex items-center gap-4 lg:gap-6 min-w-fit">
          <Logo />
          <DesktopNav />
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md justify-center mx-auto">
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