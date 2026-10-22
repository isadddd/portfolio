import DefaultLayout from "@/components/templates/DefaultLayout";
import HeroHomepage from "@/components/organisms/HeroHomepage";
import AboutSection from "@/components/organisms/AboutSection";
import WorksSection from "@/components/organisms/WorksSection";

export default function Home() {
  return (
    <DefaultLayout>
      <HeroHomepage />
      <AboutSection />
      <WorksSection />
    </DefaultLayout>
  );
}
