"use client"

import { useInventory } from "../hooks/useInventory"
import { Card, CardDescription } from "@/components/ui/card"
import { InventorySlot } from "../ui/InventorySlot"
import { useCory } from "../hooks/useCory"
import { StickerCard } from "@/components/ui/sticker-card"

export function Inventory() {
	const { items } = useInventory()
	const cory = useCory((s) => s.cory)

	// Минимальное количество слотов, которое хотим отображать
	const MIN_SLOTS = 1

	// Количество пустых слотов
	const emptySlotsCount = Math.max(0, MIN_SLOTS - items.length)

	const filledSlots = items.map((item) => (
		<InventorySlot key={item.id} item={item} />
	))

	const emptySlots = Array.from({ length: emptySlotsCount }).map((_, i) => (
		<InventorySlot key={`empty-${i}`} />
	))

	return (
		<StickerCard className="h-full overflow-y-auto overflow-x-hidden flex flex-col items-center gap-3 pr-3 scrollbar-9">
			<div className="w-full flex items-center justify-between">
				<p className="text-[32px]">Инвентарь</p>
					<div className="flex gap-2 items-center">
						<img src="/images/kory.png" className="w-8 h-full" />
						<p className="text-[32px]">{cory}</p>
					</div>
			</div>

			<div className="grid grid-cols-3 lg:grid-cols-7 gap-2">
				{[...filledSlots, ...emptySlots]}
			</div>
		</StickerCard>
	)
}
