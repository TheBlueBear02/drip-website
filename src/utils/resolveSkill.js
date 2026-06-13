import { skillThemes } from '@/skills';

export const BRAND_SKILL_ID = 'getdrip-brand';
export const FEATURED_SKILL_ID = 'linear-modern';
export const SKILL_URL_PARAM = 'skill';

/** Valid installable skill id from a URL param, or null for brand default */
export function parseSkillParam(value) {
  if (!value || value === BRAND_SKILL_ID || !skillThemes[value]) {
    return null;
  }
  return value;
}

export function getSkillFromSearch(search) {
  return parseSkillParam(new URLSearchParams(search).get(SKILL_URL_PARAM));
}

/** Resolved theme id: preview → locked → site brand default */
export function resolveSkillId(previewSkill, activeSkill) {
  return previewSkill ?? activeSkill ?? BRAND_SKILL_ID;
}

export function isBrandTheme(skillId) {
  return skillId === BRAND_SKILL_ID;
}

export function isBrandDefault(activeSkill, previewSkill) {
  return !previewSkill && !activeSkill;
}
