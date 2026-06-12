function SkillHeroShell({ resolvedSkillId, heroType, children }) {
  const isPlayfulGeometric = resolvedSkillId === 'playful-geometric';
  const isClayPremium = resolvedSkillId === 'clay-premium';
  const isNeoBrutalism = resolvedSkillId === 'neo-brutalism';
  const isHandDrawn = resolvedSkillId === 'hand-drawn';
  const usesCard = isPlayfulGeometric || isNeoBrutalism || isHandDrawn;

  const sectionClass = [
    'hero',
    isPlayfulGeometric ? 'hero--playful-geometric' : '',
    isClayPremium ? 'hero--clay-premium' : '',
    isNeoBrutalism ? 'hero--neo-brutalism' : '',
    isHandDrawn ? 'hero--hand-drawn' : '',
    heroType ? `hero-preview--${heroType}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id="home" className={sectionClass}>
      {isClayPremium && (
        <div className="hero-blobs" aria-hidden="true">
          <div className="hero-blob hero-blob--1" />
          <div className="hero-blob hero-blob--2" />
          <div className="hero-blob hero-blob--3" />
          <div className="hero-blob hero-blob--4" />
        </div>
      )}
      {isPlayfulGeometric && (
        <div className="hero-shapes" aria-hidden="true">
          <div className="hero-shape hero-shape--circle hero-shape--1" />
          <div className="hero-shape hero-shape--circle hero-shape--2" />
          <div className="hero-shape hero-shape--circle hero-shape--3" />
          <div className="hero-shape hero-shape--triangle hero-shape--4" />
          <div className="hero-shape hero-shape--triangle hero-shape--5" />
          <div className="hero-shape hero-shape--dot hero-shape--6" />
          <div className="hero-shape hero-shape--dot hero-shape--7" />
          <div className="hero-shape hero-shape--dot hero-shape--8" />
        </div>
      )}

      {!isPlayfulGeometric && !isClayPremium && !isNeoBrutalism && !isHandDrawn && (
        <div className="hero-background" />
      )}

      <div className="container">
        {usesCard ? (
          <div className="hero-card">
            <div className="hero-content hero-preview-content">{children}</div>
          </div>
        ) : (
          <div className="hero-content hero-preview-content">{children}</div>
        )}
      </div>
    </section>
  );
}

export default SkillHeroShell;
