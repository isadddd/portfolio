export default function Badge({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-black",
    black: "bg-black text-white",
    outline: "border border-black text-black bg-transparent",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-heading ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}