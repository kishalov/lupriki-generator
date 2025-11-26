"use client"

import { useEffect } from "react"
import { useUser } from "@/features/auth/useUser"

// загрузчики
import { useInventory } from "@/features/alchemy/hooks/useInventory"
import { useCauldron } from "@/features/alchemy/hooks/useCauldron"
import { useCory } from "@/features/alchemy/hooks/useCory"
import { useQuests } from "@/features/alchemy/hooks/useQuests"

// UI
import { PopupLayer } from "@/features/alchemy/components/PopupLayer"
import { ItemPopup } from "@/features/alchemy/ui/ItemPopup"

export default function AlchemyLayout({ children }: { children: React.ReactNode }) {
	
	const user = useUser((s) => s.user)

	const loadInventory = useInventory((s) => s.loadInventory)
	const loadCauldron = useCauldron((s) => s.loadCauldron)
	const loadCory = useCory((s) => s.loadCory)
	const loadQuests = useQuests((s) => s.loadQuests)

	// -------------------------------
	// Загружаем данные один раз
	// -------------------------------
	useEffect(() => {
		if (!user) return

		loadInventory()
		loadCauldron()
		loadCory()
		loadQuests()
	}, [user])

	// -------------------------------
	// Рендер
	// -------------------------------
	return (
		<>
			{children}

			{/* Глобальный слой попапов */}
		

			{/* Попап предмета */}
			<ItemPopup />
		</>
	)
}
