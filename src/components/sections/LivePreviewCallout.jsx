import { useInView } from '../../hooks/useInView';
import SkillWorkflowDiagram from '../diagrams/SkillWorkflowDiagram';
import './LivePreviewCallout.css';

const PROMPT_IMAGE = 'proof/single-prompt.svg';
function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.split('/').map(encodeURIComponent).join('/')}`;
}

const PROMPT_CONS = [
  'Describes one screen or mood',
  'Lost when the chat ends',
  'Drifts back to generic "AI UI"',
  'Re-paste instructions every session',
  'No shared tokens or patterns',
];

const SKILL_PROS = [
  'Defines a full design system',
  'Lives in your repo, always available',
  'Keeps tokens and patterns consistent',
  'One command—your agent learns the rules',
  'Every new screen stays in the same world',
];

function LivePreviewCallout() {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

  return (
    <section
      ref={sectionRef}
      className={`skill-explainer${isInView ? ' skill-explainer--visible' : ''}`}
      aria-label="What a getDRIP skill is"
    >
      <div className="container">
        <h2 className="skill-explainer-title">A full design skill, not a one time prompt</h2>

        <div className="skill-explainer-stage">
          <div className="skill-explainer-grid">
            <div className="skill-explainer-card skill-explainer-card--prompt">
              <p className="skill-explainer-card-eyebrow skill-explainer-card-eyebrow--old">The Competitors Way:</p>
              <h3 className="skill-explainer-card-title">Single prompt</h3>
              <ul className="skill-explainer-list skill-explainer-list--cons">
                {PROMPT_CONS.map((item) => (
                  <li key={item} className="skill-explainer-list-item">
                    <span className="skill-explainer-icon skill-explainer-icon--con" aria-hidden="true">
                      −
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <img
                src={assetUrl(PROMPT_IMAGE)}
                alt="A single design prompt pasted into chat"
                className="skill-explainer-card-image skill-explainer-card-image--prompt"
              />
            </div>

            <div className="skill-explainer-card skill-explainer-card--skill">
              <p className="skill-explainer-card-eyebrow skill-explainer-card-eyebrow--new">The 2026 Way:</p>
              <h3 className="skill-explainer-card-title skill-explainer-card-title--brand">
                <span className="skill-explainer-brand-logo">
                  <span className="brand-get">GET</span>
                  <span className="brand-drip">DRIP</span>
                </span>
                <span className="skill-explainer-brand-suffix"> Design Skills</span>
              </h3>
              <ul className="skill-explainer-list skill-explainer-list--pros">
                {SKILL_PROS.map((item) => (
                  <li key={item} className="skill-explainer-list-item">
                    <span className="skill-explainer-icon skill-explainer-icon--pro" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="skill-explainer-score">
                <span className="skill-explainer-score-value">100%</span>
                <span className="skill-explainer-score-label">design consistency</span>
              </p>
              <div className="skill-explainer-diagram">
                <SkillWorkflowDiagram />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LivePreviewCallout;
