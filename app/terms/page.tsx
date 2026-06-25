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

          <h1>Terms of Trade</h1>
          <p className="text-slate-500 text-xs">Last updated: June 2026</p>

          <hr className="border-slate-200" />

          <h2>1. Definitions &amp; Interpretation</h2>
          <p>In these Terms of Trade, unless the context otherwise requires:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>"Company"</strong> means Amroz Traders Hardware Ltd., a company registered in the Republic of Kenya with its head office at Tarasaa Trading Center, Garsen – Lamu Rd, Tana River County.</li>
            <li><strong>"Client"</strong> means the individual, partnership, corporation, or other legal entity placing an order for Goods with the Company.</li>
            <li><strong>"Goods"</strong> means all products, materials, hardware, and supplies offered for sale by the Company, including but not limited to structural steel, electrical supplies, PPE, power tools, and plumbing materials.</li>
            <li><strong>"LPO"</strong> means a Local Purchase Order issued by the Client and duly approved in accordance with the Company's validation requirements.</li>
            <li><strong>"Contract"</strong> means the agreement formed between the Company and the Client upon the Company's acceptance of a valid Order, incorporating these Terms of Trade.</li>
            <li><strong>"Force Majeure"</strong> means any event beyond a party's reasonable control, including but not limited to acts of God, war, terrorism, civil unrest, strikes, government regulations, natural disasters, fire, flood, epidemic, pandemic, supply chain disruptions, and infrastructure failures.</li>
          </ol>

          <h2>2. Orders &amp; LPO Processing</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>All Orders placed by the Client are subject to acceptance by the Company. The Company reserves the right to decline or cancel any Order for any reason prior to dispatch confirmation.</li>
            <li>Corporate LPOs submitted by the Client must include all requisite validation details: company letterhead, authorized signatory, purchase order number, delivery site, and agreed payment terms.</li>
            <li>LPO-approved credit terms are extended strictly on a 30-day net basis from the date of invoice unless alternative arrangements have been expressly documented in writing by the Company's finance department.</li>
            <li>LPO credit limits are determined at the Company's sole discretion based on the Client's credit history, trade references, and procurement volume. The Company reserves the right to withdraw or adjust LPO credit facilities without prior notice.</li>
            <li>The Client shall ensure that all information provided in connection with an Order is accurate, complete, and current. The Company shall not be liable for any delays, mis-deliveries, or fulfillment failures arising from inaccurate or incomplete Order information.</li>
          </ol>

          <h2>3. Pricing &amp; Inquiries</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>All prices quoted are in Kenyan Shillings (KES) unless otherwise stated and are exclusive of Value Added Tax (VAT) and any other applicable levies unless expressly indicated.</li>
            <li>Products marked "Price on Inquiry" or "POI" require the Client to submit a formal price request. The Company will respond with a valid quote within a reasonable commercial timeframe. POI prices are subject to availability and prevailing market rates at the time of quotation.</li>
            <li>The Company reserves the right to adjust prices at any time prior to Order acceptance. Once accepted, prices are firm for the duration specified in the quote, not exceeding thirty (30) calendar days.</li>
            <li>VAT, withholding tax, excise duties, and all other statutory levies shall be borne by the Client in accordance with the laws of the Republic of Kenya. The Company shall issue a valid ETR receipt or tax invoice for all taxable supplies.</li>
          </ol>

          <h2>4. Payment Terms</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>The Company accepts the following payment methods: M-PESA, Visa, Mastercard, Bank RTGS (Real-Time Gross Settlement), Protected Escrow transfers, and Pay on Delivery (subject to site approval).</li>
            <li>For M-PESA transactions, the Client must use the Company's registered PayBill or Till Number as communicated on the official invoice. The Company shall not be liable for funds sent to incorrect or unauthorized numbers.</li>
            <li>Bank RTGS payments must reference the invoice number and be credited to the Company's designated bank account as stated on the invoice. The Company reserves the right to withhold dispatch until funds are reflected in its account.</li>
            <li>Protected Escrow transactions are governed by the applicable escrow service provider's terms. The Company shall release Goods upon confirmation of escrow clearance.</li>
            <li>Pay on Delivery is available at the Company's discretion for qualifying Clients and delivery locations. Payment must be made in full via an accepted on-site payment method before offloading commences.</li>
            <li>Overdue accounts shall accrue interest at a rate of 1.5% per month (or the maximum rate permitted by law, whichever is lower) on the outstanding balance from the due date until payment is received in full.</li>
          </ol>

          <h2>5. Risk &amp; Title</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Risk of loss, damage, or deterioration of the Goods shall pass to the Client upon physical delivery of the Goods to the Client or its designated agent at the delivery site.</li>
            <li>Legal and beneficial title to the Goods shall remain with the Company until full payment of all sums due under the Contract has been received. Until title passes, the Client shall hold the Goods as bailee and shall not sell, transfer, or dispose of them.</li>
            <li>If the Client fails to make payment when due, the Company may (without prejudice to any other rights) repossess and remove the Goods from the Client's premises, and the Client hereby grants an irrevocable license to the Company to enter its premises for such purpose.</li>
          </ol>

          <h2>6. Delivery &amp; Logistics</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Delivery timelines provided by the Company are estimates only and are not guaranteed. The Company shall use reasonable commercial endeavors to meet quoted timelines but shall not be liable for delays arising from factors beyond its control.</li>
            <li>The Client is responsible for ensuring safe and adequate site access for delivery vehicles. The Company reserves the right to refuse delivery or impose additional charges if site conditions pose a safety risk or are inaccessible.</li>
            <li>Offloading of Goods at the delivery site is the Client's responsibility unless alternative arrangements have been expressly agreed in writing. Demurrage charges may apply for excessive vehicle waiting time beyond thirty (30) minutes at the delivery point.</li>
            <li>Delivery charges are calculated dynamically based on cargo volume (cubic meters), weight tonnage, distance from the Company's distribution hub at Garsen/Tana River, and applicable county access levies.</li>
          </ol>

          <h2>7. Inspection, Returns &amp; Warranties</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>The Client shall inspect all Goods upon delivery. Any claim for shortages, damage, or non-conformity must be reported in writing within forty-eight (48) hours of delivery, failing which the Goods shall be deemed accepted.</li>
            <li>Claims for manufacturing defects must be submitted within seven (7) calendar days of discovery, accompanied by photographic evidence and the original invoice.</li>
            <li>The Company warrants that Goods conform to KEBS (Kenya Bureau of Standards) specifications where applicable. This warranty does not cover normal wear and tear, misuse, improper installation, unauthorized modifications, or failure to follow manufacturer guidelines.</li>
            <li>Returns are accepted at the Company's sole discretion and may be subject to a restocking fee of up to 25% of the purchase price. Custom-ordered or non-stock items are non-returnable.</li>
          </ol>

          <h2>8. Limitation of Liability</h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-800">
            <p className="font-bold mb-1">8.1 Critical Disclaimer — No Liability for Indirect or Consequential Loss</p>
            <p>To the maximum extent permitted by the laws of the Republic of Kenya, the Company expressly excludes and assumes zero liability for:</p>
            <ol className="list-decimal pl-4 mt-2 space-y-1">
              <li>Any downstream structural construction engineering delays, including but not limited to project timeline overruns, liquidated damages, or penalty clauses arising from material delivery schedules;</li>
              <li>Site architectural planning errors, design miscalculations, or engineering specification discrepancies that may arise from the use or application of the Goods;</li>
              <li>Third-party contractor scheduling conflicts, subcontractor availability, or any workforce-related delays at the project site;</li>
              <li>Any indirect, incidental, special, exemplary, punitive, or consequential damages of any kind whatsoever, including but not limited to loss of profits, loss of business, loss of contracts, loss of production, loss of anticipated savings, loss of data, or cost of substitute goods or services, even if the Company has been advised of the possibility of such damages;</li>
              <li>Any claims arising from the improper storage, handling, installation, or use of the Goods after delivery has occurred.</li>
            </ol>
            <p className="mt-2">The Company's total aggregate liability arising out of or in connection with these Terms of Trade or any Contract, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall not exceed the purchase price paid by the Client for the specific Goods giving rise to the claim.</p>
          </div>

          <h2>9. Indemnity</h2>
          <p>The Client agrees to indemnify, defend, and hold harmless the Company, its directors, officers, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in connection with:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>The Client's breach of these Terms of Trade;</li>
            <li>The Client's misuse or improper handling of the Goods after delivery;</li>
            <li>Any representation, warranty, or undertaking made by the Client to third parties regarding the Goods that exceeds or contradicts the Company's specifications or intended use.</li>
          </ol>

          <h2>10. Termination</h2>
          <p>The Company may, by written notice to the Client, terminate any Contract with immediate effect if:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>The Client fails to pay any sum due within fourteen (14) days of the due date;</li>
            <li>The Client commits a material breach of any term of these Terms of Trade which is incapable of remedy or, if capable of remedy, is not remedied within seven (7) days of receiving written notice;</li>
            <li>The Client becomes insolvent, is declared bankrupt, enters into liquidation, or has a receiver or administrator appointed over its assets.</li>
          </ol>

          <h2>11. Force Majeure</h2>
          <p>The Company shall not be liable for any failure or delay in performing its obligations under a Contract where such failure or delay results from a Force Majeure event. The Company shall use reasonable endeavors to mitigate the effects of any Force Majeure event and shall notify the Client promptly of its occurrence and estimated duration.</p>

          <h2>12. Governing Law &amp; Jurisdiction</h2>
          <p>These Terms of Trade and any Contract formed under them shall be governed by and construed in accordance with the laws of the Republic of Kenya. The parties irrevocably submit to the exclusive jurisdiction of the courts of Kenya for the settlement of any disputes arising out of or in connection with these Terms of Trade.</p>

          <h2>13. General Provisions</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Entire Agreement:</strong> These Terms of Trade constitute the entire agreement between the parties and supersede all prior agreements, understandings, representations, and communications, whether written or oral.</li>
            <li><strong>Severability:</strong> If any provision of these Terms of Trade is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.</li>
            <li><strong>Waiver:</strong> No failure or delay by the Company in exercising any right or remedy shall operate as a waiver thereof, nor shall any single or partial exercise preclude any further exercise thereof.</li>
            <li><strong>Variation:</strong> The Company reserves the right to amend these Terms of Trade at any time. Updated terms will be published on this page and will apply to all Orders placed after the date of publication.</li>
          </ol>

        </div>
      </main>
      <Footer />
    </>
  );
}
