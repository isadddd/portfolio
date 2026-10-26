import DefaultLayout from "@/components/templates/DefaultLayout";
import HeroHomepage from "@/components/organisms/HeroSection";
import AboutSection from "@/components/organisms/AboutSection";
import WorksSection from "@/components/organisms/WorksSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import CtaSection from "@/components/organisms/CtaSection";

export default function Home() {
  return (
    <DefaultLayout>
      <HeroHomepage />
      <AboutSection />
      <WorksSection />
      <ServicesSection />
      <CtaSection/>
    </DefaultLayout>
  );
}
