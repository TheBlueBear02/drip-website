import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { skillList } from '@/skills';
import { FEATURED_SKILL_ID } from '@/utils/resolveSkill';
import CopyCommand from '@/components/ui/CopyCommand';
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

function buildSteps(handleBrowseClick) {
  return [
    {
      id: 'pick',
      title: 'Pick Design System',
      description:
        'Browse the library and pick the aesthetic that fits your product. Each skill is a complete design language—tokens, patterns, and rules—not just colors.',
      visual: (
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
      ),
    },
    {
      id: 'copy',
      title: 'Copy the Design Command',
      description:
        'Run a single npx command in your project. No signups, API keys, or configuration files—just copy and go.',
      visual: (
        <div className="how-it-works-visual how-it-works-visual--command">
          <CopyCommand command={FEATURED_COMMAND} size="md" />
        </div>
      ),
    },
    {
      id: 'paste',
      title: 'Paste the command in Claude/Cursor/Codex',
      description:
        'Paste the command into your agent chat—Cursor, Claude Code, OpenAI Codex, Lovable, or any AI tool that builds React projects. Run it in your project directory and the skill installs locally.',
    },
    {
      id: 'apply',
      title: 'Ask the AI Agent to Apply the Design',
      description:
        'Once installed, your agent learns the skill\'s tokens, patterns, and rules. Ask it to apply the design system and it builds new screens in the same visual world.',
      visual: (
        <div className="how-it-works-visual how-it-works-visual--apply">
          <ApplyPreviewSvg />
        </div>
      ),
    },
    {
      id: 'adjust',
      title: 'Make Your Own Adjustments',
      description:
        'The skill is a starting point, not a cage. Edit tokens, tweak components, and refine rules in your repo. You stay in control—every adjustment is yours to make.',
    },
  ];
}

function HowItWorks() {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  const [activeStep, setActiveStep] = useState(0);
  const navRef = useRef(null);
  const [panelHeight, setPanelHeight] = useState(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const mediaQuery = window.matchMedia('(max-width: 900px)');

    const syncPanelHeight = () => {
      if (mediaQuery.matches) {
        setPanelHeight(null);
        return;
      }

      setPanelHeight(nav.getBoundingClientRect().height);
    };

    const observer = new ResizeObserver(syncPanelHeight);
    observer.observe(nav);
    mediaQuery.addEventListener('change', syncPanelHeight);
    window.addEventListener('resize', syncPanelHeight);
    syncPanelHeight();

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', syncPanelHeight);
      window.removeEventListener('resize', syncPanelHeight);
    };
  }, [activeStep]);

  const handleBrowseClick = (e) => {
    e.preventDefault();
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const steps = buildSteps(handleBrowseClick);
  const currentStep = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className={`how-it-works site-reveal-section${isInView ? ' is-visible' : ''}`}
    >
      <div className="container">
        <h2 className="how-it-works-title site-reveal">How it works</h2>
        <p className="how-it-works-subtitle site-reveal" style={{ '--site-reveal-delay': '120ms' }}>
          Pick a design system, paste one command, and your agent builds in that world.
        </p>

        <div className="how-it-works-stage">
          <div className="how-it-works-layout site-reveal" style={{ '--site-reveal-delay': '240ms' }}>
            <nav ref={navRef} className="how-it-works-nav" aria-label="How it works steps">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  className={`how-it-works-step-btn${activeStep === index ? ' is-active' : ''}`}
                  aria-pressed={activeStep === index}
                  onClick={() => setActiveStep(index)}
                >
                  {index + 1}. {step.title}
                </button>
              ))}
            </nav>

            <div
              className="how-it-works-panel-slot"
              style={panelHeight != null ? { height: panelHeight } : undefined}
            >
              <article
                key={currentStep.id}
                className="how-it-works-panel"
                aria-live="polite"
              >
                <p className="how-it-works-eyebrow how-it-works-eyebrow--accent">
                  Step {String(activeStep + 1).padStart(2, '0')}
                </p>
                <h3 className="how-it-works-panel-title">{currentStep.title}</h3>
                <p className="how-it-works-panel-description">{currentStep.description}</p>
                {currentStep.visual && (
                  <div className="how-it-works-panel-visual">{currentStep.visual}</div>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
