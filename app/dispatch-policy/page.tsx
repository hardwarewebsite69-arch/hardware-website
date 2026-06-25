import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose-headings:font-display prose-headings:tracking-tight prose-h1:text-4xl prose-h1:font-black prose-h2:text-2xl prose-h2:font-extrabold prose-h3:text-lg prose-h3:font-bold text-slate-700 text-sm leading-relaxed space-y-6">

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 mb-8">
            <strong className="block">Disclaimer:</strong>
            The following documents are drafted as generic, operational web copy templates for informational purposes only. They do not constitute formal legal counsel or establish an attorney-client relationship. The user must review these materials with a certified legal professional in Kenya to align with exact internal corporate compliance parameters before deployment.
          </div>

          <h1>County Delivery Tariffs</h1>
          <p className="text-slate-500 text-xs">Last updated: June 2026</p>

          <hr className="border-slate-200" />

          <h2>1. Baseline Logistics Policy</h2>
          <p>Amroz Traders Hardware Ltd. (&ldquo;Amroz Traders&rdquo;) operates a centralized distribution hub at Tarasaa Trading Center, Garsen – Lamu Rd, Tana River County. All delivery charges are calculated dynamically based on the following variables:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Cargo Volume Metrics:</strong> Charges are determined by the total cubic meter (m&sup3;) volume of the consignment, calculated as length × width × height of the packaged goods or palletized load.</li>
            <li><strong>Weight Tonnage:</strong> The gross weight of the consignment in metric tonnes, including packaging and pallet weight. Heavier loads attract proportional surcharges reflecting fuel consumption and road wear factors.</li>
            <li><strong>Distance from Origin:</strong> Kilometric distance calculated from our Garsen/Tana River distribution hub to the specified delivery address via the most commercially viable route.</li>
            <li><strong>Route Classification:</strong> Tariffs vary based on road infrastructure classification — tarmac highways, all-weather gravel roads, or seasonal rural access roads.</li>
            <li><strong>Special Handling:</strong> Oversized loads, hazardous materials, or goods requiring specialized transport equipment (cranes, flatbeds, low-bed trailers) attract additional surcharges quoted on request.</li>
          </ol>
          <p>All delivery quotations provided are valid for fourteen (14) calendar days from the date of issuance, after which rates may be subject to revision based on fuel price fluctuations, regulatory levy changes, or seasonal access conditions.</p>

          <h2>2. Offloading Policy</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Client Responsibility:</strong> The Client shall provide adequate personnel and, where necessary, appropriate offloading equipment (forklifts, cranes, or manual labor) at the delivery site to receive the Goods. The Company&rsquo;s delivery drivers are not obligated to perform offloading unless expressly pre-arranged and quoted.</li>
            <li><strong>Site Accessibility:</strong> The Client warrants that the delivery site is accessible to the Company&rsquo;s delivery vehicles, including but not limited to flatbed trucks (up to 12 metres), curtain-sided trailers, and small box-body trucks. The Client shall ensure clear, unobstructed access and adequate turning radius for vehicle maneuvering.</li>
            <li><strong>Demurrage Charges:</strong> If the Company&rsquo;s delivery vehicle is detained at the delivery site beyond thirty (30) minutes from arrival due to the Client&rsquo;s failure to have offloading personnel ready, a demurrage charge of KES 2,000 per hour (or part thereof) shall apply and be invoiced separately.</li>
            <li><strong>Failed Delivery Attempts:</strong> If delivery is attempted and the Company is unable to complete it due to site inaccessibility, absence of authorized recipient, or refusal to accept the Goods, the Client shall bear the full cost of the failed delivery plus a re-delivery fee calculated at 75% of the original delivery charge.</li>
          </ol>

          <h2>3. Regional Delivery Zones</h2>
          <p>For tariff estimation purposes, Kenyan counties are grouped into the following delivery handling zones:</p>

          <h3>Zone 1 — Coast Region (Primary Catchment)</h3>
          <p className="text-slate-500 text-xs italic">Baseline tariffs apply. Shortest dispatch lead times.</p>
          <div className="bg-slate-50 rounded border border-slate-200 p-4 text-xs">
            <p className="font-bold text-slate-900 mb-2">Counties:</p>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              <li><strong>Tana River</strong> — Head office county. Same-day or next-day dispatch available for stock items within Garsen and Hola townships.</li>
              <li><strong>Lamu</strong> — Direct route via Garsen–Lamu Rd. Weekly scheduled runs. Island delivery (Lamu Island, Manda) incurs additional ferry/barge logistics surcharge.</li>
              <li><strong>Kilifi</strong> — Served via Malindi–Garissa Rd corridor. Scheduled bi-weekly runs. Coastal resort and township deliveries (Malindi, Watamu, Kilifi Creek) included.</li>
              <li><strong>Mombasa</strong> — Served via Mombasa–Nairobi Highway (A109). Weekly runs to Mombasa CBD, Industrial Area, and port precincts. Island deliveries (Mombasa Island, Nyali, Likoni) subject to bridge/ferry access timing.</li>
              <li><strong>Kwale</strong> — Served via Msambweni–Lunga Lunga corridor. Scheduled runs as part of coastal circuit. Diani, Ukunda, and Msambweni delivery points included.</li>
              <li><strong>Lamu Archipelago</strong> — Special handling zone. Delivery to Lamu Island, Manda Island, Kiwayu, and Pate Island requires coordination with maritime logistics partners and may attract additional sea-freight surcharges.</li>
            </ul>
          </div>

          <h3>Zone 2 — Capital Zone</h3>
          <p className="text-slate-500 text-xs italic">Medium-distance tariffs apply. Consolidated weekly runs.</p>
          <div className="bg-slate-50 rounded border border-slate-200 p-4 text-xs">
            <p className="font-bold text-slate-900 mb-2">Counties:</p>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              <li><strong>Nairobi</strong> — All sub-counties (Westlands, Lang&rsquo;ata, Embakasi, Kasarani, Dagoretti, Makadara, Kamukunji, Starehe, Mathare, Roysambu, Ruaraka). Delivery to construction sites, industrial areas, and residential addresses within the Nairobi metropolitan area. Congestion surcharge may apply for deliveries within the Central Business District during business hours.</li>
              <li><strong>Kiambu</strong> — Thika, Ruiru, Limuru, Kikuyu, Kiambu Town, and all sub-counties. Served as part of the Capital Zone consolidated run.</li>
              <li><strong>Machakos</strong> — Athi River, Machakos Town, Mavoko, and the greater Machakos region. Athi River industrial area served on priority basis.</li>
              <li><strong>Kajiado</strong> — Ongata Rongai, Kitengela, Kajiado Town, Ngong, and Isinya. Served as part of the southern corridor run.</li>
            </ul>
          </div>

          <h3>Zone 3 — Extended/Upcountry Regions</h3>
          <p className="text-slate-500 text-xs italic">Extended-distance tariffs apply. Longer lead times; consolidated runs may be scheduled based on order volume.</p>
          <div className="bg-slate-50 rounded border border-slate-200 p-4 text-xs">
            <p className="font-bold text-slate-900 mb-2">Regions &amp; Representative Counties:</p>
            <ul className="list-disc pl-4 space-y-1 text-slate-700">
              <li><strong>Rift Valley:</strong> Nakuru, Eldoret (Uasin Gishu), Kitale (Trans Nzoia), Kericho, Nandi, Narok, Baringo, Laikipia (Nanyuki, Nyeri catchment).</li>
              <li><strong>Western &amp; Nyanza:</strong> Kisumu, Kisii, Kakamega, Bungoma, Busia, Migori, Siaya, Homa Bay.</li>
              <li><strong>Eastern &amp; Upper Eastern:</strong> Meru, Embu, Kitui, Makueni, Marsabit, Isiolo, Tharaka Nithi.</li>
              <li><strong>North Eastern:</strong> Garissa, Wajir, Mandera — Special handling zone. Extended lead times. Security assessment may be required prior to dispatch. Additional security convoy surcharges may apply.</li>
            </ul>
            <p className="mt-3 text-slate-500">Note: Delivery to North Eastern counties (Zone 3, North Eastern) may be subject to enhanced security protocols, county transit permit requirements, and seasonal road access limitations. Clients are advised to consult with our logistics desk at least seventy-two (72) hours prior to planned dispatch for these regions.</p>
          </div>

          <h2>4. Delivery Lead Times</h2>
          <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-3 text-left">Zone</th>
                  <th className="p-3 text-left">Lead Time (Working Days)</th>
                  <th className="p-3 text-left">Run Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 font-semibold">Zone 1 — Coast Region</td>
                  <td className="p-3">1 – 3 days</td>
                  <td className="p-3">Weekly / Bi-weekly</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Zone 2 — Capital Zone</td>
                  <td className="p-3">3 – 7 days</td>
                  <td className="p-3">Weekly consolidated</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Zone 3 — Extended Regions</td>
                  <td className="p-3">7 – 14 days</td>
                  <td className="p-3">Consolidated (order-volume dependent)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Zone 3 — North Eastern (Special)</td>
                  <td className="p-3">14 – 21 days</td>
                  <td className="p-3">On-request with security clearance</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>5. County Transit &amp; Access Levies</h2>
          <p>Certain county governments impose transit fees, access levies, or weighbridge charges for commercial cargo vehicles passing through or delivering within their jurisdictions. These charges are variable and are passed through to the Client at cost. The Company will provide an estimate at the time of quotation but reserves the right to adjust for any unforeseen or unilaterally imposed county levies that become applicable between quotation and delivery.</p>

          <h2>6. Site Access &amp; Logistical Liability Limitation</h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-800">
            <p className="font-bold mb-1">6.1 Critical Disclaimer — Site Access &amp; Logistical Liability</p>
            <p>To the maximum extent permitted by the laws of the Republic of Kenya, Amroz Traders, its drivers, agents, and contracted freight partners expressly exclude and assume zero liability for:</p>
            <ol className="list-decimal pl-4 mt-2 space-y-1">
              <li><strong>Vehicle Entry Restrictions:</strong> Any inability to access a delivery site due to vehicle height, width, or weight restrictions, low-hanging utility lines, narrow gate access, weak bridges, soft ground, steep gradients, or any other site-specific physical limitation that renders the delivery vehicle unable to enter or maneuver safely;</li>
              <li><strong>Structural Site Layout Obstacles:</strong> Damage to on-site structures, landscaping, underground utilities, paving, or fixtures caused by the delivery vehicle during maneuvering, where such damage results from inadequate site planning, unmarked obstacles, or failure to communicate access constraints prior to delivery;</li>
              <li><strong>County Government Transit &amp; Cess Barriers:</strong> Delivery delays, diversions, or failures caused by county government roadblocks, cess collection points, weighbridge operations, transit permit requirements, or any other regulatory or administrative barrier imposed by county or national government authorities;</li>
              <li><strong>Acts of God &amp; Force Majeure:</strong> Any delay, failure, or inability to deliver arising from acts of God, including but not limited to floods, landslides, earthquakes, wildfires, extreme weather events, lightning, storms, or any other natural phenomenon that affects road conditions, bridge stability, or route accessibility;</li>
              <li><strong>Seasonal Weather Impact on Rural Access Roads:</strong> Delivery delays or failures caused by seasonal weather conditions affecting rural, un-tarmac, or gravel access roads, including but not limited to the long rains (March–May), short rains (October–December), or any period during which roads become impassable due to mud, waterlogging, or surface degradation;</li>
              <li><strong>Civil Unrest &amp; Security Events:</strong> Delays or failures arising from strikes, riots, civil commotion, terrorism, banditry, cattle rustling, or any security situation that renders a route or delivery location unsafe for transit;</li>
              <li><strong>Third-Party Freight Partner Performance:</strong> Any loss, damage, or delay caused by contracted third-party freight or logistics partners, including but not limited to vehicle breakdowns, accidents, cargo theft in transit, or driver error, where the Company has exercised reasonable care in the selection and instruction of such partners.</li>
            </ol>
            <p className="mt-2">The Company shall use reasonable commercial endeavors to notify the Client promptly of any logistics impediments and to propose alternative delivery arrangements where practicable. However, the Company shall not be liable for any direct, indirect, or consequential losses arising from the circumstances described in this Section 6.</p>
          </div>

          <h2>7. Claims &amp; Disputes</h2>
          <p>Any claim for loss, damage, or short delivery must be reported in writing to the Company within forty-eight (48) hours of delivery, accompanied by photographic evidence and a signed delivery receipt noting the discrepancy. Claims not reported within this timeframe shall be deemed waived. The Company&rsquo;s liability for verified claims shall be limited to the replacement of the Goods or a refund of the proportionate delivery charge, at the Company&rsquo;s sole discretion.</p>

          <h2>8. Contact Logistics Desk</h2>
          <p>For delivery quotations, scheduling inquiries, or site access assessments, contact our logistics coordination desk:</p>
          <p className="bg-slate-50 rounded border border-slate-200 p-3 text-xs">
            <strong>Logistics &amp; Dispatch Department</strong><br />
            Amroz Traders Hardware Ltd.<br />
            Tarasaa Trading Center, Garsen – Lamu Rd, Tana River County, Kenya.<br />
            Phone: As displayed on our official website contact information.<br />
            Email: <a href="mailto:logistics@amroztraders.co.ke" className="text-orange-700 underline font-semibold">logistics@amroztraders.co.ke</a> (placeholder)<br />
            Response Time: We aim to respond to all logistics inquiries within two (2) business hours during operating hours (Mon–Sat, 7:00 AM – 6:00 PM).
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
