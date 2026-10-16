import DefaultLayout from "@/components/templates/DefaultLayout";
import Hero from "@/components/organisms/Hero";
import Card from "@/components/molecules/Card";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

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
      <Hero />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Text as="h2" weight="bold" className="text-3xl sm:text-4xl text-black mb-4">
              What I do
            </Text>
            <Text as="p" className="text-lg text-black/70 max-w-2xl mx-auto">
              I create digital experiences that are functional, accessible, and
              enjoyable to use.
            </Text>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} hover>
                <Text as="h3" weight="semibold" className="text-xl text-black mb-3">
                  {feature.title}
                </Text>
                <Text as="p" className="text-black/60 leading-relaxed">
                  {feature.desc}
                </Text>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="mx-auto max-w-3xl text-center">
          <Text as="h2" weight="bold" className="text-3xl sm:text-4xl text-black mb-6">
            Ready to work together?
          </Text>
          <Button variant="secondary" size="lg" className="mx-auto">
            Let&apos;s Talk
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}