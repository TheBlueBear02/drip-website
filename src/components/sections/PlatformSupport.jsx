import './PlatformSupport.css';
import { useSkillContext } from '../../context/SkillContext';
import { skillMetas } from '../../skills';
import { resolveSkillId } from '../../utils/resolveSkill';
import { useInView } from '../../hooks/useInView';

const LOGOS_BASE = `${import.meta.env.BASE_URL}platforms%20logos`;

// Logos for light backgrounds (dark/black variants). Use when meta.darkBackground === false.
const platformsLightBg = [
  { name: 'Lovable', logo: `${LOGOS_BASE}/lovable-dark-png.png` },
  { name: 'Cursor', logo: `${LOGOS_BASE}/cursor logo.png` },
  { name: 'OpenAI', logo: `${LOGOS_BASE}/OpenAI-black-wordmark.svg` },
  { name: 'Claude Code', logo: `${LOGOS_BASE}/Claude_Logo_2023-s1280.png` },
  { name: 'Base44', logo: `${LOGOS_BASE}/base44-logo_brandlogos.net_sum8k-scaled.png` },
];

// Logos for dark backgrounds (light/white variants). Use when meta.darkBackground === true.
const platformsDarkBg = [
  { name: 'Lovable', logo: `${LOGOS_BASE}/lovable-light-png.png` },
  { name: 'Cursor', logo: `${LOGOS_BASE}/cursor logo for darkmode.png` },
  { name: 'OpenAI', logo: `${LOGOS_BASE}/OpenAI-white-wordmark.svg` },
  { name: 'Claude Code', logo: `${LOGOS_BASE}/claude logo for dark mode.png` },
  { name: 'Base44', logo: `${LOGOS_BASE}/Base44-Dark-Mode-New.avif` },
];

function PlatformSupport({ lightBg: lightBgProp }) {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  const { activeSkill, previewSkill } = useSkillContext();
  const resolvedId = resolveSkillId(previewSkill, activeSkill);
  const meta = skillMetas[resolvedId];
  const lightBg =
    lightBgProp ?? (meta?.category === 'light' || meta?.category === 'colorful');
  // Dark-background themes use light/white logos; light-background themes use dark/black logos.
  const useDarkBgLogos = meta?.darkBackground === true;
  const platforms = useDarkBgLogos ? platformsDarkBg : platformsLightBg;

  return (
    <section
      ref={sectionRef}
      id="platforms"
      className={`platform-support site-reveal-section${isInView ? ' is-visible' : ''}${lightBg ? ' platform-support--light' : ''}`}
    >
      <div className="container">
        <h2 className="platform-support-title site-reveal">Platform Support</h2>
        <p className="platform-support-subtitle site-reveal" style={{ '--site-reveal-delay': '120ms' }}>
          Works in any React project. Commonly used with Cursor, Claude Code, Lovable, and OpenAI Codex.
        </p>
        <div className="platform-support-strip">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="platform-support-item site-reveal"
              style={{ '--site-reveal-delay': `${240 + index * 80}ms` }}
            >
              <img
                src={platform.logo}
                alt={platform.name}
                className="platform-support-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PlatformSupport;
