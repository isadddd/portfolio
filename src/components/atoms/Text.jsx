export default function Text({
  as: Component = "p",
  children,
  className = "",
  weight = "normal",
  italic = false,
  ...props
}) {
  const fontWeights = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  return (
    <Component
      className={`${fontWeights[weight] || fontWeights.normal} ${
        italic ? "italic" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}