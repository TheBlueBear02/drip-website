import { useSkillContext } from '@/context/SkillContext';
import HeroProjectTypes from '@/components/ui/HeroProjectTypes';
import HeroVideo from './HeroVideo';
import HeroCharacterWord from './HeroCharacterWord';
import SkillHeroShell from '@/components/heroes/SkillHeroShell';
import { resolveSkillId, isBrandTheme, FEATURED_SKILL_ID } from '@/utils/resolveSkill';
import { resolveHeroType, DEFAULT_HERO_TYPE } from '@/data/heroTypes';
import './Hero.css';
import '../heroes/heroes.css';

const FEATURED_COMMAND = `npx getdrip add ${FEATURED_SKILL_ID}`;

function Hero() {
  const {
    activeSkill,
    previewSkill,
    activeHeroType,
    hasSelectedProjectType,
    selectProjectTypeFromHero,
  } = useSkillContext();
  const resolvedSkillId = resolveSkillId(previewSkill, activeSkill);
  const isBrand = isBrandTheme(resolvedSkillId);
  const heroType = activeHeroType ?? DEFAULT_HERO_TYPE;
  const { component: HeroTypeComponent } = resolveHeroType(heroType);

  const installCommand = isBrand
    ? FEATURED_COMMAND
    : `npx getdrip add ${resolvedSkillId}`;

  const handleBrowseClick = (e) => {
    e.preventDefault();
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyContent = (
    <>
      <h1 className="hero-headline">
        Your AI app works,
        <br />
        <span className="hero-headline-line">
          now give it <HeroCharacterWord />
        </span>
      </h1>
      <p className="hero-subheadline">
        Fix the default AI look of your project in 10 secs and get back to vibe coding.
      </p>
      <div className="hero-cta-group">
        <p className="hero-try-label">I&apos;m building:</p>
        <HeroProjectTypes
          activeHeroType={activeHeroType}
          hasSelected={hasSelectedProjectType}
          onSelect={selectProjectTypeFromHero}
        />
        <a href="#skills" className="hero-browse-link" onClick={handleBrowseClick}>
          Browse all designs →
        </a>
      </div>
    </>
  );

  if (isBrand) {
    return (
      <section id="home" className="hero hero--brand">
        <div className="container">
          <div className="hero-split">
            <div className="hero-copy">{copyContent}</div>
            <div className="hero-media">
              <HeroVideo />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <SkillHeroShell resolvedSkillId={resolvedSkillId} heroType={heroType}>
      <HeroTypeComponent
        resolvedSkillId={resolvedSkillId}
        installCommand={installCommand}
      />
    </SkillHeroShell>
  );
}

export default Hero;
