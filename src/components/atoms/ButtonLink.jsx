import ArrowIcon from "@/components/atoms/Works/ArrowIcon";

const ButtonLink = ({ href, children }) => (
  <a href={href} className="group inline-flex items-center gap-2 bg-secondary px-4 py-2.5 font-mono text-[14px] leading-none text-black transition-colors duration-300 hover:bg-primary hover:text-secondary">
    {children}
    <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
  </a>
);

export default ButtonLink;
