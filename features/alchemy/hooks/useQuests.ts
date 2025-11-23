"use client"

import { create } from "zustand"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/features/auth/useUser"
import { questGenerator } from "../logic/questGenerator"
import { useCory } from "./useCory"
import type { InventoryItem } from "@/features/alchemy/hooks/useInventory"

export type Quest = {
    id: string
    title: string
    description: string
    status: "new" | "accepted" | "completed"
    potion: {
        id: string
        name: string
        rarity: string
        color: string
        hue: number
        ingredients: InventoryItem[]
    }
}


type QuestsState = {
	quests: Quest[]
	activeQuests: Quest[]
	completedCount: number

	_loading: boolean

	loadQuests: () => Promise<void>
	generateQuests: () => Promise<void>
	acceptQuest: (id: string) => Promise<void>
	completeQuest: (id: string) => Promise<void>
	resetBoard: () => Promise<void>
}

function parseIngredients(raw: any): InventoryItem[] {
    if (!raw) return []
    if (Array.isArray(raw)) return raw
    try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export const useQuests = create<QuestsState>((set, get) => ({

	quests: [],
	activeQuests: [],
	completedCount: 0,
	_loading: false, // 🔸 ДОБАВЛЕНО

	/* ------------------------------------------------------------------ */
	/* LOAD FROM DB                                                       */
	/* ------------------------------------------------------------------ */
	loadQuests: async () => {
		const user = useUser.getState().user
		if (!user) return

		// 🔸 ЗАЩИТА ОТ ДВОЙНОГО ВЫЗОВА
		if (get()._loading) return
		set({ _loading: true })

		const { data, error } = await supabase
			.from("quests")
			.select("*")
			.eq("user_id", user.id)

		if (error) {
			console.error("LOAD QUESTS ERROR:", error)
			set({ _loading: false })
			return
		}

		// 🔸 ЕСЛИ ТАБЛИЦА ПУСТА → СОЗДАЁМ 3 КВЕСТА И ЗАГРУЖАЕМ ИХ
		if (!data || data.length === 0) {
			await get().generateQuests()

			const { data: fresh, error: freshError } = await supabase
				.from("quests")
				.select("*")
				.eq("user_id", user.id)

			if (freshError) {
				console.error("LOAD QUESTS AFTER GENERATE ERROR:", freshError)
				set({ _loading: false })
				return
			}

			if (!fresh) {
				set({ _loading: false })
				return
			}

			// 🔸 ВАЖНО: пользуемся potion_id из БД, НИКАКОГО questGenerator() тут
			const quests: Quest[] = fresh.map((row: any) => ({
				id: row.quest_id,
				title: row.title,
				description: row.description,
				status: row.status,
                potion: {
                    id: row.potion_id,
                    name: row.potion_name ?? "",
                    rarity: row.potion_rarity ?? "common",
                    color: row.potion_color ?? "#ffffff",
                    hue: row.potion_hue ?? 0,
                    ingredients: parseIngredients(row.ingredients),
                },
			}))

			set({
				quests,
				activeQuests: quests.filter((q) => q.status === "accepted"),
				completedCount: quests.filter((q) => q.status === "completed").length,
				_loading: false,
			})

			return
		}

		// 🔸 ЕСЛИ ТАБЛИЦА НЕ ПУСТА — ТОЖЕ БЕРЁМ potion_id ИЗ БД
		const quests: Quest[] = data.map((row: any) => ({
			id: row.quest_id,
			title: row.title,
			description: row.description,
			status: row.status,
            potion: {
                id: row.potion_id,
                name: row.potion_name ?? "",
                rarity: row.potion_rarity ?? "common",
                color: row.potion_color ?? "#ffffff",
                hue: row.potion_hue ?? 0,
                ingredients: parseIngredients(row.ingredients),
            },
		}))

		set({
			quests,
			activeQuests: quests.filter((q) => q.status === "accepted"),
			completedCount: quests.filter((q) => q.status === "completed").length,
			_loading: false,
		})
	},

	/* ------------------------------------------------------------------ */
	/* GENERATE 3 NEW QUESTS AND SAVE TO DB                               */
	/* ------------------------------------------------------------------ */
	generateQuests: async () => {
		const user = useUser.getState().user
		if (!user) return

		const created: Quest[] = []

		for (let i = 0; i < 3; i++) {
			const q = questGenerator()
			created.push(q)

            await supabase.from("quests").insert({
                user_id: user.id,
                quest_id: q.id,
                title: q.title,
                description: q.description,
                status: "new",

                potion_id: q.potion.id,
                potion_name: q.potion.name,
                potion_rarity: q.potion.rarity,
                potion_color: q.potion.color,
                potion_hue: q.potion.hue,
                ingredients: q.potion.ingredients, // ← массив JSON
            })
		}

		set({
			quests: created,
			activeQuests: [],
			completedCount: 0,
		})
	},

	/* ------------------------------------------------------------------ */
	/* ACCEPT                                                             */
	/* ------------------------------------------------------------------ */
	acceptQuest: async (id) => {
		const user = useUser.getState().user
		if (!user) return

		const quests = get().quests
		const quest = quests.find((q) => q.id === id)
		if (!quest) return

		quest.status = "accepted"

		await supabase
			.from("quests")
			.update({ status: "accepted" })
			.eq("user_id", user.id)
			.eq("quest_id", id)

		set({
			quests: [...quests],
			activeQuests: quests.filter((q) => q.status === "accepted"),
		})
	},

    /* ------------------------------------------------------------------ */
    /* COMPLETE                                                           */
    /* ------------------------------------------------------------------ */
    completeQuest: async (id) => {
        const user = useUser.getState().user
        if (!user) return

        const quests = get().quests
        const quest = quests.find((q) => q.id === id)
        if (!quest) return

        quest.status = "completed"

        // 1. Обновляем статус в базе
        await supabase
            .from("quests")
            .update({ status: "completed" })
            .eq("user_id", user.id)
            .eq("quest_id", id)

        // 2. Начисляем коры в зависимости от редкости
        let reward = 10
        if (quest.potion.rarity === "rare") reward = 15
        if (quest.potion.rarity === "epic") reward = 20

        const { addCory } = useCory.getState()
        await addCory(reward)

        // 3. Счётчик выполненных квестов
        const completed = get().completedCount + 1

        if (completed >= 3) {
            await get().resetBoard()
            return
        }

        set({
            quests: [...quests],
            activeQuests: quests.filter((q) => q.status === "accepted"),
            completedCount: completed,
        })
    },


	/* ------------------------------------------------------------------ */
	/* RESET BOARD                                                        */
	/* ------------------------------------------------------------------ */
	resetBoard: async () => {
		const user = useUser.getState().user
		if (!user) return

		await supabase.from("quests").delete().eq("user_id", user.id)

		await get().generateQuests()
	},
}))
