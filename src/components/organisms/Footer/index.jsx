import React from "react";

import ImageFooter from "@/assets/footer.svg";

// Sama seperti links di Header dropdown
const menuLinks = [
  { href: "#about", label: "about" },
  { href: "#work", label: "works" },
  { href: "#services", label: "services" },
];

const socialLinks = [
  { href: "https://linkedin.com/in/username", label: "linkedin" },
  { href: "https://instagram.com/username", label: "instagram" },
  { href: "https://wa.me/62xxxxxxxxxx", label: "whatsapp" },
  { href: "mailto:you@email.com", label: "e-mail" },
];

// Icon panah yang muncul saat hover, sama seperti di dropdown header
const PlayIcon = () => (
  <svg
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M10.5 6.0625L0 12.1247V0.000322342L10.5 6.0625Z"
      fill="currentColor"
    />
  </svg>
);

const FooterLink = ({ href, label }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    className="group flex items-center gap-2 text-[clamp(16px,1.6vw,20px)] font-medium text-secondary hover:text-primary duration-200 transition"
  >
    <span className="text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      <PlayIcon />
    </span>
    [ {label} ]
  </a>
);

const FooterSection = () => {
  return (
    <footer id="footer" data-theme="dark" className="relative z-10 bg-black">
      {/* Menu: jarak atas 80px, kanan kiri 50px */}
      <div className="flex gap-10 pt-16 md:pt-20 px-4 justify-end md:gap-[100px] md:px-[50px]">
        <nav className="flex flex-col gap-2 md:gap-5 items-end">
          {menuLinks.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
        </nav>
        <nav className="flex flex-col gap-2 md:gap-5 items-end">
          {socialLinks.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
        </nav>
      </div>

      {/* Teks besar, full width tanpa padding, sengaja terpotong di kiri-kanan */}
      <div className="mt-16 w-full overflow-hidden md:mt-24">
        <img src={ImageFooter} className="w-full" />
      </div>

      {/* Copyright */}
      <div className="flex h-16 md:h-20 items-center md:justify-center px-4">
        <p className="font-heading text-[clamp(16px,1.6vw,20px)] font-bold text-secondary">
          ©2026
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
