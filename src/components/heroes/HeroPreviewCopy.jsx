function formatSkillName(skillId) {
  return skillId.replace(/-/g, ' ');
}

export const HERO_PREVIEW_TITLE = 'This Is How Your Project Could Look Like';

export function getHeroPreviewSubtitle(skillId) {
  return `This page is running the ${formatSkillName(skillId)} system. Copy and paste the command in your project chat to apply it in your project.`;
}

function HeroPreviewCopy({ resolvedSkillId }) {
  return (
    <>
      <h1 className="hero-headline">{HERO_PREVIEW_TITLE}</h1>
      <p className="hero-subheadline">{getHeroPreviewSubtitle(resolvedSkillId)}</p>
    </>
  );
}

export default HeroPreviewCopy;
