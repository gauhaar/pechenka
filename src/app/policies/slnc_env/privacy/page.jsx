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
    { id: 'download', title: 'Download Policy' },
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
          <h1 className="text-4xl font-bold mb-8">Privacy Policy SLNC-env</h1>
          <div className="space-y-8">
            <section id="download">
              <h2 className="text-2xl font-semibold mb-4">Policy Document</h2>
              <p className="mb-4">
                The content for the Privacy Policy SLNC-env is available for download.
              </p>
              <a 
                href="/docs/Privacy_Policy_SLNC_env.docx" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                download
              >
                Download Privacy Policy (DOCX)
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
