"use client"

import { create } from "zustand"
import type { InventoryItem } from "@/features/alchemy/hooks/useInventory"
import { INGREDIENTS } from "@/features/alchemy/data/ingredients"

type ShopState = {
	items: InventoryItem[]
	generate: () => void
	getSellPrice: (item: InventoryItem) => number
	getBuyPrice: (item: InventoryItem) => number
}

export const useShop = create<ShopState>((set, get) => ({

	items: [],

	// ----------------------------------------------------
	// Генерация случайных предметов (3–5)
	// ----------------------------------------------------
	generate: () => {
		const count = 3 + Math.floor(Math.random() * 3)

		const pool = [...INGREDIENTS].sort(() => Math.random() - 0.5)
		const picked = pool.slice(0, count)

		const converted: InventoryItem[] = picked.map((i) => ({
			id: i.id,
			name: i.name,
			icon: i.icon,
			color: i.color,
			quantity: 1,
			type: i.type,       // "plant" | "mineral" | "anomaly"
			// Даже если в исходных данных есть rarity —
			// мы для лавки его НЕ задаём.
			rarity: undefined,
		}))

		set({ items: converted })
	},

	// ----------------------------------------------------
	// Цена продажи игроком
	// ----------------------------------------------------
	getSellPrice: (item) => {
		// 1) Сначала проверяем: это зелье или нет
		const isPotion =
			typeof item.id === "string" && item.id.startsWith("potion_")

		// ЗЕЛЬЯ: считаем только по rarity, и ТОЛЬКО если это potion_*
		if (isPotion && item.rarity) {
			if (item.rarity === "common") return 8
			if (item.rarity === "rare") return 10
			return 12 
		}

		// ПРЕДМЕТЫ: цена по type
		if (item.type === "plant") return 3
		if (item.type === "mineral") return 5
		if (item.type === "anomaly") return 7

		// запасной вариант
		return 3
	},

	// ----------------------------------------------------
	// Цена покупки в лавке
	// ----------------------------------------------------
	getBuyPrice: (item) => {
		const sell = get().getSellPrice(item)
		return sell + 10
	},
}))
