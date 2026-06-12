import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
   <footer className="mt-20 border-t border-[#8e7166] bg-[#111827]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-4">
          <div className="flex flex-col gap-6">
            <Link className="text-[28px] font-bold leading-9 text-[#ffdbce]" href="/">
              Amroz Traders
            </Link>
            <p className="max-w-xs text-base leading-6 text-[#e0e3e5]">Precision engineered hardware and materials for industrial scale projects.</p>
            <div className="mt-auto">
              <p className="text-xs font-medium text-[#e0e3e5]">© 2024 Amroz Traders Hardware. Precision Engineered.</p>
            </div>
          </div>
          <FooterColumn title="Company" links={["About Us", "Careers", "Terms of Service", "Privacy Policy"]} />
          <FooterColumn title="Categories" links={["Tools", "Fasteners", "Safety Gear", "Machinery"]} />
          <div>
            <h4 className="mb-6 text-xl font-bold text-[#ffb599]">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-1 text-base leading-6 text-[#e0e3e5]">
                <span className="material-symbols-outlined mt-1 text-sm">location_on</span>
                <span>123 Industrial Way, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-1 text-base leading-6 text-[#e0e3e5]">
                <span className="material-symbols-outlined text-sm">phone</span>
                <span>{siteConfig.phone}</span>
              </li>
              <li className="flex items-center gap-1 text-base leading-6 text-[#e0e3e5]">
                <span className="material-symbols-outlined text-sm">chat</span>
                <span>WhatsApp Support</span>
              </li>
              <li className="mt-3 flex items-center gap-1 text-base leading-6 text-[#e0e3e5]">
                <Link className="rounded border border-[#ea580c]/30 bg-[#ea580c]/20 px-3 py-1 text-xs font-medium text-[#ffdbce] transition-colors hover:bg-[#ea580c]/30" href="/contact">
                  Contact Sales
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  );
}

function FooterColumn({ links, title }: { links: string[]; title: string }) {
  return (
    <div>
      <h4 className="mb-6 text-xl font-bold text-[#ffb599]">{title}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <Link className="text-base leading-6 text-[#e0e3e5] transition-colors hover:text-[#ffb599]" href="#">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
