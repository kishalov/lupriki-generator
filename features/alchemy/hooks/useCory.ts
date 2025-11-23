"use client"

import { create } from "zustand"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/features/auth/useUser"

type CoryState = {
	cory: number
	loading: boolean
	_syncing: boolean

	loadCory: () => Promise<void>
	addCory: (amount: number) => Promise<void>
	spendCory: (amount: number) => Promise<void>
}

export const useCory = create<CoryState>((set, get) => ({
	cory: 0,
	loading: false,
	_syncing: false,

	// -------------------------
	// ЗАГРУЗКА БАЛАНСА
	// -------------------------
	loadCory: async () => {
		const user = useUser.getState().user
		if (!user) return

		// Если идёт сохранение — не переписываем локальный баланс
		if (get()._syncing) return

		set({ loading: true })

		const { data, error } = await supabase
			.from("cory_wallet")
			.select("*")
			.eq("user_id", user.id)
			.single()

		// Если записи нет — создаём начальную
		if (error && error.code === "PGRST116") {
			const { data: created } = await supabase
				.from("cory_wallet")
				.insert({ user_id: user.id, cory: 0 })
				.select()
				.single()

			set({ cory: created.cory, loading: false })
			return
		}

		if (data) {
			set({ cory: data.cory })
		}

		set({ loading: false })
	},

	// -------------------------
	// ДОБАВИТЬ КОРУ
	// -------------------------
	addCory: async (amount) => {
		const user = useUser.getState().user
		if (!user) return

		const updated = get().cory + amount

		// Локально обновляем баланс
		set({ cory: updated, _syncing: true })

		// Сохраняем в БД
		await supabase
			.from("cory_wallet")
			.update({ cory: updated })
			.eq("user_id", user.id)

		set({ _syncing: false })
	},

	// -------------------------
	// СПИСАТЬ КОРУ
	// -------------------------
	spendCory: async (amount) => {
		const user = useUser.getState().user
		if (!user) return

		const current = get().cory

		// Недостаточно коры — ничего не делаем
		if (current < amount) return

		const updated = current - amount

		// Локальное обновление
		set({ cory: updated, _syncing: true })

		// Сохранение в БД
		await supabase
			.from("cory_wallet")
			.update({ cory: updated })
			.eq("user_id", user.id)

		set({ _syncing: false })
	},
}))
