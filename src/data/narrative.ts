import type { SeasonKey } from '@/types/energy'

export interface SeasonNarrative {
  kicker: string
  heading: string
  body: string
}

export const SEASON_NARRATIVE: Record<SeasonKey, SeasonNarrative> = {
  summer: {
    kicker: 'Where the story starts',
    heading: "Summer's dramatic two-peak day",
    body: 'This is the pattern most planning is built around: a midday bump from commercial cooling, softened by solar, followed by a sharp, solar-free evening peak once everyone gets home. Click either bump on the curve below to see what is actually driving it.',
  },
  winter: {
    kicker: 'The contrast',
    heading: 'Winter looks nothing like it',
    body: 'Swap to winter and the two peaks disappear into a single elevated plateau. Heating demand runs high most of the day, solar is weak, and there is no midday dip to speak of. This is the shape most people still assume is normal year-round.',
  },
  spring: {
    kicker: 'The in-between',
    heading: 'Spring: the pattern arriving early',
    body: 'Spring is transitional — a smaller version of the summer shape starting to show up as cooling season and solar output both ramp in. The evening peak is present but muted, arriving earlier in the year than it used to.',
  },
  fall: {
    kicker: 'The in-between',
    heading: 'Fall: the pattern lingering late',
    body: 'Fall mirrors spring from the other direction — the two-peak shape fading out, but slower than it used to. EV charging habits do not taper off with the weather the way cooling load does, so the evening peak lingers.',
  },
}
