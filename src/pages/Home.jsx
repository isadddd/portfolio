import DefaultLayout from "@/components/templates/DefaultLayout";
import Hero from "@/components/organisms/Hero";
import Card from "@/components/molecules/Card";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";
import SpatialHero from "@/components/organisms/SpatialHero";
import HeroHomepage from "@/components/organisms/HeroHomepage";

export default function Home() {
  const features = [
    {
      title: "React",
      desc: "Building interactive UIs with the latest React 19 features.",
    },
    {
      title: "Tailwind CSS",
      desc: "Utility-first CSS for rapid and consistent styling.",
    },
    {
      title: "Vite",
      desc: "Fast dev server and optimized production builds.",
    },
  ];

  return (
    <DefaultLayout>
      <HeroHomepage />
      <Hero />
      <SpatialHero />
    </DefaultLayout>
  );
}