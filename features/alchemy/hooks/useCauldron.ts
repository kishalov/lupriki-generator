"use client"

import { create } from "zustand"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/features/auth/useUser"

/*
  Таблица cauldron:
    user_id  |  item_id
*/

type CauldronState = {
	items: string[]         // только id предметов
	loadCauldron: () => Promise<void>
	addToCauldron: (itemId: string) => Promise<boolean>
	removeFromCauldron: (itemId: string) => Promise<void>
	clearCauldron: () => Promise<void>
}

export const useCauldron = create<CauldronState>((set, get) => ({
	items: [],

	loadCauldron: async () => {
		const user = useUser.getState().user
		if (!user) return

		const { data, error } = await supabase
			.from("cauldron")
			.select("item_id")
			.eq("user_id", user.id)

		if (error) return console.error(error)
		if (!data) return

		set({ items: data.map((i) => i.item_id) })
	},

	addToCauldron: async (itemId) => {
		const user = useUser.getState().user
		if (!user) return false

		const current = get().items

		if (current.includes(itemId)) return false
		if (current.length >= 4) return false

		const { error } = await supabase
			.from("cauldron")
			.insert({ user_id: user.id, item_id: itemId })

		if (error) {
			console.error(error)
			return false
		}

		set({ items: [...current, itemId] })
		return true
	},

	removeFromCauldron: async (itemId) => {
		const user = useUser.getState().user
		if (!user) return

		await supabase
			.from("cauldron")
			.delete()
			.eq("user_id", user.id)
			.eq("item_id", itemId)

		set({
			items: get().items.filter((i) => i !== itemId),
		})
	},

	clearCauldron: async () => {
		const user = useUser.getState().user
		if (!user) return

		await supabase
			.from("cauldron")
			.delete()
			.eq("user_id", user.id)

		set({ items: [] })
	},
}))
