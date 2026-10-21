import DefaultLayout from "@/components/templates/DefaultLayout";
import Hero from "@/components/organisms/Hero";
import Card from "@/components/molecules/Card";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import SpatialHero from "@/components/organisms/SpatialHero";
import HeroHomepage from "@/components/organisms/HeroHomepage";
import AboutSection from "@/components/organisms/AboutSection";

export default function Home() {
  return (
    <DefaultLayout>
      <HeroHomepage />
      <AboutSection />
      <Hero />
      <SpatialHero />
    </DefaultLayout>
  );
}
