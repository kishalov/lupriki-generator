"use client"

import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/features/auth/useUser"
import { useInventory } from "@/features/alchemy/hooks/useInventory"

export function UserLoader() {
	const loadUser = useUser((s) => s.loadUser)

	useEffect(() => {
		// 1. При первом рендере пробуем восстановить юзера
		loadUser().then(() => {
			const user = useUser.getState().user
			if (user) {
				useInventory.getState().loadInventory()
			}
		})

		// 2. Подписка на изменения сессии
		const { data: subscription } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				const user = session?.user ?? null
				useUser.getState().setUser(user)

				if (user) {
					useInventory.getState().loadInventory()
				} else {
					useInventory.getState().setInventory([])
				}
			}
		)

		return () => {
			subscription.subscription.unsubscribe()
		}
	}, [loadUser])

	return null
}
