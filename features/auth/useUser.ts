"use client"

import { create } from "zustand"
import { supabase } from "@/lib/supabaseClient"
import type { User } from "@supabase/supabase-js"

type UserState = {
	user: User | null
	loading: boolean

	setUser: (u: User | null) => void
	loadUser: () => Promise<void>
}

export const useUser = create<UserState>((set) => ({
	user: null,
	loading: true,

	setUser: (u) => set({ user: u }),

	loadUser: async () => {
		const { data, error } = await supabase.auth.getUser()

		if (error) {
			console.error("Error loading user:", error)
		}

		set({
			user: data?.user ?? null,
			loading: false,
		})
	},
}))
