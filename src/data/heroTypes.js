import DashboardHero from '@/components/heroes/DashboardHero';
import LandingPageHero from '@/components/heroes/LandingPageHero';
import SaasSiteHero from '@/components/heroes/SaasSiteHero';
import PortfolioHero from '@/components/heroes/PortfolioHero';

export const DEFAULT_HERO_TYPE = 'dashboard';
export const PROJECT_URL_PARAM = 'project';

export const heroTypeList = [
  { id: 'dashboard', label: 'Dashboard', component: DashboardHero },
  { id: 'landing', label: 'Landing page', component: LandingPageHero },
  { id: 'saas', label: 'SaaS site', component: SaasSiteHero },
  { id: 'portfolio', label: 'Portfolio', component: PortfolioHero },
];

const heroTypeIds = new Set(heroTypeList.map((type) => type.id));

/** Valid project type id from a URL param, or null for default / unset */
export function parseHeroTypeParam(value) {
  if (!value || !heroTypeIds.has(value)) {
    return null;
  }
  return value;
}

export function getHeroTypeFromSearch(search) {
  return parseHeroTypeParam(new URLSearchParams(search).get(PROJECT_URL_PARAM));
}

export function getInitialHeroTypeFromUrl() {
  if (typeof window === 'undefined') {
    return { type: DEFAULT_HERO_TYPE, hasSelected: false };
  }
  const fromUrl = getHeroTypeFromSearch(window.location.search);
  if (fromUrl) {
    return { type: fromUrl, hasSelected: true };
  }
  return { type: DEFAULT_HERO_TYPE, hasSelected: false };
}

const heroTypeMap = Object.fromEntries(heroTypeList.map((type) => [type.id, type]));

export function resolveHeroType(type) {
  return heroTypeMap[type] ?? heroTypeMap[DEFAULT_HERO_TYPE];
}
