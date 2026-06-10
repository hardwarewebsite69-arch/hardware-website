import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-xl font-extrabold text-white">{siteConfig.businessName}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Hardware, building materials, tools, and industrial supplies with quote support for contractors and bulk buyers.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-white">Catalog</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/shop/building-materials">Building Materials</Link>
            <Link href="/shop/tools-equipment">Tools & Equipment</Link>
            <Link href="/shop/industrial-hardware">Industrial Hardware</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase text-white">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <a href={siteConfig.telHref}>{siteConfig.phone}</a>
            <a href={siteConfig.whatsappHref}>WhatsApp support</a>
            <Link href="/admin/dashboard">Admin panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
