import ButtonLink from "@/components/atoms/ButtonLink";

const ROWS = [
  ["type", "type"],
  ["role", "role"],
  ["at", "at"],
  ["built on", "builtOn"],
];

const Mark = ({ children }) => <span className="bg-secondary px-1 text-black">{children}</span>;

const WorkMeta = ({ work }) => (
  <div className="font-mono text-[14px]">
    <dl className="grid grid-cols-[84px_1fr]">
      {ROWS.map(([label, key]) => (
        <div key={key} className="contents">
          <dt>{label}:</dt>
          <dd>
            <Mark>{work[key]}</Mark>
          </dd>
        </div>
      ))}
    </dl>
    <p className="mt-2 line-clamp-3">{work.excerpt}</p>
    <div className="mt-4 block md:hidden">
      <ButtonLink href={`/works/${work.slug}`}>view project</ButtonLink>
    </div>
  </div>
);

export default WorkMeta;
