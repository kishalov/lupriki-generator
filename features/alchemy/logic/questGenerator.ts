// features/alchemy/logic/questGenerator.ts

import { INGREDIENTS } from "../data/ingredients"
import {
	CHARACTER_NAMES,
	CHARACTERS,          // m | f | n
	QUEST_PURPOSES_M,
	QUEST_PURPOSES_F,
	QUEST_PURPOSES_N,
	pick,
} from "../data/adventureData"

import { generatePotionName } from "./nameGenerator"
import type { InventoryItem, Rarity } from "../hooks/useInventory"

/* -----------------------------------------------
    Определяем род ЗЕЛЬЯ (по названию)
----------------------------------------------- */
function detectPotionGender(name: string): "m" | "f" | "n" {
	const w = name.trim().toLowerCase()

	if (w.endsWith("а") || w.endsWith("я")) return "f"
	if (w.endsWith("о") || w.endsWith("е")) return "n"
	return "m"
}

const NEED_WORD: Record<"m" | "f" | "n", string> = {
	m: "нужен",
	f: "нужна",
	n: "нужно",
}

/* -----------------------------------------------
    Генерация случайных ингредиентов
    (у предметов НЕТ rarity!)
----------------------------------------------- */
export function randomIngredients(): InventoryItem[] {
	const count = Math.random() < 0.5 ? 2 : 3

	const ing = [...INGREDIENTS]
		.sort(() => Math.random() - 0.5)
		.slice(0, count)

	return ing.map((i) => ({
		id: i.id,
		name: i.name,
		color: i.color,
		icon: i.icon,
		quantity: 1,
		type: i.type,
		// ⛔ rarity НЕ добавляем!
	}))
}

/* -----------------------------------------------
    Генератор квеста
----------------------------------------------- */
export function questGenerator() {
	const ing = randomIngredients()

	// редкость относится только к ЗЕЛЬЮ
	const rarity: Rarity =
		ing.length === 3 ? "rare" : "common"

	const potionName = generatePotionName(ing, rarity, "quest")
	const potionId = ing.map((i) => i.id).sort().join("_")

	/* -----------------------------------------------
		Персонаж и его род
	----------------------------------------------- */
	const character = pick(CHARACTER_NAMES)
	const gender = CHARACTERS[character] // m | f | n

	/* -----------------------------------------------
		Цель квеста по полу персонажа
	----------------------------------------------- */
	let purpose: string

	if (gender === "m") purpose = pick(QUEST_PURPOSES_M)
	else if (gender === "f") purpose = pick(QUEST_PURPOSES_F)
	else purpose = pick(QUEST_PURPOSES_N)

	/* -----------------------------------------------
		Морфология для зелья
	----------------------------------------------- */
	const potionGender = detectPotionGender(potionName)
	const need = NEED_WORD[potionGender]

	/* -----------------------------------------------
		Описание квеста
	----------------------------------------------- */
	const description = `Персонажу ${character} ${need} "${potionName}" чтобы ${purpose}.`

	/* -----------------------------------------------
		Возврат итогового объекта квеста
	----------------------------------------------- */
	return {
		id: crypto.randomUUID(),

		title: `Требуется ${potionName.toLowerCase()}`,
		description,
		status: "new" as const,

		potion: {
			id: `potion_${rarity}_${potionId}`,
			name: potionName,
			rarity,
			color: ing[0].color ?? "#ffffff",
			hue: ing.length,
			ingredients: ing, // предметы без rarity
		},
	}
}
