"use client"

import {
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core"
import { useEffect, useState } from "react"
import { useCauldron } from "@/features/alchemy/hooks/useCauldron"
import { useInventory } from "@/features/alchemy/hooks/useInventory"
import { useUser } from "@/features/auth/useUser"
import { ItemIcon } from "@/features/alchemy/ui/ItemIcon"
import { PopupLayer } from "@/features/alchemy/components/PopupLayer"
import { ItemPopup } from "@/features/alchemy/ui/ItemPopup"
import { useCory } from "@/features/alchemy/hooks/useCory"
import { useQuests } from "@/features/alchemy/hooks/useQuests"

export default function AlchemyLayout({ children }: { children: React.ReactNode }) {
	const addToCauldron = useCauldron((s) => s.addToCauldron)
	const loadCauldron = useCauldron((s) => s.loadCauldron)

	const removeItem = useInventory((s) => s.removeItem)
	const addItem = useInventory((s) => s.addItem)
	const loadInventory = useInventory((s) => s.loadInventory)

	const user = useUser((s) => s.user)

	const [dragItem, setDragItem] = useState<any>(null)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { delay: 150, tolerance: 5 }
		})
	)

	const loadCory = useCory((s) => s.loadCory)

	const loadQuests = useQuests((s) => s.loadQuests)
	
	useEffect(() => {
		if (user) {
			loadInventory()
			loadCauldron()
			loadCory()
			loadQuests()
		}
	}, [user])

	return (
		<>
			<DndContext
				sensors={sensors}
				onDragStart={(event) => {
					const item = event.active.data.current?.item
					if (item) setDragItem(item)
				}}
				onDragEnd={async (event) => {
    const item = event.active.data.current?.item
    const over = event.over?.id

    if (!item) {
        setDragItem(null)
        return
    }

    // ❌ Зелья нельзя класть в котёл — блокируем полностью
    if (item.id.startsWith("potion_")) {
        setDragItem(null)
        return
    }

    // ✔ Попало в котёл
    if (over === "cauldron-drop") {
        const ok = await addToCauldron(item.id)
        if (ok) await removeItem(item.id, 1)
    } else {
        // ✔ Не попало — ничего не делаем
    }

    setDragItem(null)
}}

				onDragCancel={() => setDragItem(null)}
			>
				{children}

				<DragOverlay>
					{dragItem && <ItemIcon item={dragItem} size={72} />}
				</DragOverlay>
			</DndContext>

			<PopupLayer />
			<ItemPopup />
		</>
	)
}
