"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
import PolicyNotice from '@/components/PolicyNotice';

const TermsOfUseSLNC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const sections = [
    { id: 'general', title: '1. General Provisions' },
    { id: 'access', title: '2. Access and License' },
    { id: 'confidentiality', title: '3. Confidentiality and Data' },
    { id: 'responsibilities', title: '4. User Responsibilities' },
    { id: 'subscription', title: '5. Subscription and Payment' },
    { id: 'liability', title: '6. Liability and Audit' },
    { id: 'contact', title: '7. Contacts' },
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
          <h2 className="text-2xl text-gray-400 mb-8">Terms of Use</h2>
          <div className="space-y-8">
            <section id="general">
              <h2 className="text-2xl font-semibold mb-4">1. General Provisions</h2>
              <p className="mb-4"><strong>1. Subject Matter:</strong> Governing access to Silence Environment (Ollama + LLM, SLNC-Code, SitHub).</p>
              <p className="mb-4"><strong>2. Parties:</strong> Silence AI (Provider) and User.</p>
              <p className="mb-4"><strong>3. Acceptance:</strong> Use/Installation/Subscription constitutes acceptance.</p>
            </section>

            <section id="access">
              <h2 className="text-2xl font-semibold mb-4">2. Access and License</h2>
              <p className="mb-4"><strong>1. License:</strong> Limited, non-exclusive, non-transferable license for annual subscription on local infrastructure.</p>
              <p className="mb-4"><strong>2. Restrictions:</strong> Use for intended purpose only. No extraction/transfer of code.</p>
              <p className="mb-4"><strong>3. Verification:</strong> Periodic license checks via hash/metadata (max once/24h).</p>
            </section>

            <section id="confidentiality">
              <h2 className="text-2xl font-semibold mb-4">3. Confidentiality and Data Processing</h2>
              <p className="mb-4"><strong>1. Principles:</strong> "Privacy by Design". Source code processed locally.</p>
              <p className="mb-4"><strong>2. Data Collected:</strong> Subscription info, license hash, logs, technical metadata. Payment via third parties.</p>
              <p className="mb-4"><strong>3. Telemetry:</strong> Optional, requires consent, anonymized.</p>
              <p className="mb-4"><strong>4. Retention:</strong> Logs (90 days), Subscription (Term + 1 year), Payment (7 years).</p>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities and Security</h2>
              <p className="mb-4"><strong>1. Infrastructure:</strong> User ensures security, backups, updates, firewall.</p>
              <p className="mb-4"><strong>2. Updates:</strong> User configures SitHub for updates.</p>
              <p className="mb-4"><strong>3. Liability:</strong> Provider not liable for leaks due to user configuration/actions.</p>
            </section>

             <section id="subscription">
              <h2 className="text-2xl font-semibold mb-4">5. Subscription, Payment, and Refunds</h2>
              <p className="mb-4"><strong>1. Model:</strong> Annual subscription.</p>
              <p className="mb-4"><strong>2. Payment:</strong> Advance payment, auto-renewal.</p>
              <p className="mb-4"><strong>3. Refunds:</strong> Generally no refunds unless critical failure (&gt;7 days) or breach by Provider. EU 14-day withdrawal rights apply.</p>
              <p className="mb-4"><strong>4. Reorganization:</strong> Transfer possible with notice.</p>
            </section>

            <section id="liability">
              <h2 className="text-2xl font-semibold mb-4">6. Liability, Audit, and Contacts</h2>
              <p className="mb-4"><strong>1. Warranties:</strong> Architectural impossibility of code transmission guaranteed. No liability for indirect damages.</p>
              <p className="mb-4"><strong>2. Audit:</strong> Provider conducts annual audits. User can audit own traffic.</p>
               <p className="mb-4"><strong>3. Incidents:</strong> Notification within legal timeframes (72h).</p>
              <p className="mb-4"><strong>4. Termination:</strong> For violation/non-payment.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">7. Contacts</h2>
              <p className="mb-4">Email: info@silence.codes</p>
            </section>

            <section id="download">
              <h2 className="text-2xl font-semibold mb-4">Full Terms of Use</h2>
              <p className="mb-4">
                The detailed Terms of Use for SLNC-env are available for download below.
              </p>
              <a 
                href="/docs/Terms_of_Use_SLNC_env.docx" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                download
              >
                Download Full Terms of Use (DOCX)
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

export default TermsOfUseSLNC;
