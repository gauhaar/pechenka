"use client";
import React, { useState } from 'react';
import Header from '@/components/Header';
import PolicySidebar from '@/components/PolicySidebar';
import BackToTopButton from '@/components/BackToTopButton';
import Modal from '@/components/Modal';
import PolicyNotice from '@/components/PolicyNotice';

const PrivacyPolicySLNC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const sections = [
    { id: 'introduction', title: '1. Introduction and Principles' },
    { id: 'architectural-privacy', title: '2. Architectural Privacy Guarantees' },
    { id: 'information-collection', title: '3. Information We Collect' },
    { id: 'purposes', title: '4. Purposes and Legal Bases' },
    { id: 'storage-security', title: '5. Data Storage and Security' },
    { id: 'transfer-disclosure', title: '6. Data Transfer and Disclosure' },
    { id: 'international', title: '7. International Data Transfers' },
    { id: 'user-rights', title: '8. Data Subject Rights' },
    { id: 'cookies', title: '9. Cookies and Tracking' },
    { id: 'retention', title: '10. Data Retention' },
    { id: 'children', title: '11. Children\'s Privacy' },
    { id: 'responsibilities', title: '12. Your Responsibilities' },
    { id: 'transparency', title: '13. Transparency Report' },
    { id: 'dpa', title: '14. DPA for EU Clients' },
    { id: 'changes', title: '15. Changes to Policy' },
    { id: 'contact', title: '16. Contact Information' },
    { id: 'download', title: 'Download Full Policy' },
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
          <h2 className="text-2xl text-gray-400 mb-8">Privacy Policy</h2>
          <div className="space-y-8">
            <section id="introduction">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction and Principles</h2>
              <p className="mb-4"><strong>1.1 Purpose of this Policy:</strong> This Privacy Policy (hereinafter referred to as the "Policy") describes the principles and practices of data processing when using the Silence Environment Ecosystem. The Policy is an integral part of the Terms of Service and should be read in conjunction with them.</p>
              <p className="mb-4"><strong>1.2 Privacy by Design Principle:</strong> The Ecosystem is built on the architectural principle of data collection minimization. Privacy is not an additional feature - it is a fundamental characteristic of the system architecture.</p>
              <p className="mb-4"><strong>1.3 Applicable Legislation:</strong> This Policy has been developed taking into account: The Law of the Republic of Kazakhstan "On Personal Data and Their Protection", The EU General Data Protection Regulation (GDPR) - for users from the European Union, Other applicable data protection regulations in the User's jurisdiction.</p>
              <p className="mb-4"><strong>1.4 Data Controller and Processor:</strong> For personal data processed in connection with subscriptions, Silence AI is the Data Controller. For data processed in the Ecosystem (your code), you are the Data Controller and we are not a processor as we do not access your development data.</p>
            </section>

            <section id="architectural-privacy">
              <h2 className="text-2xl font-semibold mb-4">2. Architectural Privacy Guarantees</h2>
              <p className="mb-4"><strong>2.1 Core Principle of Data Isolation:</strong> User source code is processed exclusively on the User's local infrastructure. The Ecosystem architecture is designed to prevent the transmission of source code to the Provider's servers.</p>
              <p className="mb-4"><strong>2.2 Technical Implementation of Isolation:</strong></p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Ollama + LLM:</strong> Operates completely autonomously, contains no network data transmission functions, all computations are performed locally.</li>
                <li><strong>SLNC-Code:</strong> Operates completely autonomously, contains no functions for transmitting code to external servers, integrates only with local LLM.</li>
                <li><strong>SitHub:</strong> The only component that communicates with the Provider's servers, transmits only the data specified in section 3.2, the scanning module is isolated from network functions.</li>
              </ul>
              <p className="mb-4"><strong>2.3 What This Means in Practice:</strong> The Provider has no technical ability to access: Source code stored in the Ecosystem, Security scan results, Commit history and code changes, File names and project structure.</p>
            </section>

            <section id="information-collection">
              <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
              <p className="mb-4"><strong>3.1 Subscription Information (Required):</strong> Organization name, contact email, country of registration. License Information: License key hash, subscription dates/status. Payment Information: Processed by third-party processors (we store only method type and last 4 digits).</p>
              <p className="mb-4"><strong>3.2 Technical Data from SitHub (Automatic):</strong> When verifying license/updates: License key hash, cryptographic session token, and Technical Metadata (Timestamp, SitHub version, Installation ID hash, IP address).</p>
              <p className="mb-4"><strong>3.3 Technical Telemetry (Optional):</strong> Only with explicit consent: Usage Information (Frequency of updates), Error Reports (Stack traces WITHOUT source code). Filtered to remove confidential data.</p>
              <p className="mb-4"><strong>3.4 Information We DO NOT Collect:</strong> Source Code (repositories, file contents), Analysis Results (vulnerabilities, reports), Development Metadata (file names, commit history), User Information (developer names, emails), Credentials (passwords, keys).</p>
            </section>

            <section id="purposes">
              <h2 className="text-2xl font-semibold mb-4">4. Purposes and Legal Bases for Processing</h2>
              <p className="mb-4"><strong>4.1 Subscription Management:</strong> Providing access/updates. Basis: Contract performance.</p>
              <p className="mb-4"><strong>4.2 Delivery of Security Updates:</strong> Ensuring up-to-date vulnerability databases. Basis: Contract performance.</p>
              <p className="mb-4"><strong>4.3 Service Quality Improvement:</strong> Development of security databases. Basis: Consent (for telemetry).</p>
              <p className="mb-4"><strong>4.4 Legal Compliance:</strong> Fulfilling obligations (tax/accounting). Basis: Legal obligation.</p>
              <p className="mb-4"><strong>4.5 Abuse Prevention:</strong> Fraud prevention. Basis: Legitimate interests.</p>
            </section>

             <section id="storage-security">
              <h2 className="text-2xl font-semibold mb-4">5. Data Storage and Security</h2>
              <p className="mb-4"><strong>5.1 Data Stored by Provider:</strong> Subscription info, Payment records (7 years), License key hashes, Request logs (90 days). Location: Republic of Kazakhstan.</p>
              <p className="mb-4"><strong>5.2 Data Stored on User Infrastructure:</strong> All source code, scan results, commit history. User ensures storage/backup.</p>
              <p className="mb-4"><strong>5.3 Technical Security Measures:</strong> Encryption (AES-256 at rest, TLS 1.3 in transit, Bcrypt for keys), Access Control (MFA, least privilege), Network Security (Firewalls, IDS/IPS, DDoS protection).</p>
              <p className="mb-4"><strong>5.5 Incident Notification:</strong> Providing notification within 72 hours of discovery.</p>
            </section>

            <section id="transfer-disclosure">
              <h2 className="text-2xl font-semibold mb-4">6. Data Transfer and Disclosure</h2>
              <p className="mb-4"><strong>6.1 Internal Use:</strong> Access limited to employees with confidentiality agreements (Admins, Support, Accounting).</p>
              <p className="mb-4"><strong>6.2 Third-Party Data Processors:</strong> Payment Processors (e.g., Stripe, PayPal), Hosting Providers, Monitoring Services. All sign DPAs.</p>
              <p className="mb-4"><strong>6.3 Transfers to Law Enforcement:</strong> Only when required by law/court order. We cannot provide source code as we do not have it.</p>
            </section>

            <section id="international">
              <h2 className="text-2xl font-semibold mb-4">7. International Data Transfers</h2>
              <p className="mb-4"><strong>7.1 Server Location:</strong> Main Servers: Republic of Kazakhstan.</p>
              <p className="mb-4"><strong>7.2 Transfers from EU:</strong> We use Standard Contractual Clauses (SCC) approved by the EU Commission.</p>
              <p className="mb-4"><strong>7.3 What Is Transferred:</strong> Subscription info, Update requests. NOT transferred: Source code, Scan results.</p>
            </section>

            <section id="user-rights">
              <h2 className="text-2xl font-semibold mb-4">8. Data Subject Rights</h2>
              <p className="mb-4">Applicable to all users (basic rights) and EU users (GDPR). Rights include: Access, Rectification, Erasure ("Right to be Forgotten"), Restriction of Processing, Data Portability, Objection, Withdrawal of Consent.</p>
              <p className="mb-4">Process: Send request to info@silence.codes. Response times: 30 days (GDPR) or 15 days (Kazakhstan).</p>
            </section>

            <section id="cookies">
              <h2 className="text-2xl font-semibold mb-4">9. Cookies and Tracking Technologies</h2>
              <p className="mb-4"><strong>9.1 Usage:</strong> Strictly Necessary (Auth, Language, Security), Analytics (Optional, anonymized). No third-party tracking or advertising cookies.</p>
            </section>

            <section id="retention">
              <h2 className="text-2xl font-semibold mb-4">10. Data Retention</h2>
              <p className="mb-4">Subscription info/Keys: Duration + 1 year. Payment records: 7 years. Logs: 90 days. Telemetry: 1 year. Error reports: 2 years. Automatic deletion after expiration.</p>
            </section>

            <section id="children">
              <h2 className="text-2xl font-semibold mb-4">11. Children's Privacy</h2>
              <p className="mb-4">Not intended for under 18s. 16-18 requires parental consent. We do not knowingly collect data from under 16s.</p>
            </section>

            <section id="responsibilities">
              <h2 className="text-2xl font-semibold mb-4">12. Your Data Protection Responsibilities</h2>
              <p className="mb-4">You are responsible for Infrastructure Security (Firewalls, Updates), Preventing Manual Data Transmission, User Management. Provider is not liable for user-caused breaches.</p>
            </section>

             <section id="transparency">
              <h2 className="text-2xl font-semibold mb-4">13. Transparency Report</h2>
              <p className="mb-4">Provider is committed to transparency regarding law enforcement requests and security incidents. Notifications provided within 72 hours for incidents.</p>
            </section>

            <section id="dpa">
              <h2 className="text-2xl font-semibold mb-4">14. Data Processing Agreement (DPA)</h2>
              <p className="mb-4">Available for corporate clients from the EU. Includes SCCs. Request at info@silence.codes.</p>
            </section>

            <section id="changes">
              <h2 className="text-2xl font-semibold mb-4">15. Changes to the Privacy Policy</h2>
              <p className="mb-4">Provider may change this policy. Material changes notified 30 days in advance via email/interface. Continued use implies agreement.</p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
              <p className="mb-4">Email: info@silence.codes</p>
            </section>

            <section id="download">
              <h2 className="text-2xl font-semibold mb-4">Download Full Policy Document</h2>
              <p className="mb-4">
                The detailed Privacy Policy for SLNC-env is available for download below.
              </p>
              <a 
                href="/docs/Privacy_Policy_SLNC_env.docx" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                download
              >
                Download Full Privacy Policy (DOCX)
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

export default PrivacyPolicySLNC;
