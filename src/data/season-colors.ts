import type { SeasonKey } from '@/types/energy'

// Kept in sync with the --season-* custom properties in src/assets/seasonal.css.
// Canvas-rendered charts can't read CSS custom properties directly, so the
// same hex values are duplicated here for Chart.js.
export const SEASON_COLORS: Record<SeasonKey, string> = {
  summer: '#f2b33d',
  winter: '#6fa8d9',
  spring: '#7fcb9e',
  fall: '#d98a52',
}

export const SOLAR_COLOR = '#ffd166'
export const MINT = '#38f2a1'
export const CHARCOAL_INK = '#06241a'
export const SAGE = '#8aa39a'
export const MOSS = '#1f3128'
export const CREAM = '#e8f2ec'
