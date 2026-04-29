type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export const SectionHeader = ({ eyebrow, title, copy }: SectionHeaderProps) => (
  <div className="section-header" data-reveal>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {copy ? <p>{copy}</p> : null}
  </div>
);
