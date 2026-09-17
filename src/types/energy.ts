export type SeasonKey = 'summer' | 'winter' | 'spring' | 'fall'
export type SectorKey = 'residential' | 'commercial' | 'industrial'
export type SectorFilter = 'all' | SectorKey

export interface InsightBreakdown {
  driver: string
  pct: number
}

export interface PointOfInterest {
  id: string
  hour: number
  type: 'peak' | 'dip'
  label: string
  title: string
  summary: string
  breakdown: InsightBreakdown[]
  implication: string
  deltaNote: string
}

export interface SeasonData {
  label: string
  months: string
  residential: number[]
  commercial: number[]
  industrial: number[]
  solar: number[]
  evCharging: number[]
  netLoad: number[]
  pointsOfInterest: PointOfInterest[]
}

export interface HistoricalTrendSeries {
  riskWindowMonths: number[]
  solarAdoptionPct: number[]
  evAdoptionPct: number[]
}

export interface ProjectionTrendSeries extends HistoricalTrendSeries {
  years: number[]
}

export interface TrendData {
  years: number[]
  historical: HistoricalTrendSeries
  projection: ProjectionTrendSeries
  narrative: string
}

export interface EnergyDataset {
  seasons: Record<SeasonKey, SeasonData>
  trend: TrendData
}

export const SEASON_ORDER: SeasonKey[] = ['summer', 'winter', 'spring', 'fall']

export const SECTOR_LABELS: Record<SectorKey, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
}
