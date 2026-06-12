// src/skills/index.js
import { linearModernTheme } from './registered/linear-modern/theme';
import { linearModernMeta } from './registered/linear-modern/meta';

import { minimalistMonochromeTheme } from './registered/minimalist-monochrome/theme';
import { minimalistMonochromeMeta } from './registered/minimalist-monochrome/meta';

import { playfulGeometricTheme } from './registered/playful-geometric/theme';
import { playfulGeometricMeta } from './registered/playful-geometric/meta';

import { clayPremiumTheme } from './registered/clay-premium/theme';
import { clayPremiumMeta } from './registered/clay-premium/meta';

import { neoBrutalismTheme } from './registered/neo-brutalism/theme';
import { neoBrutalismMeta } from './registered/neo-brutalism/meta';

import { handDrawnTheme } from './registered/hand-drawn/theme';
import { handDrawnMeta } from './registered/hand-drawn/meta';

import { artDecoTheme } from './registered/art-deco/theme';
import { artDecoMeta } from './registered/art-deco/meta';

import { getdripBrandTheme } from './registered/getdrip-brand/theme';
import { getdripBrandMeta } from './registered/getdrip-brand/meta';

export const skillThemes = {
  'getdrip-brand': getdripBrandTheme,
  'linear-modern': linearModernTheme,
  'minimalist-monochrome': minimalistMonochromeTheme,
  'playful-geometric': playfulGeometricTheme,
  'clay-premium': clayPremiumTheme,
  'neo-brutalism': neoBrutalismTheme,
  'hand-drawn': handDrawnTheme,
  'art-deco': artDecoTheme,
};

export const skillMetas = {
  'getdrip-brand': getdripBrandMeta,
  'linear-modern': linearModernMeta,
  'minimalist-monochrome': minimalistMonochromeMeta,
  'playful-geometric': playfulGeometricMeta,
  'clay-premium': clayPremiumMeta,
  'neo-brutalism': neoBrutalismMeta,
  'hand-drawn': handDrawnMeta,
  'art-deco': artDecoMeta,
};

// Installable library skills (excludes site-only getdrip-brand theme)
// Order drives SkillSwitcherStrip chips and SkillsPreview carousel
export const SKILL_STRIP_VISIBLE_COUNT = 6;

export const skillList = [
  clayPremiumMeta,
  linearModernMeta,
  neoBrutalismMeta,
  minimalistMonochromeMeta,
  playfulGeometricMeta,
  artDecoMeta,
  handDrawnMeta,
];
