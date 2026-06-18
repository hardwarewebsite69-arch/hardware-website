import { FaWhatsapp } from "react-icons/fa";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function FloatingActions() {
  return (
    <>
      {/* Desktop Floating Buttons — hidden on mobile */}
      <div className="fixed bottom-8 right-8 z-50 hidden flex-col gap-3 items-end md:flex">
        {/* Get Quote */}
        <Link
          href="/quote"
          className="flex h-12 items-center gap-2 rounded-full bg-[#ea580c] px-6 text-white shadow-2xl transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(234,88,12,0.4)] active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">description</span>
          <span className="text-sm font-bold">Get Quote</span>
        </Link>

        {/* Call */}
        <a
          href={siteConfig.telHref}
          className="flex h-12 items-center gap-2.5 rounded-full bg-[#111827] px-5 text-white shadow-2xl transition-all hover:scale-105 active:scale-95 group"
        >
          <span className="material-symbols-outlined text-lg">call</span>
          <span className="text-sm font-bold hidden group-hover:block">Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={siteConfig.whatsappHref}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-3xl" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 animate-ping rounded-full bg-[#25d366] opacity-75" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 rounded-full bg-[#25d366] border-2 border-white" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar — visible on mobile only */}
      <div className="mobile-sticky-bar fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[#e5e7eb] bg-white/95 backdrop-blur-md md:hidden">
        <a
          href={siteConfig.telHref}
          className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[#374151] transition-colors active:text-[#ea580c]"
        >
          <span className="material-symbols-outlined text-xl">call</span>
          <span className="text-[10px] font-semibold">Call</span>
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[#25d366] transition-colors"
        >
          <FaWhatsapp className="text-xl" />
          <span className="text-[10px] font-semibold">WhatsApp</span>
        </a>
        <Link
          href="/quote"
          className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[#ea580c] transition-colors"
        >
          <span className="material-symbols-outlined text-xl">description</span>
          <span className="text-[10px] font-bold">Quote</span>
        </Link>
      </div>
    </>
  );
}
