"use client"

import { Popup } from "./Popup"
import { useItemPopup } from "../hooks/useItemPopup"
import { ItemIcon } from "../ui/ItemIcon"

export function ItemPopup() {
	const { item, closeItem } = useItemPopup()

	if (!item) return null

	return (
		<Popup isOpen={!!item} onClose={closeItem}>
			<div
				className="flex flex-col gap-3 w-[280px]"
				style={{ touchAction: "manipulation" }}
			>
				{/* Иконка */}
				<div className="flex justify-center">
					<ItemIcon item={item} size={64} showQuantity={false} />
				</div>

				{/* Название */}
				<p className="text-xl font-bold text-center text-black leading-5">
					{item.name}
				</p>

				{/* Описание */}
				{item.flavor && (
					<div className="text-black text-md text-center leading-5">
						{item.flavor}
					</div>
				)}
			</div>
		</Popup>
	)
}
