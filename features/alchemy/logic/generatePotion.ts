// features/alchemy/logic/generatePotion.ts

import { potionSvgs } from "../data/potionSvgs"
import { tintSvg } from "./tintSvg"
import { generatePotionName } from "./nameGenerator"
import type { InventoryItem, Rarity } from "../hooks/useInventory"

function hexToRgb(hex: string) {
	const c = hex.replace("#", "")
	return {
		r: parseInt(c.slice(0, 2), 16),
		g: parseInt(c.slice(2, 4), 16),
		b: parseInt(c.slice(4, 6), 16),
	}
}

function rgbToHex(r: number, g: number, b: number) {
	return (
		"#" +
		r.toString(16).padStart(2, "0") +
		g.toString(16).padStart(2, "0") +
		b.toString(16).padStart(2, "0")
	)
}

function mixColors(colors: string[]) {
	let R = 0, G = 0, B = 0
	for (const c of colors) {
		const { r, g, b } = hexToRgb(c)
		R += r; G += g; B += b
	}
	const n = colors.length
	return rgbToHex(Math.round(R/n), Math.round(G/n), Math.round(B/n))
}

export function generatePotion(ingredients: InventoryItem[]): InventoryItem {
	// Проверяем, что все ингредиенты имеют type
	if (ingredients.some(i => !i.type)) {
		console.error("Ingredient missing type:", ingredients);
		throw new Error("Ingredient missing type");
	}

	const colors = ingredients.map(i => i.color!).filter(Boolean);
	const rarity: Rarity =
		ingredients.length === 4 ? "epic" :
		ingredients.length === 3 ? "rare" : "common";

	const color = mixColors(colors.length ? colors : ["#ffffff"]);

	const id = `potion_${rarity}_${ingredients
    .map(i => i.id)
    .sort()
    .join("_")}`


	const name = generatePotionName(ingredients, rarity, "cauldron");

	return {
		id,
		name,
		quantity: 1,
		rarity,
		color,
		hue: colors.length,
		icon: tintSvg(potionSvgs[rarity], color),

		ingredients: ingredients.map(i => ({
			id: i.id,
			name: i.name,
			type: i.type!,
		})),
	};
}
