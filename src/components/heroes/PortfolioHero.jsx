import HeroPreviewHeader from './HeroPreviewHeader';
import HeroPreviewCopy from './HeroPreviewCopy';
import MockProjectTile from './mock/MockProjectTile';

function PortfolioHero({ resolvedSkillId, installCommand }) {
  return (
    <div className="hero-preview-layout hero-preview-layout--split">
      <HeroPreviewHeader resolvedSkillId={resolvedSkillId} installCommand={installCommand} />

      <div className="hero-preview-split">
        <div className="hero-preview-copy">
          <HeroPreviewCopy resolvedSkillId={resolvedSkillId} />
        </div>

        <div className="hero-preview-media">
          <div className="mock-portfolio-grid" aria-hidden="true">
            <MockProjectTile title="Finance dashboard" category="Product design" featured />
            <MockProjectTile title="Brand refresh" category="Identity" />
            <MockProjectTile title="Mobile app" category="UI / UX" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioHero;
