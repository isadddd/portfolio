export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-heading transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    secondary:
      "bg-secondary text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
    outline:
      "border-2 border-black text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black",
    ghost:
      "text-black hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}