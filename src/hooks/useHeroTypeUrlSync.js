import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSkillContext } from '../context/SkillContext';
import { parseHeroTypeParam, PROJECT_URL_PARAM } from '../data/heroTypes';

/**
 * Keeps the selected project type in sync with ?project= in the URL.
 */
export function useHeroTypeUrlSync() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeHeroType, hasSelectedProjectType, applyHeroTypeFromUrl } = useSkillContext();

  useEffect(() => {
    const urlType = parseHeroTypeParam(searchParams.get(PROJECT_URL_PARAM));
    applyHeroTypeFromUrl(urlType);
  }, [searchParams, applyHeroTypeFromUrl]);

  useEffect(() => {
    if (hasSelectedProjectType) {
      setSearchParams(
        (prev) => {
          if (prev.get(PROJECT_URL_PARAM) === activeHeroType) return prev;
          const next = new URLSearchParams(prev);
          next.set(PROJECT_URL_PARAM, activeHeroType);
          return next;
        },
        { replace: true }
      );
      return;
    }

    setSearchParams(
      (prev) => {
        if (!prev.get(PROJECT_URL_PARAM)) return prev;
        const next = new URLSearchParams(prev);
        next.delete(PROJECT_URL_PARAM);
        return next;
      },
      { replace: true }
    );
  }, [activeHeroType, hasSelectedProjectType, setSearchParams]);
}
