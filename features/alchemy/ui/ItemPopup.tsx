"use client"

import { Popup } from "./Popup"
import { useItemPopup } from "../hooks/useItemPopup"
import { ItemIcon } from "../ui/ItemIcon"
import { Button } from "@/components/ui/button"
import { useCauldron } from "../hooks/useCauldron"
import { useInventory } from "../hooks/useInventory"

export function ItemPopup() {
	const { item, closeItem } = useItemPopup()
	const addToCauldron = useCauldron((s) => s.addToCauldron)
	const removeItem = useInventory((s) => s.removeItem)

	if (!item) return null

	async function handleAddToCauldron() {
		if (!item) return
		if (item.id.startsWith("potion_")) return

		const ok = await addToCauldron(item.id)
		if (ok) {
			await removeItem(item.id, 1)
			closeItem()
		}
	}

	const isPotion = item.id.startsWith("potion_")

	return (
		<Popup isOpen={!!item} onClose={closeItem}>
			{/* Глушим только pointer события, БЕЗ stopPropagation */}
			<div
				className="flex flex-col gap-4 p-2 w-[280px]"
				style={{ touchAction: "manipulation" }} // ⚡ ключ к фиксe на мобилках
			>
				<div className="flex justify-center">
					<ItemIcon item={item} size={64} showQuantity={false} />
				</div>

				<p className="text-xl font-bold text-center text-black leading-5">
					{item.name}
				</p>

				{item.flavor && (
					<div className="text-black text-md text-center mt-2 opacity-80">
						{item.flavor}
					</div>
				)}

				{!isPotion && (
					<div className="flex justify-center lg:hidden">
						<Button onClick={handleAddToCauldron}>
							В котёл
						</Button>
					</div>
				)}
			</div>
		</Popup>
	)
}
