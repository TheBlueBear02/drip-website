import DashboardHero from '../components/heroes/DashboardHero';
import LandingPageHero from '../components/heroes/LandingPageHero';
import SaasSiteHero from '../components/heroes/SaasSiteHero';
import PortfolioHero from '../components/heroes/PortfolioHero';

export const DEFAULT_HERO_TYPE = 'dashboard';

export const heroTypeList = [
  { id: 'dashboard', label: 'Dashboard', component: DashboardHero },
  { id: 'landing', label: 'Landing page', component: LandingPageHero },
  { id: 'saas', label: 'SaaS site', component: SaasSiteHero },
  { id: 'portfolio', label: 'Portfolio', component: PortfolioHero },
];

const heroTypeMap = Object.fromEntries(heroTypeList.map((type) => [type.id, type]));

export function resolveHeroType(type) {
  return heroTypeMap[type] ?? heroTypeMap[DEFAULT_HERO_TYPE];
}
