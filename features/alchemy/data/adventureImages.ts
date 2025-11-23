import { CHARACTER_NAMES } from "./adventureData"

export const ADVENTURE_IMAGES = {
    start: [
        "/adventure/start/1.png",
        "/adventure/start/2.png",
        "/adventure/start/3.png",
    ],
    battle: [
        "/adventure/battle/1.png",
        "/adventure/battle/2.png",
        "/adventure/battle/3.png",
    ],
    anomaly: [
        "/adventure/anomaly/1.png",
        "/adventure/anomaly/2.png",
        "/adventure/anomaly/3.png",
    ],
} as const

export const ADVENTURE_HELP_IMAGES = {
	Пупо: "/adventure/help/pupo.png",
	Молпар: "/adventure/help/molpar.png",
	Карлос: "/adventure/help/karlos.png",
	Изюм: "/adventure/help/izyum.png",
	Корешок: "/adventure/help/koreshok.png",
	Питриц: "/adventure/help/pitritz.png",
} as const satisfies Record<(typeof CHARACTER_NAMES)[number], string>
