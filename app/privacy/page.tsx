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

          <h1>Data Policy</h1>
          <p className="text-slate-500 text-xs">Last updated: June 2026</p>

          <hr className="border-slate-200" />

          <h2>1. Scope of This Policy</h2>
          <p>Amroz Traders Hardware Ltd. (&ldquo;Amroz Traders,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting the privacy and personal data of our Clients, website visitors, and business partners. This Data Policy explains how we collect, use, disclose, retain, and safeguard your personal information when you interact with our website, submit quote requests (via upload or manual entry), communicate with us via WhatsApp or email, or engage our logistics and delivery services.</p>
          <p>This policy is designed to comply with the Kenya Data Protection Act, 2019 (the &ldquo;DPA&rdquo;) and any applicable regulations issued by the Office of the Data Protection Commissioner (ODPC).</p>

          <h2>2. Data Controller</h2>
          <p>The data controller responsible for your personal information is:</p>
          <p className="bg-slate-50 rounded border border-slate-200 p-3">
            <strong>Amroz Traders Hardware Ltd.</strong><br />
            Tarasaa Trading Center, Garsen – Lamu Rd, Tana River County, Kenya.<br />
            Email: <a href="mailto:info@amroztraders.co.ke" className="text-orange-700 underline font-semibold">info@amroztraders.co.ke</a> (placeholder)<br />
            Phone: As displayed on our official website contact information.
          </p>

          <h2>3. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us, as well as information automatically collected when you use our platform:</p>

          <h3>3.1 Information You Provide</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Contact Information:</strong> Full name, phone number, email address, and physical delivery address.</li>
            <li><strong>Quote &amp; Order Information:</strong> Bill of quantities (BOQ) documents, product lists, building plans, specifications, and any other materials uploaded or manually entered during the quote request process.</li>
            <li><strong>Payment Information:</strong> Payment details are processed through our secure third-party payment processors (M-PESA, Visa, Mastercard, Bank RTGS). We do not store full credit card numbers or M-PESA PINs on our servers.</li>
            <li><strong>Corporate Information:</strong> Company name, KRA PIN, business registration number, LPO documentation, and authorized signatory details for corporate Clients.</li>
            <li><strong>Communications:</strong> Records of correspondence when you contact us via WhatsApp, email, phone, or our website contact forms.</li>
          </ol>

          <h3>3.2 Information Collected Automatically</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Usage Data:</strong> IP address, browser type, operating system, referring URLs, page views, and interactions with our website.</li>
            <li><strong>Device Information:</strong> Device type, screen resolution, and unique device identifiers where permitted.</li>
            <li><strong>Cookies &amp; Tracking Technologies:</strong> We use essential cookies for website functionality and analytics cookies to improve our services. You may control cookie preferences through your browser settings.</li>
          </ol>

          <h2>4. Purpose of Processing</h2>
          <p>We process your personal information for the following legitimate business purposes:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>To process, fulfill, and manage your quote requests, orders, and delivery logistics to construction and project sites.</li>
            <li>To communicate with you regarding your orders, including WhatsApp and email notifications about quotation status, dispatch updates, and delivery scheduling.</li>
            <li>To verify your identity and creditworthiness for LPO and corporate credit facilities.</li>
            <li>To comply with statutory obligations under Kenyan law, including tax reporting (KRA), regulatory compliance (KEBS), and record-keeping requirements.</li>
            <li>To improve our website, product catalog, and service offerings through aggregated analytics.</li>
            <li>To detect, prevent, and investigate fraudulent or unauthorized transactions.</li>
          </ol>

          <h2>5. Legal Basis for Processing</h2>
          <p>We process your personal data on the following lawful bases as defined by the Kenya Data Protection Act, 2019:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Contractual Necessity:</strong> Processing is necessary for the performance of a contract with you (e.g., order fulfillment, delivery).</li>
            <li><strong>Consent:</strong> Where you have provided explicit consent (e.g., marketing communications, optional data sharing).</li>
            <li><strong>Legal Obligation:</strong> Processing is necessary for compliance with a legal obligation to which we are subject.</li>
            <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate business interests, provided such interests are not overridden by your data protection rights.</li>
          </ol>

          <h2>6. Third-Party Sharing &amp; Disclosure</h2>
          <p>We do not sell, rent, or trade your personal information. We may share your data with the following categories of recipients strictly for the purposes described in this policy:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Shipping &amp; Logistics Partners:</strong> Vetted freight and delivery fleet operators who require your name, phone number, and delivery address to complete deliveries to your site.</li>
            <li><strong>Payment Processors:</strong> M-PESA (Safaricom), Visa/Mastercard acquiring banks, and escrow service providers for transaction processing. These processors have their own data handling and security policies.</li>
            <li><strong>Regulatory Authorities:</strong> KRA, KEBS, county governments, and other statutory bodies where disclosure is required by law.</li>
            <li><strong>Professional Advisors:</strong> Our legal, accounting, and insurance advisors on a strictly need-to-know basis.</li>
          </ol>
          <p>We require all third-party service providers to implement appropriate technical and organizational measures to protect your personal data and to process it only for the specified purposes.</p>

          <h2>7. Data Retention</h2>
          <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Order &amp; Transaction Records:</strong> Retained for a period of seven (7) years from the date of the transaction in compliance with the Kenyan Tax Procedures Act and the Companies Act.</li>
            <li><strong>Quote Requests:</strong> Retained for a period of two (2) years from the date of the last communication unless a formal order is placed, in which case they become part of the transaction record.</li>
            <li><strong>Communications Records:</strong> WhatsApp and email correspondence retained for the duration of the customer relationship plus twelve (12) months.</li>
            <li><strong>Analytics &amp; Usage Data:</strong> Retained in anonymized or aggregated form indefinitely; identifiable data retained for a maximum of twenty-four (24) months.</li>
            <li><strong>Marketing Consent Records:</strong> Retained for the duration of your subscription plus twelve (12) months after opt-out.</li>
          </ol>
          <p>Upon expiry of the applicable retention period, your personal data will be securely deleted or anonymized.</p>

          <h2>8. Data Security</h2>
          <p>We implement industry-standard technical and organizational security measures to protect your personal information, including:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Secure Sockets Layer (SSL/TLS) encryption for all data transmitted through our website.</li>
            <li>Protected Escrow layers for high-value financial transactions.</li>
            <li>Role-based access controls restricting employee access to personal data on a need-to-know basis.</li>
            <li>Regular security audits and vulnerability assessments of our digital infrastructure.</li>
            <li>Pseudonymization and encryption of personal data where feasible.</li>
          </ol>

          <h2>9. Cybersecurity &amp; Transmission Disclaimer</h2>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs text-red-800">
            <p className="font-bold mb-1">9.1 Limitation of Liability — Data Transmission &amp; Cybersecurity</p>
            <p>While Amroz Traders employs industry-standard encryption protocols, secure socket layer technologies, and protected escrow layers to safeguard your data, we expressly disclaim absolute liability for:</p>
            <ol className="list-decimal pl-4 mt-2 space-y-1">
              <li>Unauthorized third-party interceptions of data transmitted over public telecommunications networks, including but not limited to internet service provider-level breaches, Wi-Fi eavesdropping, or man-in-the-middle attacks occurring outside our direct digital perimeter control;</li>
              <li>Data breaches, cyber-attacks, ransomware incidents, or unauthorized access events that occur despite the implementation of reasonable and industry-standard security measures, where such events result from zero-day vulnerabilities, advanced persistent threats, or attack vectors that were not reasonably foreseeable or preventable at the time;</li>
              <li>Telecom or network infrastructure security vulnerabilities inherent in third-party telecommunications providers, mobile network operators (including Safaricom, Airtel, Telkom), internet service providers, or cloud infrastructure hosts that are beyond our control;</li>
              <li>Any loss, damage, or injury arising from your failure to maintain the confidentiality of your account credentials, payment details, or personal information;</li>
              <li>Third-party payment processor security incidents that occur within the processor's systems, even if such incidents involve data originally provided through our platform.</li>
            </ol>
            <p className="mt-2">We commit to notifying the Office of the Data Protection Commissioner (ODPC) and affected data subjects in accordance with the Kenya Data Protection Act, 2019, in the event of a personal data breach that poses a risk to the rights and freedoms of natural persons.</p>
          </div>

          <h2>10. Your Rights Under the Kenya Data Protection Act, 2019</h2>
          <p>As a data subject, you have the following rights under the DPA:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Right to be Informed:</strong> To receive clear and transparent information about how we use your personal data (as provided in this policy).</li>
            <li><strong>Right of Access:</strong> To request confirmation of whether we hold your personal data and to obtain a copy of that data.</li>
            <li><strong>Right to Rectification:</strong> To request correction of inaccurate or incomplete personal data.</li>
            <li><strong>Right to Erasure (Right to be Forgotten):</strong> To request deletion of your personal data where there is no compelling legitimate ground for continued processing.</li>
            <li><strong>Right to Restrict Processing:</strong> To request that we limit the processing of your personal data in certain circumstances.</li>
            <li><strong>Right to Data Portability:</strong> To receive your personal data in a structured, commonly used, and machine-readable format.</li>
            <li><strong>Right to Object:</strong> To object to the processing of your personal data for direct marketing purposes or on grounds relating to your particular situation.</li>
            <li><strong>Right not to be Subject to Automated Decision-Making:</strong> To not be subject to a decision based solely on automated processing that produces legal effects concerning you.</li>
          </ol>
          <p>To exercise any of these rights, please contact our Data Protection Officer using the contact details in Section 13 below. We will respond to your request within the statutory timeframe prescribed by the DPA.</p>

          <h2>11. Cookies &amp; Tracking Technologies</h2>
          <p>Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. We use:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Essential Cookies:</strong> Required for the basic functionality of our website, including session management and security. These cannot be disabled.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting aggregated, anonymized data.</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings to provide a personalized experience.</li>
          </ol>
          <p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.</p>

          <h2>12. Data Transfers</h2>
          <p>Your personal data is primarily stored and processed on servers located within the Republic of Kenya. Where we engage third-party service providers who may process data outside Kenya (e.g., cloud infrastructure providers), we ensure that appropriate safeguards are in place, including Standard Contractual Clauses or equivalent transfer mechanisms recognized under the Kenya Data Protection Act, 2019.</p>

          <h2>13. Contact &amp; Complaints</h2>
          <p>If you have any questions, concerns, or complaints regarding this Data Policy or our data processing practices, please contact:</p>
          <p className="bg-slate-50 rounded border border-slate-200 p-3">
            <strong>Data Protection Officer</strong><br />
            Amroz Traders Hardware Ltd.<br />
            Tarasaa Trading Center, Garsen – Lamu Rd, Tana River County, Kenya.<br />
            Email: <a href="mailto:dpo@amroztraders.co.ke" className="text-orange-700 underline font-semibold">dpo@amroztraders.co.ke</a> (placeholder)
          </p>
          <p>If you are not satisfied with our response, you have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) at <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer" className="text-orange-700 underline font-semibold">www.odpc.go.ke</a>.</p>

          <h2>14. Changes to This Policy</h2>
          <p>We may update this Data Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. We will notify you of material changes by posting the updated policy on this page with a revised "Last updated" date. We encourage you to review this policy periodically.</p>

        </div>
      </main>
      <Footer />
    </>
  );
}
