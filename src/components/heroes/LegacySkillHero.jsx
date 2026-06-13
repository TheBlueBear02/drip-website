import CopyCommand from '@/components/ui/CopyCommand';

function formatSkillName(skillId) {
  return skillId.replace(/-/g, ' ');
}

/**
 * Preserved legacy skill hero — centered "See how your app could look" layout.
 * Not wired by default; swap in via heroTypes registry for comparison.
 */
function LegacySkillHero({ resolvedSkillId, installCommand }) {
  return (
    <div className="hero-content hero-content--centered">
      <p className="hero-eyebrow">Previewing {formatSkillName(resolvedSkillId)}</p>
      <h1 className="hero-headline">See how your app could look.</h1>
      <p className="hero-subheadline">
        This page is running the {formatSkillName(resolvedSkillId)} design system.
        Copy the command to apply it in your project.
      </p>
      <div className="hero-cta-group">
        <div className="hero-command">
          <CopyCommand command={installCommand} size="lg" />
        </div>
      </div>
    </div>
  );
}

export default LegacySkillHero;
