import Text from "../atoms/Text";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary" />
            <Text
              as="span"
              weight="semibold"
              className="text-black text-base tracking-tight"
            >
              Portfolio
            </Text>
          </div>

          <div className="flex gap-6 text-sm text-black/60">
            <a href="#" className="hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Twitter
            </a>
          </div>

          <Text as="span" className="text-sm text-black/40">
            {new Date().getFullYear()} Your Name. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}