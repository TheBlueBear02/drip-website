import { useEffect, useRef, useState } from 'react';
import { useSkillContext } from '@/context/SkillContext';
import { getSkillsForProjectType, skillMetas, SKILL_STRIP_VISIBLE_COUNT } from '@/skills';
import { BRAND_SKILL_ID, resolveSkillId } from '@/utils/resolveSkill';
import { heroTypeList } from '@/data/heroTypes';
import { useScrollCollapse } from '@/hooks/useScrollCollapse';
import { useSwitcherAnimations } from '@/hooks/useSwitcherAnimations';
import SkillSwitcherProjectTypeRow from '@/components/ui/SkillSwitcherProjectTypeRow';
import SkillSwitcherStylesRow from '@/components/ui/SkillSwitcherStylesRow';
import './SkillSwitcherStrip.css';

function SkillSwitcherStrip() {
  const {
    activeSkill,
    previewSkill,
    setActiveSkill,
    activeHeroType,
    hasSelectedProjectType,
    navbarSwitcherStep,
    setNavbarSwitcherStep,
    heroProjectTypePick,
    selectProjectType,
  } = useSkillContext();
  const isCollapsed = useScrollCollapse();
  const switcherStep = navbarSwitcherStep;
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const typeAnchorButtonRef = useRef(null);
  const typeMenuRef = useRef(null);

  const {
    typeMenuOpen,
    setTypeMenuOpen,
    anchorEntering,
    setAnchorEntering,
    stylesEntering,
    skipNextTypeAnimRef,
    triggerStylesEnterAnimation,
  } = useSwitcherAnimations({
    activeHeroType,
    heroProjectTypePick,
    navbarSwitcherStep,
    setNavbarSwitcherStep,
    hasSelectedProjectType,
  });

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
  }, [typeMenuOpen, setTypeMenuOpen]);

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

  const visibleSkills = getSkillsForProjectType(activeHeroType).slice(0, SKILL_STRIP_VISIBLE_COUNT);

  const handleTypeSelect = (typeId) => {
    const typeChanged = typeId !== activeHeroType;
    skipNextTypeAnimRef.current = true;
    selectProjectType(typeId);
    if (switcherStep === 'project-type') {
      setNavbarSwitcherStep('styles');
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
          <SkillSwitcherProjectTypeRow
            hasSelectedProjectType={hasSelectedProjectType}
            activeHeroType={activeHeroType}
            onTypeSelect={handleTypeSelect}
          />
        ) : (
          <SkillSwitcherStylesRow
            typeAnchorButtonRef={typeAnchorButtonRef}
            typeMenuRef={typeMenuRef}
            selectedTypeLabel={selectedType.label}
            anchorEntering={anchorEntering}
            typeMenuOpen={typeMenuOpen}
            menuPosition={menuPosition}
            stylesEntering={stylesEntering}
            activeHeroType={activeHeroType}
            isBrandActive={isBrandActive}
            isDarkTheme={isDarkTheme}
            visibleSkills={visibleSkills}
            activeSkill={activeSkill}
            onTypeAnchorClick={() => setTypeMenuOpen((open) => !open)}
            onTypeSelect={handleTypeSelect}
            onBrandClick={handleBrandClick}
            onSkillClick={setActiveSkill}
            onSeeMoreClick={handleSeeMoreClick}
          />
        )}
      </div>
    </div>
  );
}

export default SkillSwitcherStrip;
