import HeroPreviewHeader from './HeroPreviewHeader';
import HeroPreviewCopy from './HeroPreviewCopy';
import MockBrowserChrome from './mock/MockBrowserChrome';

function SaasSiteHero({ resolvedSkillId, installCommand }) {
  return (
    <div className="hero-preview-layout hero-preview-layout--split">
      <HeroPreviewHeader resolvedSkillId={resolvedSkillId} installCommand={installCommand} />

      <div className="hero-preview-split">
        <div className="hero-preview-copy">
          <HeroPreviewCopy resolvedSkillId={resolvedSkillId} />
          <div className="hero-preview-cta-row">
            <span className="hero-button hero-button--simple">Start free trial</span>
            <span className="hero-button hero-button--secondary">View demo</span>
          </div>
        </div>

        <div className="hero-preview-media">
          <MockBrowserChrome>
            <div className="mock-saas">
              <div className="mock-saas-nav">
                <span className="mock-saas-logo" />
                <span className="mock-saas-nav-link" />
                <span className="mock-saas-nav-link" />
                <span className="mock-saas-nav-cta" />
              </div>
              <div className="mock-saas-hero-metric">
                <span className="mock-saas-metric-value">98.4%</span>
                <span className="mock-saas-metric-label">uptime this month</span>
              </div>
              <div className="mock-saas-features">
                <div className="mock-saas-feature">
                  <span className="mock-saas-feature-icon" />
                  <span className="mock-saas-feature-line" />
                  <span className="mock-saas-feature-line mock-saas-feature-line--short" />
                </div>
                <div className="mock-saas-feature">
                  <span className="mock-saas-feature-icon" />
                  <span className="mock-saas-feature-line" />
                  <span className="mock-saas-feature-line mock-saas-feature-line--short" />
                </div>
                <div className="mock-saas-feature">
                  <span className="mock-saas-feature-icon" />
                  <span className="mock-saas-feature-line" />
                  <span className="mock-saas-feature-line mock-saas-feature-line--short" />
                </div>
              </div>
            </div>
          </MockBrowserChrome>
        </div>
      </div>
    </div>
  );
}

export default SaasSiteHero;
