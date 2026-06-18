import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LOCALES, LOCALE_STORAGE_KEY } from "@/utils/config/locale-match";
import BootSequence from "@/components/common/boot-sequence";
import NavigationBar from "@/components/feature/navigation-bar";
import HeroSection from "@/components/feature/hero-section";
import AboutSection from "@/components/feature/about-section";
import ProjectsSection from "@/components/feature/projects-section";
import CapabilitiesSection from "@/components/feature/capabilities-section";
import ContactSection from "@/components/feature/contact-section";
import Footer from "@/components/feature/footer";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    const { locale } = params;
    if (!LOCALES.includes(locale as (typeof LOCALES)[number])) {
      throw redirect({ to: "/$locale", params: { locale: "en" }, replace: true });
    }
  },
  component: LocalePage,
});

function LocalePage() {
  const { locale } = Route.useParams();
  const { i18n: i18nInstance } = useTranslation();

  // Sync i18next language with route param
  useEffect(() => {
    if (i18nInstance.language !== locale) {
      i18nInstance.changeLanguage(locale);
    }
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore
    }
  }, [locale, i18nInstance]);

  return (
    <div className="scanlines relative overflow-x-clip">
      <BootSequence />
      <NavigationBar locale={locale} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
