import { usePathname } from "react-router-dom";

export default function NavLink({
  to,
  children,
  className = "",
  activeClass = "text-primary font-semibold",
  inactiveClass = "text-black/70 hover:text-primary transition-colors",
  ...props
}) {
  // Fallback jika react-router belum terpasang: render sebagai <a> biasa
  const isActive = false;

  return (
    <a
      href={to}
      className={`px-3 py-2 rounded-md text-sm font-heading ${isActive ? activeClass : inactiveClass} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}