function MockMarketeamLanding() {
  return (
    <div className="mock-landing-page" aria-hidden="true">
      <header className="mock-landing-page-nav">
        <span className="mock-landing-page-brand">
          <span className="brand-get">GET</span>
          <span className="brand-drip">DRIP</span>
        </span>

        <div className="mock-landing-page-nav-actions">
          <span className="mock-landing-page-phone">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M3.5 1.5h2l1 3.5-1.3.9a8.5 8.5 0 0 0 4.8 4.8l.9-1.3 3.5 1v2a1.5 1.5 0 0 1-1.5 1.5C6.2 14.5 1.5 9.8 1.5 3A1.5 1.5 0 0 1 3.5 1.5Z" />
            </svg>
            +1 (555) 847-2901
          </span>

          <span className="mock-landing-page-menu">
            <span className="mock-landing-page-menu-label">MENU</span>
            <span className="mock-landing-page-menu-icon">
              <span />
              <span />
              <span />
            </span>
          </span>
        </div>
      </header>

      <div className="mock-landing-page-main">
        <div className="mock-landing-page-copy">
          <h2 className="mock-landing-page-headline">
            Your Next Address Starts With One Simple Search
          </h2>

          <p className="mock-landing-page-subhead">
            Handpicked listings, neighborhood insights, and virtual tours — all in one
            calm, clear experience.
          </p>

          <div className="mock-landing-page-cta-row">
            <span className="mock-landing-page-cta">View Listings</span>
            <span className="mock-landing-page-cta-icon" aria-hidden="true">
              →
            </span>
          </div>

          <div className="mock-landing-page-proof">
            <div className="mock-landing-page-proof-avatars">
              <span className="mock-landing-page-avatar mock-landing-page-avatar--1" />
              <span className="mock-landing-page-avatar mock-landing-page-avatar--2" />
              <span className="mock-landing-page-avatar mock-landing-page-avatar--3" />
            </div>
            <p className="mock-landing-page-proof-text">More than 1000+ property</p>
            <div className="mock-landing-page-rating">
              <span className="mock-landing-page-rating-score">5/5</span>
              <span className="mock-landing-page-stars" aria-hidden="true">
                ★★★★★
              </span>
              <span className="mock-landing-page-rating-label">20 Review On Google</span>
            </div>
          </div>
        </div>

        <div className="mock-landing-page-visual">
          <div className="mock-landing-page-scene">
            <div className="mock-landing-page-scene-sky" />
            <div className="mock-landing-page-scene-mountains" />
            <div className="mock-landing-page-scene-water" />
            <div className="mock-landing-page-scene-house">
              <span className="mock-landing-page-scene-roof" />
              <span className="mock-landing-page-scene-body" />
              <span className="mock-landing-page-scene-door" />
            </div>
            <div className="mock-landing-page-scene-ground" />
          </div>

          <div className="mock-landing-page-card mock-landing-page-card--discount">
            <p className="mock-landing-page-card-eyebrow">Get discount Up to</p>
            <p className="mock-landing-page-card-stat">50%</p>
            <span className="mock-landing-page-card-btn mock-landing-page-card-btn--outline">
              Contact Now
            </span>
          </div>

          <div className="mock-landing-page-card mock-landing-page-card--tour">
            <div className="mock-landing-page-tour-thumb">
              <span className="mock-landing-page-tour-play" aria-hidden="true">▶</span>
            </div>
            <div className="mock-landing-page-tour-copy">
              <span className="mock-landing-page-tour-dot" />
              <span>House tour</span>
            </div>
          </div>

          <div className="mock-landing-page-card mock-landing-page-card--quote">
            <p>
              Developed by expert architects with years of experience and a passion for
              creating exceptional living spaces.
            </p>
          </div>

          <div className="mock-landing-page-card mock-landing-page-card--price">
            <p className="mock-landing-page-card-title">Green House</p>
            <p className="mock-landing-page-card-price">$450,000</p>
            <p className="mock-landing-page-card-meta">Minimalist modern house for family</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockMarketeamLanding;
