import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[#8e7166] bg-[#111827]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link className="text-[28px] font-bold leading-9 text-[#ffdbce]" href="/">
            Amroz Traders
          </Link>
          <p className="max-w-xs text-base leading-6 text-[#e0e3e5]">
            Kenya&apos;s trusted supplier of construction hardware, electrical supplies, power tools, PPE and building materials.
          </p>

          {/* Payment Methods */}
          <div className="mt-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#ffb599]">Secure Payments</p>
            <div className="flex flex-wrap gap-2">
              {["M-Pesa", "Visa", "Bank Transfer", "Cash"].map((m) => (
                <span key={m} className="rounded border border-[#374151] bg-[#1e293b] px-2.5 py-1 text-[10px] font-semibold text-[#94a3b8]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Company */}
        <FooterColumn title="Company" links={["About Us", "Careers", "Terms of Service", "Privacy Policy"]} />

        {/* Categories */}
        <FooterColumn
          title="Categories"
          links={["Electrical Supplies", "Construction Hardware", "Building Materials", "Plumbing Supplies", "Power Tools", "Paints & Finishes"]}
        />

        {/* Contact */}
        <div>
          <h4 className="mb-6 text-xl font-bold text-[#ffb599]">Contact</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-1 text-base leading-6 text-[#e0e3e5]">
              <span className="material-symbols-outlined mt-1 text-sm">location_on</span>
              <span>Tarasaa Trading Center, Kenya</span>
            </li>
            <li className="flex items-center gap-1 text-base leading-6 text-[#e0e3e5]">
              <span className="material-symbols-outlined text-sm">phone</span>
              <span>{siteConfig.phone}</span>
            </li>
            <li className="flex items-center gap-1 text-base leading-6 text-[#e0e3e5]">
              <span className="material-symbols-outlined text-sm">chat</span>
              <span>WhatsApp Support</span>
            </li>
            <li className="flex items-center gap-1 text-base leading-6 text-[#e0e3e5]">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Mon–Sat: 7:00 AM – 6:00 PM</span>
            </li>
            <li className="mt-3 flex items-center gap-1 text-base leading-6 text-[#e0e3e5]">
              <Link className="rounded border border-[#ea580c]/30 bg-[#ea580c]/20 px-3 py-1 text-xs font-medium text-[#ffdbce] transition-colors hover:bg-[#ea580c]/30" href="/contact">
                Contact Sales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Map */}
      <div className="border-t border-[#1e293b]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31777.62605373701!2d40.154859982122765!3d-2.6233046830135978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18162fa7f3a16e9b%3A0x814f317c608a431e!2sTarasaa!5e0!3m2!1sen!2ske!4v1781702572978!5m2!1sen!2ske"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Amroz Traders Location"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1e293b]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
          <p className="text-xs font-medium text-[#6b7280]">© 2025 Amroz Traders Hardware. All rights reserved.</p>
          <p className="text-xs text-[#6b7280]">Industrial Hardware Supplies in Kenya</p>
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
