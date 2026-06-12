import HeroPreviewHeader from './HeroPreviewHeader';
import HeroPreviewCopy from './HeroPreviewCopy';

const LOGOS = ['Acme', 'Nova', 'Orbit', 'Pulse', 'Vertex'];

function LandingPageHero({ resolvedSkillId, installCommand }) {
  return (
    <div className="hero-preview-layout hero-preview-layout--centered">
      <HeroPreviewHeader resolvedSkillId={resolvedSkillId} installCommand={installCommand} />

      <div className="hero-preview-centered">
        <HeroPreviewCopy resolvedSkillId={resolvedSkillId} />
        <div className="hero-preview-cta-row hero-preview-cta-row--centered">
          <span className="hero-button hero-button--simple">Get started</span>
          <span className="hero-button hero-button--secondary">See examples</span>
        </div>

        <div className="mock-landing-visual" aria-hidden="true">
          <div className="mock-landing-hero-block">
            <div className="mock-landing-hero-line mock-landing-hero-line--title" />
            <div className="mock-landing-hero-line" />
            <div className="mock-landing-hero-line mock-landing-hero-line--short" />
            <div className="mock-landing-hero-btn-row">
              <span className="mock-landing-hero-btn" />
              <span className="mock-landing-hero-btn mock-landing-hero-btn--ghost" />
            </div>
          </div>
        </div>

        <div className="mock-landing-logos" aria-hidden="true">
          <p className="mock-landing-logos-label">Trusted by teams at</p>
          <div className="mock-landing-logos-row">
            {LOGOS.map((name) => (
              <span key={name} className="mock-landing-logo">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageHero;
