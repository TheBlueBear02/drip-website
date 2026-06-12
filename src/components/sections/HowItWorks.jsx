import { useInView } from '../../hooks/useInView';
import { skillList } from '../../skills';
import { FEATURED_SKILL_ID } from '../../utils/resolveSkill';
import CopyCommand from '../ui/CopyCommand';
import './HowItWorks.css';

const FEATURED_COMMAND = `npx getdrip add ${FEATURED_SKILL_ID}`;
const SWATCH_SKILLS = skillList.slice(0, 6);

function ApplyPreviewSvg() {
  return (
    <svg
      className="how-it-works-apply-svg"
      viewBox="0 0 200 120"
      fill="none"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="198" height="118" rx="8" className="how-it-works-apply-frame" />
      <rect x="10" y="10" width="180" height="10" rx="3" className="how-it-works-apply-bar" />
      <circle cx="16" cy="15" r="2" className="how-it-works-apply-dot" />
      <circle cx="24" cy="15" r="2" className="how-it-works-apply-dot" />
      <circle cx="32" cy="15" r="2" className="how-it-works-apply-dot" />
      <rect x="10" y="28" width="82" height="72" rx="4" className="how-it-works-apply-wire" />
      <rect x="14" y="34" width="50" height="4" rx="2" className="how-it-works-apply-wire-line" />
      <rect x="14" y="42" width="68" height="3" rx="1.5" className="how-it-works-apply-wire-line" />
      <rect x="14" y="49" width="58" height="3" rx="1.5" className="how-it-works-apply-wire-line" />
      <rect x="14" y="60" width="36" height="10" rx="3" className="how-it-works-apply-wire-line" />
      <rect x="100" y="28" width="90" height="72" rx="4" className="how-it-works-apply-styled" />
      <rect x="106" y="34" width="78" height="28" rx="4" className="how-it-works-apply-hero" />
      <rect x="106" y="68" width="62" height="4" rx="2" className="how-it-works-apply-styled-line" />
      <rect x="106" y="76" width="44" height="4" rx="2" className="how-it-works-apply-styled-line" />
      <rect x="106" y="86" width="28" height="10" rx="4" className="how-it-works-apply-cta" />
      <path d="M92 64 H96 L100 64" className="how-it-works-apply-arrow" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="100,60 100,68 106,64" className="how-it-works-apply-arrow-head" />
    </svg>
  );
}

function HowItWorks() {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

  const handleBrowseClick = (e) => {
    e.preventDefault();
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`how-it-works site-reveal-section${isInView ? ' is-visible' : ''}`}
    >
      <div className="container">
        <h2 className="how-it-works-title site-reveal">It's Never Been Easier</h2>
        <p className="how-it-works-subtitle site-reveal" style={{ '--site-reveal-delay': '120ms' }}>
          Pick a design system, paste one command, and your agent builds in that world.
        </p>

        <div className="how-it-works-stage">
          <div className="how-it-works-bento">
            <article className="how-it-works-card how-it-works-card--pick">
              <p className="how-it-works-eyebrow">Step 01</p>
              <h3 className="how-it-works-card-title">Choose a design system</h3>
              <p className="how-it-works-card-description">
                Browse the library and pick the aesthetic that fits your product. Each skill is a complete
                design language—not just colors.
              </p>
              <div className="how-it-works-visual">
                <div className="how-it-works-swatches" aria-hidden="true">
                  {SWATCH_SKILLS.map((skill) => (
                    <span
                      key={skill.id}
                      className="how-it-works-swatch"
                      style={{ backgroundColor: skill.bgColor }}
                      title={skill.name}
                    />
                  ))}
                </div>
                <a href="#skills" className="how-it-works-browse-link" onClick={handleBrowseClick}>
                  Browse designs →
                </a>
              </div>
            </article>

            <article className="how-it-works-card how-it-works-card--run">
              <p className="how-it-works-eyebrow how-it-works-eyebrow--accent">Step 02</p>
              <h3 className="how-it-works-card-title">Copy one command</h3>
              <p className="how-it-works-card-description">
                Run a single npx command in your project. No signups, API keys, or configuration files.
              </p>
              <div className="how-it-works-visual how-it-works-visual--command">
                <CopyCommand command={FEATURED_COMMAND} size="md" />
              </div>
            </article>

            <article className="how-it-works-card how-it-works-card--apply">
              <p className="how-it-works-eyebrow">Step 03</p>
              <h3 className="how-it-works-card-title">Your agent applies it everywhere</h3>
              <p className="how-it-works-card-description">
                The skill installs locally. Your agent learns the tokens, patterns, and rules—then builds new
                screens in the same world.
              </p>
              <div className="how-it-works-visual how-it-works-visual--apply">
                <ApplyPreviewSvg />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
