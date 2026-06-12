import CopyCommand from '../ui/CopyCommand';

function formatSkillName(skillId) {
  return skillId.replace(/-/g, ' ');
}

function HeroPreviewHeader({ resolvedSkillId, installCommand }) {
  return (
    <div className="hero-preview-header">
      <p className="hero-eyebrow">Previewing {formatSkillName(resolvedSkillId)}</p>
      <div className="hero-preview-command">
        <CopyCommand command={installCommand} size="lg" />
      </div>
    </div>
  );
}

export default HeroPreviewHeader;
