import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSkillContext } from '@/context/SkillContext';
import { retainActiveSkillForProjectType } from '@/skills';
import { parseSkillParam, SKILL_URL_PARAM } from '@/utils/resolveSkill';

/**
 * Keeps the locked active skill in sync with ?skill= in the URL.
 * Preview/hover state is intentionally not reflected in the URL.
 */
export function useSkillUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeSkill, setActiveSkill, activeHeroType } = useSkillContext();

  useEffect(() => {
    const urlSkill = parseSkillParam(searchParams.get(SKILL_URL_PARAM));
    const validSkill = retainActiveSkillForProjectType(urlSkill, activeHeroType);
    setActiveSkill((current) => (current === validSkill ? current : validSkill));
  }, [searchParams, setActiveSkill, activeHeroType]);

  useEffect(() => {
    if (activeSkill) {
      setSearchParams(
        (prev) => {
          if (prev.get(SKILL_URL_PARAM) === activeSkill) return prev;
          const next = new URLSearchParams(prev);
          next.set(SKILL_URL_PARAM, activeSkill);
          return next;
        },
        { replace: true }
      );
      return;
    }

    setSearchParams(
      (prev) => {
        if (!prev.get(SKILL_URL_PARAM)) return prev;
        const next = new URLSearchParams(prev);
        next.delete(SKILL_URL_PARAM);
        return next;
      },
      { replace: true }
    );
  }, [activeSkill, setSearchParams]);
}
