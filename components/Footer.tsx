"use client";

import Link from "next/link";
import { useSettings } from "./SettingsContext";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  Lock,
  FileText
} from "lucide-react";

export function Footer() {
  const { settings, whatsappHref } = useSettings();

  return (
    <footer className="mt-12 md:mt-24 border-t border-neutral-900 bg-[#0A0A0A] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* MAIN NAVIGATION GRID */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:grid-cols-12">
        
        {/* Col 1: Brand (Spans 4) */}
        <div className="flex flex-col justify-between md:col-span-4">
          <div>
            <Link className="text-2xl font-black tracking-tight text-white font-display" href="/">
              {settings.business_name}
            </Link>
            <p className="mt-3 max-w-sm text-xs font-normal leading-relaxed text-neutral-400">
              Kenya's direct-from-manufacturer distributor of structural steel, electrical supplies, PPE, and heavy hardware. Sourced for guaranteed KEBS compliance.
            </p>
          </div>

          <div className="pt-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900/80 border border-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Dispatch Desk
            </span>
          </div>
        </div>

        {/* Col 2: Company (Spans 2) */}
        <div className="md:col-span-2">
          <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-orange-500">Company</h4>
          <ul className="flex flex-col gap-3 text-xs font-medium text-neutral-300">
            <li><Link className="transition-colors hover:text-orange-400" href="/#categories">About Us</Link></li>
            <li><Link className="transition-colors hover:text-orange-400" href="/#projects">Featured Projects</Link></li>
            <li><Link className="transition-colors hover:text-orange-400" href="/quote">Bulk / B2B Pricing</Link></li>
            <li className="pt-1">
              <Link className="group inline-flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors" href="/login">
                <span>Staff Portal</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Hardware (Spans 2) */}
        <div className="md:col-span-2">
          <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-orange-500">Hardware</h4>
          <ul className="flex flex-col gap-3 text-xs font-medium text-neutral-300">
            <li><Link className="transition-colors hover:text-orange-400" href="/shop/electrical">Electrical & Cables</Link></li>
            <li><Link className="transition-colors hover:text-orange-400" href="/shop/building-materials">Structural Steel</Link></li>
            <li><Link className="transition-colors hover:text-orange-400" href="/shop/plumbing">Pipes & Plumbing</Link></li>
            <li><Link className="transition-colors hover:text-orange-400" href="/shop/power-tools">Power Tools & Plant</Link></li>
            <li><Link className="transition-colors hover:text-orange-400" href="/shop/paints">Paints & Coatings</Link></li>
          </ul>
        </div>

        {/* Col 4: De-escalated Contact Desk (Spans 4) */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-wider text-orange-500">Sales & Dispatch Office</h4>
            <ul className="flex flex-col gap-3 text-xs font-normal text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-orange-500">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="leading-snug">Tarasaa Trading Center, Garsen–Lamu Rd, Tana River County</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center text-orange-500">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <span className="font-semibold text-white tracking-wide">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center text-orange-500">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <span>Mon–Sat: 7:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Premium "Ghost" CTAs (Doesn't fight the sticky widgets) */}
          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <Link 
              href="/contact" 
              className="group inline-flex h-9 flex-1 items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/60 px-3.5 text-xs font-semibold text-neutral-200 transition-all hover:border-orange-500 hover:bg-neutral-900 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-orange-500" />
                Official Quotation
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-500" />
            </Link>

            <a 
              href={whatsappHref} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#25D366]/20 bg-[#25D366]/10 px-3.5 text-xs font-semibold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-black"
            >
              <MessageCircle className="h-3.5 w-3.5 fill-current" />
              <span>Direct Chat</span>
            </a>
          </div>
        </div>

      </div>

      {/* RECESSED TRUST & PROCUREMENT LEDGER (Fills the visual void) */}
      <div className="border-t border-neutral-900/80 bg-neutral-950/60">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left side: Secure Payments */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 pr-2 border-r border-neutral-800">
                <Lock className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-200">
                  Protected Escrow
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Inline SVG M-PESA */}
                <span className="flex items-center gap-1 bg-[#52B748] px-2 py-0.5 rounded text-[10px] font-black tracking-tighter text-white shadow-sm">
                  <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24"><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75ZM16.5 15.25C16.5 15.66 16.16 16 15.75 16H8.25C7.84 16 7.5 15.66 7.5 15.25V8.75C7.5 8.34 7.84 8 8.25 8H15.75C16.16 8 16.5 8.34 16.5 8.75V15.25Z"/></svg>
                  M-PESA
                </span>

                {/* Inline SVG Visa */}
                <span className="flex items-center bg-[#1A1F71] px-2 py-0.5 rounded text-[10px] font-black italic tracking-wider text-white shadow-sm font-serif">
                  VISA
                </span>

                {/* Inline SVG Mastercard */}
                <span className="flex items-center gap-0.5 bg-[#141414] border border-neutral-800 px-2 py-0.5 rounded text-[10px] font-medium text-neutral-200">
                  <span className="flex -space-x-1">
                    <span className="h-2 w-2 rounded-full bg-red-500 inline-block"></span>
                    <span className="h-2 w-2 rounded-full bg-amber-500 inline-block mix-blend-screen"></span>
                  </span>
                  <span className="ml-1">Mastercard</span>
                </span>

                <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] font-medium text-neutral-300">
                  Bank RTGS
                </span>

                <span className="px-2 py-0.5 bg-orange-950/40 border border-orange-800/50 rounded text-[10px] font-semibold text-orange-400">
                  Pay on Delivery
                </span>
              </div>
            </div>

            {/* Right side: Procurement Badges */}
            <div className="flex items-center gap-4 text-[11px] font-medium text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                30-Day Corporate LPO Approved
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL LEDGER */}
      <div className="border-t border-neutral-900 bg-[#070707]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6 md:flex-row text-[11px] font-medium text-neutral-500">
          <p>© 2026 {settings.business_name} Hardware Ltd. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-neutral-400">
            <Link href="/terms" className="hover:underline hover:text-neutral-200 transition-colors">Terms of Trade</Link>
            <Link href="/privacy" className="hover:underline hover:text-neutral-200 transition-colors">Data Policy</Link>
            <Link href="/dispatch-policy" className="hover:underline hover:text-neutral-200 transition-colors">County Delivery Tariffs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}