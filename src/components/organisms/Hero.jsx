import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import Text from "../atoms/Text";

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white" data-theme="light">
      {/* Decorative bg circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px] -z-10" />

      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="outline">Available</Badge>
          <Badge variant="secondary">Open for Work</Badge>
        </div>

        <Text
          as="h1"
          weight="bold"
          className="text-5xl sm:text-7xl lg:text-8xl tracking-tight text-black mb-6 leading-[1.1]"
        >
          Hello, I&apos;m{" "}
          <span className="text-primary">Your Name.</span>
        </Text>

        <Text
          as="p"
          className="text-lg sm:text-xl text-black/70 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          I build digital products with React and Tailwind CSS. Currently
          available for freelance and full-time opportunities.
        </Text>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg">
            View My Work
          </Button>
          <Button variant="outline" size="lg">
            Contact Me
          </Button>
        </div>

        {/* Optional: placeholder for hero image */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-md aspect-square rounded-2xl border border-black/10 bg-secondary flex items-center justify-center">
            <Text as="span" className="text-black/40 text-lg">
              Your Photo / Work Here
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}