"use client"

import { create } from "zustand"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/features/auth/useUser"
import { INGREDIENTS } from "@/features/alchemy/data/ingredients"
import { potionSvgs } from "@/features/alchemy/data/potionSvgs"
import { tintSvg } from "../logic/tintSvg"

export type Rarity = "common" | "rare" | "epic"

export type IngredientType = "plant" | "mineral" | "anomaly"

export type InventoryItem = {
	id: string
	name: string
	icon: string
	quantity: number
	rarity?: Rarity
	color?: string
	hue?: number
	flavor?: string
	type?: IngredientType
	ingredients?: {
		id: string
		name: string
		type: IngredientType
	}[]
}

/* ------------------------------ */
/* NORMALIZE RARITY               */
/* ------------------------------ */
export function normalizeRarity(raw: any, id: string): Rarity {
	if (raw === "common" || raw === 1) return "common"
	if (raw === "rare" || raw === 2) return "rare"
	if (raw === "epic" || raw === 3) return "epic"

	const parts = id.split("_")
	if (parts.includes("common")) return "common"
	if (parts.includes("rare")) return "rare"
	if (parts.includes("epic")) return "epic"

	return "common"
}

type InventoryState = {
	items: InventoryItem[]

	loadInventory: () => Promise<void>
	setInventory: (items: InventoryItem[]) => void
	addItem: (item: Omit<InventoryItem, "quantity" | "icon">, qty?: number) => Promise<void>
	removeItem: (id: string, qty?: number) => Promise<void>
}

/* ================================================================ */
/*                        MAIN STORE                                */
/* ================================================================ */

export const useInventory = create<InventoryState>((set, get) => ({
	items: [],

/* ------------------------------ */
/* LOAD INVENTORY                 */
/* ------------------------------ */
loadInventory: async () => {
	const user = useUser.getState().user
	if (!user) return

	const { data, error } = await supabase
		.from("inventory")
		.select("*")
		.eq("user_id", user.id)

	if (error) {
		console.error("Error loading inventory:", error)
		return
	}

	const items: InventoryItem[] = (data ?? []).map((row: any) => {
		const id = row.item_id as string
		const quantity = row.quantity ?? 0

		/* ----- POTIONS ----- */
		if (id.startsWith("potion_")) {
			const rarity = normalizeRarity(row.rarity, id)
			const color = row.color ?? "#ffffff"
			const name = row.name || id

			return {
				id,
				name,
				quantity,
				rarity,
				color,
				hue: row.hue ?? 0,
				icon: tintSvg(potionSvgs[rarity], color),

				// 🔥 зелья НЕ имеют типа
				type: undefined,
			}
		}

		/* ----- INGREDIENTS ----- */
		const ing = INGREDIENTS.find((i) => i.id === id)

		return {
			id,
			name: ing?.name ?? id,
			quantity,
			color: ing?.color,
			rarity: ing?.rarity as Rarity | undefined,
			flavor: ing?.flavor,
			icon: ing?.icon ?? `/images/ingredients/${id}.svg`,

			// 🔥 ингредиенты ВСЕГДА имеют тип
			type: ing?.type!,
		}
	})

	set({ items })
},

	/* ------------------------------ */
	/* SET INVENTORY                  */
	/* ------------------------------ */
	setInventory: (items) => set({ items }),

/* ------------------------------ */
/* ADD ITEM (ПРОСТО +QTY)         */
/* ------------------------------ */
addItem: async (item, qty = 1) => {
	const user = useUser.getState().user
	if (!user) return

	// ---- Локальное обновление ----
	set((state) => {
		const existing = state.items.find((i) => i.id === item.id)

		if (existing) {
			return {
				items: state.items.map((i) =>
					i.id === item.id
						? { ...i, quantity: i.quantity + qty }
						: i
				),
			}
		}

		const icon =
			item.id.startsWith("potion_") && item.rarity && item.color
				? tintSvg(potionSvgs[item.rarity], item.color)
				: INGREDIENTS.find((i) => i.id === item.id)?.icon ?? ""

		return {
			items: [...state.items, { ...item, quantity: qty, icon }],
		}
	})

	// ---- Синхронизация ----
	const finalItem = get().items.find((i) => i.id === item.id)
	const finalQty = finalItem?.quantity ?? qty

	// 🔥 СТРОГО ТОЛЬКО ПОЛЯ ИЗ ТАБЛИЦЫ
	const payload: any = {
		user_id: user.id,
		item_id: item.id,
		quantity: finalQty,
		color: item.color ?? null,
		hue: item.hue ?? null,
		rarity: item.rarity ?? null,
		name: item.name ?? null,
	}

	await supabase.from("inventory").upsert(payload)
},

/* ------------------------------ */
/* REMOVE ITEM                    */
/* ------------------------------ */
removeItem: async (id, qty = 1) => {
	const user = useUser.getState().user
	if (!user) return

	const target = get().items.find((i) => i.id === id)
	if (!target) return

	const newQty = target.quantity - qty

	// локальное обновление
	set((state) => {
		// предмет закончился полностью → убрать из массива
		if (newQty <= 0) {
			return {
				items: state.items.filter((i) => i.id !== id),
			}
		}

		// предмет ещё остаётся → просто уменьшаем количество
		return {
			items: state.items.map((i) =>
				i.id === id ? { ...i, quantity: newQty } : i
			),
		}
	})

	// синхронизация с БД
if (newQty <= 0) {
	// полностью удалить
	await supabase
		.from("inventory")
		.delete()
		.eq("user_id", user.id)
		.eq("item_id", id)

} else {
	// обновление количества
await supabase.from("inventory").upsert({
	user_id: user.id,
	item_id: id,
	quantity: newQty,
	color: target.color ?? null,
	rarity: target.rarity ?? null,
	hue: target.hue ?? null,
	name: target.name ?? null,
})

}

}

}))
