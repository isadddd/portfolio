import Text from "../atoms/Text";
import Button from "../atoms/Button"

const links = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Text as="span" weight="bold" className="text-white text-xs">
                P
              </Text>
            </div>
            <Text
              as="span"
              weight="bold"
              className="text-black text-xl tracking-tight"
            >
              Portfolio
            </Text>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-black/70 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}