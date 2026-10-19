import { useState, useEffect, useRef } from "react";

import Icon from "@/assets/icon.svg";

import useWibTime from "@/hooks/useWibTime";

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
    <nav className="sticky top-0 z-50">
      <div className="w-full px-4 py-6">
        <div className="flex items-center justify-between">
          <img src={Icon} alt="Icon Header" />
          <div className="flex items-center gap-6 relative" ref={menuRef}>
            <p className="text-18 hidden md:block">{wibTime} SOLO, ID</p>
            <div className="relative">
              <p
                className="cursor-pointer text-18"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                MENU
              </p>
              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-dark z-50">
                  <ul>
                    {links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="flex px-4 py-2 text-18 bg-black text-primary hover:text-secondary transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="w-5 h-px bg-white hidden md:block"></div>
            <p className="text-18 cursor-pointer hidden md:block">CONTACT ME</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
