import { createContext, useCallback, useContext, useState } from 'react';
import { getSkillFromSearch } from '../utils/resolveSkill';
import { DEFAULT_HERO_TYPE, getInitialHeroTypeFromUrl } from '../data/heroTypes';

const SkillContext = createContext();

function getInitialActiveSkill() {
  if (typeof window === 'undefined') return null;
  return getSkillFromSearch(window.location.search);
}

const initialHeroType = getInitialHeroTypeFromUrl();

export function SkillProvider({ children }) {
  const [activeSkill, setActiveSkill] = useState(getInitialActiveSkill); // The locked skill
  const [previewSkill, setPreviewSkill] = useState(null); // Temporary hover state
  const [activeHeroType, setActiveHeroType] = useState(initialHeroType.type);
  const [hasSelectedProjectType, setHasSelectedProjectType] = useState(initialHeroType.hasSelected);
  const [navbarSwitcherStep, setNavbarSwitcherStep] = useState(
    () => (initialHeroType.hasSelected ? 'styles' : 'project-type'),
  );
  const [heroProjectTypePick, setHeroProjectTypePick] = useState(0);

  const selectProjectType = (typeId) => {
    setActiveHeroType(typeId);
    setHasSelectedProjectType(true);
  };

  const selectProjectTypeFromHero = (typeId) => {
    setActiveHeroType(typeId);
    setHasSelectedProjectType(true);
    setHeroProjectTypePick((count) => count + 1);
  };

  const applyHeroTypeFromUrl = useCallback((typeId) => {
    if (typeId) {
      setActiveHeroType((current) => (current === typeId ? current : typeId));
      setHasSelectedProjectType(true);
      setNavbarSwitcherStep('styles');
      return;
    }

    setActiveHeroType((current) => (current === DEFAULT_HERO_TYPE ? current : DEFAULT_HERO_TYPE));
    setHasSelectedProjectType(false);
    setNavbarSwitcherStep('project-type');
  }, []);

  // The rendered skill = previewSkill ?? activeSkill ?? getdrip-brand (site default)
  // null activeSkill = brand default. Hover preview wins over locked skill.

  return (
    <SkillContext.Provider
      value={{
        activeSkill,
        previewSkill,
        activeHeroType,
        hasSelectedProjectType,
        navbarSwitcherStep,
        heroProjectTypePick,
        setActiveSkill,
        setPreviewSkill,
        setActiveHeroType,
        setNavbarSwitcherStep,
        selectProjectType,
        selectProjectTypeFromHero,
        applyHeroTypeFromUrl,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export function useSkillContext() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkillContext must be used within SkillProvider');
  }
  return context;
}
