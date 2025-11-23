"use client"

import { useDraggable } from "@dnd-kit/core"
import type { InventoryItem } from "../hooks/useInventory"
import { ItemIcon } from "./ItemIcon"
import { useItemPopup } from "../hooks/useItemPopup"

type SlotProps = {
	item?: InventoryItem
}

export function InventorySlot({ item }: SlotProps) {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: item ? `inv-${item.id}` : "empty",
		data: item ? { item: { ...item, quantity: 1 } } : undefined,
		disabled: !item,
	})

	const { openItem } = useItemPopup()

	function handleClick(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation()
		if (!item) return
		openItem(item)
	}

	return (
		<div className="relative w-20 h-20 flex items-center justify-center slot-9 select-none">
			{item && (

				<div
					ref={setNodeRef}
					{...attributes}
					{...listeners}
					onClick={() => item && openItem(item)}
					className="w-20 h-20 flex items-center justify-center cursor-pointer"
				>
					<ItemIcon item={item} />
				</div>

			)}
		</div>
	)
}
