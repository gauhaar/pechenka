import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = t("footer.copyright", `© ${year} Silence AI. All rights reserved.`).replace(
    "{year}",
    year
  );

  return (
    <footer className="bg-transparent text-white pt-20 pb-8 sm:pt-32 md:pt-60 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Image src="/logo.svg" alt="Silence AI Logo" width={140} height={40} />
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center text-gray-400 text-center md:text-left">
            <div>
              <span className="font-semibold text-white">{t("footer.contactLabel", "Contact:")}</span>{" "}
              {t("footer.contactValue", "info@silenceai.net")}
            </div>
            <div>
              <span className="font-semibold text-white">{t("footer.addressLabel", "Address:")}</span>{" "}
              {t("footer.addressValue", "Almaty, Kazakhstan")}
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0 text-center sm:text-left">{copyright}</p>
          <div className="flex flex-col items-center sm:items-end space-y-2">
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 items-center text-gray-400 text-sm">
               <a href="/policies/cookies" className="hover:text-white transition-colors duration-300">
                {t("footer.links.cookies", "Cookies Policy")}
              </a>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 items-center text-gray-400 text-xs sm:text-sm">
              <span className="text-gray-500 text-xs uppercase tracking-wider">AI-SOC 1:</span>
              <a href="/policies/terms_of_use" className="hover:text-white transition-colors duration-300">
                {t("footer.links.termsUse", "Terms of Use")}
              </a>
              <a href="/policies/terms_of_service" className="hover:text-white transition-colors duration-300">
                {t("footer.links.termsService", "Terms of Service")}
              </a>
              <a href="/policies/privacy" className="hover:text-white transition-colors duration-300">
                {t("footer.links.privacy", "Privacy Policy")}
              </a>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 items-center text-gray-400 text-xs sm:text-sm">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Sithub:</span>
              <a href="/policies/sithub/terms_of_use" className="hover:text-white transition-colors duration-300">
                {t("footer.links.termsUse", "Terms of Use")}
              </a>
              <a href="/policies/sithub/terms_of_service" className="hover:text-white transition-colors duration-300">
                {t("footer.links.termsService", "Terms of Service")}
              </a>
              <a href="/policies/sithub/privacy" className="hover:text-white transition-colors duration-300">
                {t("footer.links.privacy", "Privacy Policy")}
              </a>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4 items-center text-gray-400 text-xs sm:text-sm">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Supreme:</span>
              <a href="/policies/supreme/terms_of_use" className="hover:text-white transition-colors duration-300">
                {t("footer.links.termsUse", "Terms of Use")}
              </a>
              <a href="/policies/supreme/terms_of_service" className="hover:text-white transition-colors duration-300">
                {t("footer.links.termsService", "Terms of Service")}
              </a>
              <a href="/policies/supreme/privacy" className="hover:text-white transition-colors duration-300">
                {t("footer.links.privacy", "Privacy Policy")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
