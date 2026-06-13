import MockNexusDashboard from '@/components/heroes/mock/MockNexusDashboard';
import MockMarketeamLanding from '@/components/heroes/mock/MockMarketeamLanding';
import MockBrowserChrome from '@/components/heroes/mock/MockBrowserChrome';
import MockProjectTile from '@/components/heroes/mock/MockProjectTile';

function BrandLandingMock() {
  return (
    <div className="brand-hero-media brand-hero-media--landing">
      <MockMarketeamLanding />
    </div>
  );
}

function BrandSaasMock() {
  return (
    <div className="brand-hero-media brand-hero-media--saas">
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
  );
}

function BrandPortfolioMock() {
  return (
    <div className="brand-hero-media brand-hero-media--portfolio">
      <div className="mock-portfolio-grid">
        <MockProjectTile title="Finance dashboard" category="Product design" featured />
        <MockProjectTile title="Brand refresh" category="Identity" />
        <MockProjectTile title="Mobile app" category="UI / UX" />
      </div>
    </div>
  );
}

function BrandDashboardMock() {
  return (
    <div className="brand-hero-media brand-hero-media--dashboard">
      <MockNexusDashboard />
    </div>
  );
}

const brandHeroMediaByType = {
  dashboard: BrandDashboardMock,
  landing: BrandLandingMock,
  saas: BrandSaasMock,
  portfolio: BrandPortfolioMock,
};

function BrandHeroMedia({ heroType }) {
  const MediaComponent = brandHeroMediaByType[heroType] ?? BrandDashboardMock;

  return (
    <div className="brand-hero-media-wrap" key={heroType}>
      <MediaComponent />
    </div>
  );
}

export default BrandHeroMedia;
