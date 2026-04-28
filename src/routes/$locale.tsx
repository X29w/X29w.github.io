import { createFileRoute, redirect } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LOCALES, LOCALE_STORAGE_KEY } from "@/utils/config/locale-match";
import NavigationBar from "@/components/feature/navigation-bar";
import AboutSection from "@/components/feature/about-section";
import ContactSection from "@/components/feature/contact-section";
import Footer from "@/components/feature/footer";
import HeroSection from "@/components/feature/hero-section";
import ProjectsSection from "@/components/feature/projects-section";
import { usePerformanceTier } from "@/utils/common/use-performance-tier";

// Defer non-critical visual effects
const FloatingParticles = lazy(
  () =>
    import("@/components/common/floating-particles").then((m) => ({
      default: m.FloatingParticles,
    }))
);
const CursorEffect = lazy(
  () =>
    import("@/components/common/cursor-effect").then((m) => ({
      default: m.CursorEffect,
    }))
);

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

  const tier = usePerformanceTier();

  return (
    <div className="relative overflow-x-clip">
      {tier !== "low" && (
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <CursorEffect />
      </Suspense>
      <NavigationBar locale={locale} />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
