export default function Card({
  children,
  className = "",
  padded = true,
  hover = false,
  ...props
}) {
  return (
    <div
      className={`rounded-xl border border-black/10 bg-white shadow-sm transition-all duration-200 ${hover ? "hover:shadow-md hover:border-primary" : ""} ${padded ? "p-6" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}