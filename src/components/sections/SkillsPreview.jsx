import { useState, useEffect } from 'react';
import { useSkillContext } from '../../context/SkillContext';
import { skillList } from '../../skills';
import { resolveSkillId } from '../../utils/resolveSkill';
import { useInView } from '../../hooks/useInView';
import CopyCommand from '../ui/CopyCommand';
import './SkillsPreview.css';

const DESKTOP_INITIAL_CARDS = 3;
const MOBILE_INITIAL_CARDS = 3;
const SHOW_MORE_COUNT = 3;
const MOBILE_BREAKPOINT = 768;

// Preview image filenames in public/styles preview/ (one per skill)
const PREVIEW_IMAGES = {
  'linear-modern': 'linear modern.png',
  'clay-premium': 'clay-premium.png',
  'minimalist-monochrome': 'minimalist-monochrome.png',
  'playful-geometric': 'playful-geomtric.png',
  'neo-brutalism': 'neo-brutalism.png',
  'hand-drawn': 'hand-drawn.png',
  'art-deco': 'art deco.png',
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

function getInitialVisibleCount(isMobile) {
  return isMobile ? MOBILE_INITIAL_CARDS : DESKTOP_INITIAL_CARDS;
}

function SkillCard({ skill, isActive, onPreviewClick, revealDelay = 0 }) {
  return (
    <div
      className="skills-preview-card site-reveal"
      style={{ '--site-reveal-delay': `${revealDelay}ms` }}
    >
      <div className="skills-preview-card-preview">
        <button
          type="button"
          className={`skills-preview-card-btn ${isActive ? 'skills-preview-card-btn-active' : ''}`}
          onClick={() => onPreviewClick(skill.id)}
        >
          {isActive ? 'Active' : 'Preview'}
        </button>
        {PREVIEW_IMAGES[skill.id] && (
          <img
            src={`${import.meta.env.BASE_URL}${['styles preview', PREVIEW_IMAGES[skill.id]].map(encodeURIComponent).join('/')}`}
            alt={`${skill.name} style preview`}
            className="skills-preview-card-preview-img"
          />
        )}
        <div
          className="skills-preview-card-preview-bg"
          style={{ backgroundColor: skill.bgColor }}
        />
      </div>
      <div className="skills-preview-card-content">
        <h3 className="skills-preview-card-title">{skill.name}</h3>
        <p className="skills-preview-card-description">{skill.description}</p>
        <div className="skills-preview-card-tags">
          {skill.mood.slice(0, 3).map((tag) => (
            <span key={tag} className="skills-preview-card-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="skills-preview-card-command">
          <CopyCommand command={skill.command} size="sm" />
        </div>
      </div>
    </div>
  );
}

function SkillsPreview() {
  const [sectionRef, isInView] = useInView({ threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  const { setActiveSkill, activeSkill, previewSkill } = useSkillContext();
  const resolvedSkillId = resolveSkillId(previewSkill, activeSkill);
  const isPlayfulGeometric = resolvedSkillId === 'playful-geometric';
  const isLinearModern = resolvedSkillId === 'linear-modern';
  const isMobile = useIsMobile();
  const [visibleCount, setVisibleCount] = useState(() => getInitialVisibleCount(isMobile));

  useEffect(() => {
    setVisibleCount(getInitialVisibleCount(isMobile));
  }, [isMobile]);

  const previewSkills = skillList;
  const visibleSkills = previewSkills.slice(0, visibleCount);
  const hasMore = visibleCount < previewSkills.length;
  const showMore = () =>
    setVisibleCount((n) => Math.min(n + SHOW_MORE_COUNT, previewSkills.length));

  const handlePreviewClick = (skillId) => {
    if (activeSkill === skillId) {
      setActiveSkill(null);
    } else {
      setActiveSkill(skillId);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`skills-preview site-reveal-section${isInView ? ' is-visible' : ''} ${isPlayfulGeometric ? 'skills-preview--playful-geometric' : ''} ${isLinearModern ? 'skills-preview--linear-modern' : ''}`}
    >
      <div className="container">
        <h2 className="skills-preview-title site-reveal">Design systems</h2>

        <div className="skills-preview-gallery">
          {visibleSkills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              isActive={activeSkill === skill.id}
              onPreviewClick={handlePreviewClick}
              revealDelay={200 + index * 120}
            />
          ))}
        </div>
        {hasMore && (
          <div className="skills-preview-show-more-wrap site-reveal" style={{ '--site-reveal-delay': '560ms' }}>
            <button
              type="button"
              className="skills-preview-show-more"
              onClick={showMore}
            >
              Show more design systems
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsPreview;
