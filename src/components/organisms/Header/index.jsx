import { useState, useEffect, useRef } from "react";
import ScrambleText from "@/components/atoms/ScrambleText";

import Icon from "@/assets/icon.svg";

import useWibTime from "@/hooks/useWibTime";
import useHeaderTheme from "@/hooks/useHeaderTheme";

// Class harus ditulis lengkap, jangan pakai template string.
// Key-nya harus sama dengan nilai data-theme di section.
const themes = {
  dark: {
    text: "text-secondary",
    line: "bg-secondary",
    text_dropdown: "text-primary",
    text_dropdown_hover: "hover:text-black",
  },
  light: {
    text: "text-black",
    line: "bg-black",
    text_dropdown: "text-secondary",
    text_dropdown_hover: "hover:text-primary",
  },
  accent: {
    text: "text-primary",
    line: "bg-primary",
    text_dropdown: "text-secondary",
    text_dropdown_hover: "hover:text-black",
  },
};

const links = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const wibTime = useWibTime();
  const { theme, label } = useHeaderTheme();
  const t = themes[theme] ?? themes.dark;

  // Tutup dropdown saat klik di luar area menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${t.text}`}>
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Kiri: logo + label section aktif (dari data-label) */}
          <div className="flex items-center gap-6">
            <img src={Icon} alt="Icon Header" />
            {label && (
              <div className="flex items-center gap-3 font-heading text-18 font-bold">
                <span className="h-px w-8 bg-current" />
                <ScrambleText key={label} text={label} duration={1800} italicSpacing="-0.1em" autoPlay />
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 relative" ref={menuRef}>
            <p className="text-18 hidden md:block">{wibTime} SOLO, ID</p>
            <div className="relative">
              <p className="cursor-pointer text-18" onClick={() => setIsOpen((prev) => !prev)}>
                <ScrambleText text="MENU" />
              </p>
              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-dark z-50">
                  <ul>
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className={`group flex items-center gap-2 justify-end px-4 py-2 text-18 ${t.line} text-end ${t.text_dropdown} ${t.text_dropdown_hover} transition-colors duration-200`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.5 6.0625L0 12.1247V0.000322342L10.5 6.0625Z" fill="currentColor" />
                            </svg>
                          </span>
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={`w-5 h-px hidden md:block ${t.line}`}></div>
            <p className="text-18 cursor-pointer hidden md:block">
              <ScrambleText text="CONTACT ME" />
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
