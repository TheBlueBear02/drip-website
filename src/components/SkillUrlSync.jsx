import { useSkillUrlSync } from '../hooks/useSkillUrlSync';
import { useHeroTypeUrlSync } from '../hooks/useHeroTypeUrlSync';

function SkillUrlSync() {
  useSkillUrlSync();
  useHeroTypeUrlSync();
  return null;
}

export default SkillUrlSync;
