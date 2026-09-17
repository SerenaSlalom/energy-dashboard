import { ref, computed } from 'vue'
import dataset from '@/data/energy-usage.json'
import type { EnergyDataset, SeasonKey, SectorFilter } from '@/types/energy'

const energy = dataset as EnergyDataset

const season = ref<SeasonKey>('summer')
const sector = ref<SectorFilter>('all')
const activePointId = ref<string | null>(null)

export function useSeason() {
  const seasonData = computed(() => energy.seasons[season.value])
  const activePoint = computed(
    () => seasonData.value.pointsOfInterest.find((p) => p.id === activePointId.value) ?? null,
  )

  function setSeason(next: SeasonKey) {
    if (season.value === next) return
    season.value = next
    activePointId.value = null
  }

  function setSector(next: SectorFilter) {
    sector.value = next
  }

  function selectPoint(id: string) {
    activePointId.value = activePointId.value === id ? null : id
  }

  return {
    energy,
    season,
    sector,
    seasonData,
    activePoint,
    setSeason,
    setSector,
    selectPoint,
  }
}
