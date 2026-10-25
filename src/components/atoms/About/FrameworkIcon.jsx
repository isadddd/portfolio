const FrameworkIcon = ({ name, src, srcBnw, shadowColor }) => (
  <div className="relative transition duration-300 group-hover:scale-110">
    {/* Versi hitam-putih: in-flow, menentukan ukuran */}
    <img src={srcBnw} alt={name} draggable={false} className="block h-auto w-full select-none transition-opacity duration-300 group-hover:opacity-0" />
    {/* Versi warna: menumpuk di atas, dekoratif */}
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="absolute inset-0 block h-full w-full select-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={shadowColor ? { filter: `drop-shadow(0 0 10px ${shadowColor})` } : undefined}
    />
  </div>
);

export default FrameworkIcon;
