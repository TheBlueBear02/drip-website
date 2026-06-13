import HeroPreviewHeader from './HeroPreviewHeader';
import HeroPreviewCopy from './HeroPreviewCopy';
import MockNexusDashboard from './mock/MockNexusDashboard';

function DashboardHero({ resolvedSkillId, installCommand }) {
  return (
    <div className="hero-preview-layout hero-preview-layout--split hero-preview-layout--dashboard">
      <HeroPreviewHeader resolvedSkillId={resolvedSkillId} installCommand={installCommand} />

      <div className="hero-preview-split">
        <div className="hero-preview-copy">
          <HeroPreviewCopy resolvedSkillId={resolvedSkillId} />
        </div>

        <div className="hero-preview-media">
          <MockNexusDashboard />
        </div>
      </div>
    </div>
  );
}

export default DashboardHero;
