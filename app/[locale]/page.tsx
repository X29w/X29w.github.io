"use client";

import { useParams } from "next/navigation";
import NavigationBar from "@/components/feature/navigation-bar";
import AboutSection from "@/components/feature/about-section";
import ContactSection from "@/components/feature/contact-section";
import Footer from "@/components/feature/footer";
import { CursorEffect } from "@/components/common/cursor-effect";
import { FloatingParticles } from "@/components/common/floating-particles";
import HeroSection from "@/components/feature/hero-section/index";
import ProjectsSection from "@/components/feature/projects-section/index";

/**
 * @description [zh-CN] 作品集页面组件，包含所有主要区块和效果
 * @description [en] Portfolio page component containing all main sections and effects
 * @description [ja] すべてのメインセクションとエフェクトを含むポートフォリオページコンポーネント
 * @description [zh-TW] 作品集頁面元件，包含所有主要區塊和效果
 */
const PortfolioPage = () => {
  const params = useParams<{ locale: string }>();
  const locale = params.locale;

  return (
    <div className="relative overflow-x-clip">
      <FloatingParticles />
      <CursorEffect />
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
};

export default PortfolioPage;
