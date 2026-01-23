'use client';

import { usePathname } from 'next/navigation';
import Footer from "@/components/Footer";
import ParallaxGlobe from "@/components/ParallaxGlobe";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CookieConsent from "@/components/CookieConsent";

export default function LayoutWrapper({ children, initialLanguage }) {
  const pathname = usePathname();
  const isPolicyPage = pathname.startsWith('/policies');
  const isAffiliatePage = pathname.startsWith('/affiliate');
  const isServicesPage = pathname.startsWith('/services') || pathname.startsWith('/developer-services');
  // Old homepage content is now moved to /ai-soc
  const isProductPage = pathname === '/ai-soc';

  // Restrict globe to the product page only (was main page)
  const showParallaxGlobe = isProductPage;

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      {showParallaxGlobe && <ParallaxGlobe />}
      <div className={!isPolicyPage ? "default-content-wrapper pt-20 overflow-x-hidden" : "default-content-wrapper overflow-x-hidden"}>
        {children}
      </div>
      <div className={isPolicyPage ? "bg-black overflow-x-hidden" : "relative w-full overflow-x-hidden"}>
        {!isPolicyPage && (
          <div className="absolute inset-0 -z-10 layout-background">
            <img
              src="/moonrise.webp"
              alt="Moonrise"
              className="w-full h-full object-cover object-bottom layout-background-image"
            />
          </div>
        )}
        <Footer />
      </div>
      <CookieConsent />
    </LanguageProvider>
  );
}
