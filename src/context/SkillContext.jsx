import { createContext, useContext, useState } from 'react';
import { getSkillFromSearch } from '../utils/resolveSkill';
import { DEFAULT_HERO_TYPE } from '../data/heroTypes';

const SkillContext = createContext();

function getInitialActiveSkill() {
  if (typeof window === 'undefined') return null;
  return getSkillFromSearch(window.location.search);
}

export function SkillProvider({ children }) {
  const [activeSkill, setActiveSkill] = useState(getInitialActiveSkill); // The locked skill
  const [previewSkill, setPreviewSkill] = useState(null); // Temporary hover state
  const [activeHeroType, setActiveHeroType] = useState(DEFAULT_HERO_TYPE);
  const [hasSelectedProjectType, setHasSelectedProjectType] = useState(false);

  const selectProjectType = (typeId) => {
    setActiveHeroType(typeId);
    setHasSelectedProjectType(true);
  };

  // The rendered skill = previewSkill ?? activeSkill ?? getdrip-brand (site default)
  // null activeSkill = brand default. Hover preview wins over locked skill.

  return (
    <SkillContext.Provider
      value={{
        activeSkill,
        previewSkill,
        activeHeroType,
        hasSelectedProjectType,
        setActiveSkill,
        setPreviewSkill,
        setActiveHeroType,
        selectProjectType,
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
