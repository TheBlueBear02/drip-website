import { useEffect, useRef, useState } from 'react';
import { Home } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useSkillContext } from '../../context/SkillContext';
import { skillList, skillMetas, SKILL_STRIP_VISIBLE_COUNT } from '../../skills';
import { BRAND_SKILL_ID, resolveSkillId } from '../../utils/resolveSkill';
import { heroTypeList } from '../../data/heroTypes';
import { useScrollCollapse } from '../../hooks/useScrollCollapse';
import './SkillSwitcherStrip.css';

function ChevronIcon({ open }) {
  return (
    <svg
      className={`skill-switcher-type-chevron${open ? ' skill-switcher-type-chevron--open' : ''}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SkillSwitcherStrip() {
  const {
    activeSkill,
    previewSkill,
    setActiveSkill,
    activeHeroType,
    hasSelectedProjectType,
    selectProjectType,
  } = useSkillContext();
  const isCollapsed = useScrollCollapse();
  const [switcherStep, setSwitcherStep] = useState('project-type');
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [anchorEntering, setAnchorEntering] = useState(false);
  const [stylesEntering, setStylesEntering] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const typeAnchorButtonRef = useRef(null);
  const typeMenuRef = useRef(null);
  const skipNextTypeAnimRef = useRef(false);
  const prevActiveHeroTypeRef = useRef(activeHeroType);

  const selectedType = heroTypeList.find((t) => t.id === activeHeroType) ?? heroTypeList[0];
  const isBrandActive = activeSkill === null || activeSkill === BRAND_SKILL_ID;
  const resolvedSkillMeta = skillMetas[resolveSkillId(previewSkill, activeSkill)];
  const isDarkTheme = resolvedSkillMeta?.darkBackground === true;

  useEffect(() => {
    document.documentElement.classList.toggle('skill-strip-collapsed', isCollapsed);
    return () => document.documentElement.classList.remove('skill-strip-collapsed');
  }, [isCollapsed]);

  useEffect(() => {
    if (!typeMenuOpen) return undefined;

    const updatePosition = () => {
      const anchor = typeAnchorButtonRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 6,
        left: rect.left,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    const handleClick = (e) => {
      if (
        typeAnchorButtonRef.current?.contains(e.target) ||
        typeMenuRef.current?.contains(e.target)
      ) {
        return;
      }
      setTypeMenuOpen(false);
    };

    const handleKey = (e) => {
      if (e.key === 'Escape') setTypeMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [typeMenuOpen]);

  useEffect(() => {
    if (!anchorEntering) return undefined;
    const timer = setTimeout(() => setAnchorEntering(false), 450);
    return () => clearTimeout(timer);
  }, [anchorEntering]);

  useEffect(() => {
    if (!stylesEntering) return undefined;
    const timer = setTimeout(() => setStylesEntering(false), 900);
    return () => clearTimeout(timer);
  }, [stylesEntering]);

  const triggerStylesEnterAnimation = () => {
    setStylesEntering(false);
    window.requestAnimationFrame(() => {
      setStylesEntering(true);
    });
  };

  const prevHasSelectedProjectType = useRef(hasSelectedProjectType);
  useEffect(() => {
    if (
      hasSelectedProjectType &&
      !prevHasSelectedProjectType.current &&
      switcherStep === 'project-type'
    ) {
      setSwitcherStep('styles');
      setAnchorEntering(true);
      triggerStylesEnterAnimation();
    }
    prevHasSelectedProjectType.current = hasSelectedProjectType;
  }, [hasSelectedProjectType, switcherStep]);

  useEffect(() => {
    if (activeHeroType === prevActiveHeroTypeRef.current) return;

    const externalChange = !skipNextTypeAnimRef.current;
    prevActiveHeroTypeRef.current = activeHeroType;
    skipNextTypeAnimRef.current = false;

    if (externalChange && switcherStep === 'styles') {
      triggerStylesEnterAnimation();
    }
  }, [activeHeroType, switcherStep]);

  const handleBrandClick = () => {
    setActiveSkill(null);
  };

  const handleSeeMoreClick = (e) => {
    e.preventDefault();
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToHero = () => {
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const visibleSkills = skillList.slice(0, SKILL_STRIP_VISIBLE_COUNT);

  const handleTypeSelect = (typeId) => {
    const typeChanged = typeId !== activeHeroType;
    skipNextTypeAnimRef.current = true;
    selectProjectType(typeId);
    if (switcherStep === 'project-type') {
      setSwitcherStep('styles');
      setAnchorEntering(true);
      triggerStylesEnterAnimation();
    } else {
      setTypeMenuOpen(false);
      if (typeChanged) {
        scrollToHero();
        triggerStylesEnterAnimation();
      }
    }
  };

  const stripClass = [
    'skill-switcher-strip',
    switcherStep === 'project-type' ? 'skill-switcher-strip--project-type' : 'skill-switcher-strip--styles',
    isCollapsed ? 'skill-switcher-strip--collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={stripClass} aria-hidden={isCollapsed}>
      <div className="container">
        {switcherStep === 'project-type' ? (
          <div className="skill-switcher-types-row">
            <span className="skill-switcher-building-label">I&apos;m building:</span>
            <div className="skill-switcher-types">
              {heroTypeList.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className="skill-chip skill-chip--project-type"
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <span className="skill-chip-name">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="skill-switcher-body">
            <div className="skill-switcher-type-anchor-wrap">
              <button
                ref={typeAnchorButtonRef}
                type="button"
                className={[
                  'skill-switcher-type-anchor',
                  anchorEntering ? 'skill-switcher-type-anchor--enter' : '',
                  typeMenuOpen ? 'skill-switcher-type-anchor--open' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setTypeMenuOpen((open) => !open)}
                aria-expanded={typeMenuOpen}
                aria-haspopup="listbox"
                aria-label={`Project type: ${selectedType.label}. Change project type`}
              >
                <span className="skill-switcher-type-anchor-label">{selectedType.label}</span>
                <ChevronIcon open={typeMenuOpen} />
              </button>

              {typeMenuOpen &&
                createPortal(
                  <ul
                    ref={typeMenuRef}
                    className="skill-switcher-type-menu skill-switcher-type-menu--portal"
                    role="listbox"
                    aria-label="Project type"
                    style={{ top: menuPosition.top, left: menuPosition.left }}
                  >
                    {heroTypeList.map((type) => (
                      <li key={type.id} role="presentation">
                        <button
                          type="button"
                          role="option"
                          aria-selected={type.id === activeHeroType}
                          className={[
                            'skill-switcher-type-option',
                            type.id === activeHeroType ? 'skill-switcher-type-option--active' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          onClick={() => handleTypeSelect(type.id)}
                        >
                          {type.label}
                        </button>
                      </li>
                    ))}
                  </ul>,
                  document.body,
                )}
            </div>

            <div
              className={[
                'skill-switcher-scroll',
                stylesEntering ? 'skill-switcher-scroll--enter' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <button
                type="button"
                className={`skill-chip skill-chip--brand ${isBrandActive ? 'skill-chip-active' : ''}`}
                onClick={handleBrandClick}
                aria-label="Default site theme"
              >
                <Home
                  className={[
                    'skill-chip-icon',
                    'skill-chip-icon--home',
                    isDarkTheme ? 'skill-chip-icon--home-on-dark' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  size={12}
                  strokeWidth={2.5}
                  aria-hidden
                />
              </button>

              {visibleSkills.map((skill) => {
                const isActive = activeSkill === skill.id;

                return (
                  <button
                    key={skill.id}
                    type="button"
                    className={`skill-chip ${isActive ? 'skill-chip-active' : ''}`}
                    onClick={() => setActiveSkill(skill.id)}
                  >
                    <span
                      className="skill-chip-swatch"
                      style={{ backgroundColor: skill.accentColor }}
                    />
                    <span className="skill-chip-name">{skill.name}</span>
                  </button>
                );
              })}

              <a
                href="#skills"
                className="skill-switcher-see-more"
                onClick={handleSeeMoreClick}
              >
                See more
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillSwitcherStrip;
