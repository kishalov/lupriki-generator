// features/alchemy/logic/nameGenerator.ts

import type { InventoryItem, Rarity } from "../hooks/useInventory"

/* -------------------------------- */
/* ПОЛУЧИТЬ ПЕРВЫЙ СЛОГ             */
/* -------------------------------- */
function extractRoot(word: string): string {
	const clean = word.toLowerCase().replace(/[^а-яё]/g, "")
	if (!clean) return ""

	const vowels = "аеёиоуыэюя"
	for (let i = 1; i < clean.length; i++) {
		if (vowels.includes(clean[i])) return clean.slice(0, i + 1)
	}
	return clean.slice(0, 2)
}

/* -------------------------------- */
/* ФОРМЫ ПО КОМБИНАЦИЯМ ТИПОВ       */
/* -------------------------------- */

export const FORM_BY_TYPES: Record<Rarity, Record<string, string>> = {

    common: {
        "anomaly+anomaly": "настой",
        "anomaly+mineral": "отвар",
        "anomaly+plant": "настой",
        "mineral+mineral": "зелье",
        "mineral+plant": "отвар",
        "plant+plant": "зелье",
    },

    rare: {
        "anomaly+anomaly+anomaly": "эликсир",
        "anomaly+anomaly+mineral": "эликсир",
        "anomaly+anomaly+plant": "эликсир",
        "anomaly+mineral+mineral": "концентрат",
        "anomaly+mineral+plant": "эликсир",
        "anomaly+plant+plant": "эликсир",
        "mineral+mineral+mineral": "концентрат",
        "mineral+mineral+plant": "концентрат",
        "mineral+plant+plant": "концентрат",
        "plant+plant+plant": "настойка",
    },

    epic: {
        "anomaly+anomaly+anomaly+anomaly": "эликсир",
        "anomaly+anomaly+anomaly+mineral": "эликсир",
        "anomaly+anomaly+анomaly+plant": "эликсир",
        "anomaly+anomaly+mineral+mineral": "конденсат",
        "anomaly+anomaly+mineral+plant": "эликсир",
        "anomaly+anomaly+plant+plant": "эликсир",
        "anomaly+mineral+mineral+mineral": "конденсат",
        "anomaly+mineral+mineral+plant": "конденсат",
        "anomaly+mineral+plant+plant": "эликсир",
        "anomaly+plant+plant+plant": "эликсир",
        "mineral+mineral+mineral+mineral": "конденсат",
        "mineral+mineral+mineral+plant": "конденсат",
        "mineral+mineral+plant+plant": "конденсат",
        "mineral+plant+plant+plant": "конденсат",
        "plant+plant+plant+plant": "артефакт",
    },
}

/* -------------------------------- */
/* РОД                              */
/* -------------------------------- */
const formGender: Record<string, "m" | "f" | "n"> = {
	"зелье": "n",
	"отвар": "m",
	"настой": "m",
	"настойка": "f",
	"концентрат": "m",
	"эликсир": "m",
	"конденсат": "m",
	"артефакт": "m",
}

const endingsByGender = {
	m: "ный",
	f: "ная",
	n: "ное",
}

/* -------------------------------- */
/* ОСНОВНАЯ ФУНКЦИЯ                 */
/* -------------------------------- */
export function generatePotionName(
    ingredients: InventoryItem[],
    rarity: Rarity,
    source: "cauldron" | "quest"
): string {
    if (!ingredients.length) {
        throw new Error("Нельзя создать зелье без ингредиентов")
    }

    // 1. Проверяем отсутствие типов сразу
    if (ingredients.some(i => !i.type)) {
        console.error("Ingredients with missing type:", ingredients)
        throw new Error("Ингредиент без типа — ошибка данных")
    }

    // 2. Сортировка (строго определяет порядок!)
    const sorted = [...ingredients].sort((a, b) => {
        if (a.type! !== b.type!) return a.type!.localeCompare(b.type!)
        return a.name.localeCompare(b.name)
    })

    // 3. Комбинация типов
    const typeCombo = sorted.map(i => i.type).join("+")

    const form = FORM_BY_TYPES[rarity][typeCombo]
    if (!form) {
        console.error("Unknown combination:", rarity, typeCombo)
        throw new Error("Комбинация типов не определена — ошибка таблицы")
    }

    // 4. Корни слов
    const roots = sorted.map(i => extractRoot(i.name.split(" ")[0]))
    const core = roots.join("")
    const capitalized = core.charAt(0).toUpperCase() + core.slice(1)

    // 5. Правильное окончание
    const gender = formGender[form]
    const ending = endingsByGender[gender]

    return `${capitalized}${ending} ${form}`
}
