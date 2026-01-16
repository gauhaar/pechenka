"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
import PolicyNotice from '@/components/PolicyNotice';

const TermsOfServiceSLNC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const sections = [
    { id: 'definitions', title: '1. Definitions and Parties' },
    { id: 'consent', title: '2. Consent and Legal Force' },
    { id: 'description', title: '3. Ecosystem Description' },
    { id: 'guarantees', title: '4. Security Guarantees' },
    { id: 'subscription', title: '5. Subscription and Payment' },
    { id: 'sla', title: '6. Service Level Agreement' },
    { id: 'ip', title: '7. Intellectual Property' },
    { id: 'liability', title: '8. Limitation of Liability' },
    { id: 'termination', title: '9. Termination' },
    { id: 'acceptable-use', title: '10. Acceptable Use' },
    { id: 'compliance', title: '11. Compliance' },
    { id: 'law', title: '12. Applicable Law' },
    { id: 'changes', title: '13. Changes to Terms' },
    { id: 'misc', title: '14. Miscellaneous' },
    { id: 'contact', title: '15. Contact' },
    { id: 'download', title: 'Download Full Terms' },
  ];

  return (
    <div className="bg-black text-white">
      <Header onOpenModal={openModal} />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col md:flex-row gap-8">
        <div className="md:w-80">
          <PolicySidebar sections={sections} />
        </div>
        <main className="flex-grow">
          <PolicyNotice />
          <h1 className="text-4xl font-bold mb-2">SLNC-env Policy</h1>
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Service</h2>
          <div className="space-y-8">
            <section id="definitions">
              <h2 className="text-2xl font-semibold mb-4">1. Definitions and Parties</h2>
              <p className="mb-4"><strong>1.1 Parties:</strong> Silence AI ("Provider") and User/Client ("You").</p>
              <p className="mb-4"><strong>1.2 Ecosystem:</strong> "Silence Environment" (SLNC-env) includes Ollama + LLM (local AI), SLNC-Code (autonomous IDE), and SitHub (private repository manager).</p>
            </section>

            <section id="consent">
              <h2 className="text-2xl font-semibold mb-4">2. Consent and Legal Force</h2>
              <p className="mb-4">By subscribing/using, you agree to these Terms. Age restrictions: 18+ (or 16-18 with parental consent). Corporate use requires authority to bind organization.</p>
            </section>

            <section id="description">
              <h2 className="text-2xl font-semibold mb-4">3. Ecosystem Description and Operating Principles</h2>
              <p className="mb-4"><strong>2.1 Principle:</strong> "Privacy by Design". Local processing without source code transfer.</p>
              <p className="mb-4"><strong>2.2 Components:</strong> Ollama & SLNC-Code are fully autonomous. SitHub scans locally using Trivy and only communicates with Provider for security updates (receiving definitions) and license verification.</p>
              <p className="mb-4"><strong>2.3 Security Updates:</strong> SitHub downloads vulnerability databases. Outgoing data is limited to license tokens, hashes, and metadata. Source Code is NEVER transmitted.</p>
            </section>

            <section id="guarantees">
               <h2 className="text-2xl font-semibold mb-4">4. Data Security Guarantees</h2>
               <p className="mb-4">Provider guarantees Ecosystem is designed for local processing. Provider does NOT guarantee against user actions, infrastructure compromise, or manual transfer.</p>
               <p className="mb-4">User Obligations: Maintain firewall/security, Prevent manual data transfer, Configure updates.</p>
            </section>

            <section id="subscription">
              <h2 className="text-2xl font-semibold mb-4">5. Subscription and Payment</h2>
              <p className="mb-4">Annual subscription for full access and updates. Payment in advance. Auto-renewal unless canceled (notification 30 days prior). No refunds except for critical system failure (&gt;7 days), proven privacy breach, or regulatory requirements (EU 14-day withdrawal).</p>
            </section>

            <section id="sla">
              <h2 className="text-2xl font-semibold mb-4">6. Service Level Agreement (SLA)</h2>
              <p className="mb-4">Target: 99.5% uptime for update servers. Local components (Ollama, SLNC-Code, SitHub scanning) operate independently of servers. Regular updates provided weekly; Critical updates within 48 hours.</p>
            </section>

             <section id="ip">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="mb-4"><strong>User Rights:</strong> Retains full rights to their code. Provider claims no ownership/license.</p>
              <p className="mb-4"><strong>Provider Rights:</strong> Retains rights to Ecosystem code/algorithms. User gets non-exclusive, non-transferable license.</p>
              <p className="mb-4"><strong>Restrictions:</strong> No reverse engineering, distribution, or reselling.</p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">Provided "AS IS". Provider not liable for user-side problems, scan accuracy (false positives/negatives), or indirect damages. Liability limited to amount paid in preceding 12 months.</p>
            </section>

            <section id="termination">
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="mb-4">User can cancel anytime. Provider can terminate for breach (14 days to remedy). Upon termination, access to updates ceases; local components remain but stop updating.</p>
            </section>

            <section id="acceptable-use">
              <h2 className="text-2xl font-semibold mb-4">10. Acceptable Use</h2>
              <p className="mb-4">Permitted: Development, Analysis, Training. Prohibited: Reverse engineering, Distribution to third parties, Illegal use, Malware development.</p>
            </section>

            <section id="compliance">
              <h2 className="text-2xl font-semibold mb-4">11. Compliance</h2>
              <p className="mb-4">Compliance with Export Control (Sanctions). GDPR compliance for EU users (SCCs for data transfer). Data Retention as per law.</p>
            </section>

             <section id="law">
              <h2 className="text-2xl font-semibold mb-4">12. Applicable Law and Dispute Resolution</h2>
              <p className="mb-4">Governed by laws of Republic of Kazakhstan. Disputes resolved via negotiation or arbitration (Astana). EU consumers have rights to local courts.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
              <p className="mb-4">Provider may change terms. Material changes notified 30 days in advance.</p>
            </section>

            <section id="misc">
              <h2 className="text-2xl font-semibold mb-4">14. Miscellaneous</h2>
              <p className="mb-4">Severability, Waiver of Rights, Independent Contractors.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
              <p className="mb-4">Email: info@silence.codes</p>
            </section>

            <section id="download">
              <h2 className="text-2xl font-semibold mb-4">Full Terms of Service</h2>
              <p className="mb-4">
                The detailed Terms of Service for SLNC-env are available for download below.
              </p>
              <a 
                href="/docs/Terms_of_Service_SLNC_env.docx" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                download
              >
                Download Full Terms of Service (DOCX)
              </a>
            </section>
          </div>
        </main>
      </div>
      <BackToTopButton />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default TermsOfServiceSLNC;
