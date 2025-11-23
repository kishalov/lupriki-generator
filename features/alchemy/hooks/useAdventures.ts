"use client"

import { create } from "zustand"
import { ADVENTURE_HELP_IMAGES } from "../data/adventureImages"
import {
	LOCATIONS,
	EVENTS,
	ZLOBEN_NAMES,
	CHARACTER_NAMES,
	PROBLEMS,
	DIMENSIONS,
	getRandomIngredient,
	pick,
} from "../data/adventureData"

import { ADVENTURE_IMAGES } from "../data/adventureImages"
import {
	PHRASES_START,
	PHRASES_MIDDLE,
	PHRASES_SUDDEN,
	PH_BATTLE_ENCOUNTER,
	PH_BATTLE_VICTORY,
	PH_BATTLE_REWARD,
	PH_HELP_ENCOUNTER,
	PH_HELP_PROBLEM,
	PH_HELP_RESOLVE,
	PH_HELP_REWARD,
	PH_ANOMALY_PORTAL,
	PH_ANOMALY_ENTER,
	PH_ANOMALY_REWARD,
} from "../data/adventurePhrases"

import { INGREDIENTS } from "@/features/alchemy/data/ingredients"
import type { InventoryItem } from "./useInventory"

// ------------------------------
// МАППЕР 1 | 2 | 3 → "common"
// ------------------------------
function rarityNumberToName(r: 1 | 2 | 3 | undefined) {
	if (r === 1) return "common"
	if (r === 2) return "rare"
	if (r === 3) return "epic"
	return undefined
}

// ------------------------------
// Ingredient → InventoryItem
// ------------------------------
function ingredientToItem(ing: ReturnType<typeof getRandomIngredient>): InventoryItem {
	const original = INGREDIENTS.find((i) => i.id === ing.id)

	return {
		id: ing.id,
		name: ing.name,
		icon: ing.icon,
		quantity: 1,
		rarity: rarityNumberToName(original?.rarity),
		color: original?.color,
		hue: undefined,
	}
}

type Step = {
	text: string
	image?: string
}

type AdventureState = {
	isRunning: boolean
	steps: Step[]
	rewards: InventoryItem[]
	currentStep: number

	startAdventure: () => void
	nextStep: () => void
	reset: () => void
	claimRewards: () => InventoryItem[]
}

export const useAdventure = create<AdventureState>((set, get) => ({
	isRunning: false,
	steps: [],
	rewards: [],
	currentStep: 0,

	// ------------------------------
	// СТАРТ ПРИКЛЮЧЕНИЯ
	// ------------------------------
	startAdventure: () => {
		const steps: Step[] = []
		const rewards: InventoryItem[] = []

		// ——————————————
		// ШАГ 1: Локация
		// ——————————————
		const location = pick(LOCATIONS)

		steps.push({
			text: `Люпи отправился в ${location}.`,
			image: pick(ADVENTURE_IMAGES.start),
		})

		// ——————————————
		// События (0–3)
		// ——————————————
		const eventCount = Math.floor(Math.random() * 4)

		const chosenEvents = [...EVENTS]
			.sort(() => Math.random() - 0.5)
			.slice(0, eventCount)

		let eventIndex = 0

		chosenEvents.forEach((event) => {
			const rewardIng = getRandomIngredient()
			const reward = ingredientToItem(rewardIng)
			rewards.push(reward)

			// Вводная (кроме аномалий)
			let intro = ""

			if (event !== "аномалия") {
				const isFirst = eventIndex === 0
				intro = isFirst ? pick(PHRASES_START) : pick(PHRASES_MIDDLE)
				eventIndex++
			}

	// ——————————————
	// БОЙ
	// ——————————————
	if (event === "бой") {
		const zloben = pick(ZLOBEN_NAMES)
		const battleImage = pick(ADVENTURE_IMAGES.battle) 

		steps.push({
			text: `${intro} ${pick(PH_BATTLE_ENCOUNTER)} ${zloben}.`,
			image: battleImage,
		})

		steps.push({
			text: pick(PH_BATTLE_VICTORY),
			image: battleImage,
		})

		steps.push({
			text: `${pick(PH_BATTLE_REWARD)}: ${reward.name}.`,
			image: battleImage,
		})
	}

	if (event === "помощь") {
		const char = pick(CHARACTER_NAMES)
		const problem = pick(PROBLEMS)

		// Картинка только персональная, без fallback
		const helpImage = ADVENTURE_HELP_IMAGES[char]

		steps.push({
			text: `${intro} ${pick(PH_HELP_ENCOUNTER)} ${char}.`,
			image: helpImage,
		})

		steps.push({
			text: `${char} ${pick(PH_HELP_PROBLEM)} ${problem}.`,
			image: helpImage,
		})

		steps.push({
			text: pick(PH_HELP_RESOLVE),
			image: helpImage,
		})

		steps.push({
			text: `${pick(PH_HELP_REWARD)} ${char} подарил Люпи предмет: ${reward.name}.`,
			image: helpImage,
		})
	}

	// ——————————————
	// АНОМАЛИЯ
	// ——————————————
	if (event === "аномалия") {
		const dimension = pick(DIMENSIONS)
		const sudden = pick(PHRASES_SUDDEN)
		const anomalyImage = pick(ADVENTURE_IMAGES.anomaly)

		steps.push({
			text: `${sudden} ${pick(PH_ANOMALY_PORTAL)}`,
			image: anomalyImage,
		})

		steps.push({
			text: `${pick(PH_ANOMALY_ENTER)} ${dimension}.`,
			image: anomalyImage,
		})

		steps.push({
			text: `${pick(PH_ANOMALY_REWARD)}: ${reward.name}.`,
			image: anomalyImage,
		})
	}

		})

		// ——————————————
		// ФИНАЛ
		// ——————————————
		const finalIng = getRandomIngredient()
		const finalReward = ingredientToItem(finalIng)
		rewards.push(finalReward)

		if (chosenEvents.length > 0) {
			steps.push({
				text: `И наконец Люпи пришёл куда хотел и нашёл там предмет: ${finalReward.name}.`,
			})
		} else {
			steps.push({
				text: `Там он нашёл предмет: ${finalReward.name}.`,
			})
		}

		set({
			isRunning: true,
			steps,
			rewards,
			currentStep: 0,
		})
	},

	// ------------------------------
	nextStep: () =>
		set((state) => ({
			currentStep: state.currentStep + 1,
		})),

	// ------------------------------
	reset: () =>
		set({
			isRunning: false,
			steps: [],
			rewards: [],
			currentStep: 0,
		}),

	// ------------------------------
	claimRewards: () => {
		const { rewards } = get()

		set({
			isRunning: false,
			steps: [],
			rewards: [],
			currentStep: 0,
		})

		return rewards
	},
}))
