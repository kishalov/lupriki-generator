"use client"

import type { InventoryItem } from "../hooks/useInventory"

type Props = {
	item: InventoryItem
	size?: number
	showQuantity?: boolean
}

function isInlineSvg(str: string | undefined): boolean {
	if (!str) return false
	return str.trim().startsWith("<svg")
}

export function ItemIcon({ item, size = 48, showQuantity = true }: Props) {
	const inline = isInlineSvg(item.icon)

	return (
		<div
			className="drop-shadow-[-2px_4px_0_#000]/20"
			style={{
				width: size,
				height: size,
				position: "relative",
				userSelect: "none",
			}}
		>
			{inline ? (
				<div
					style={{ width: "100%", height: "100%" }}
					dangerouslySetInnerHTML={{ __html: item.icon }}
				/>
			) : (
				<img
					src={item.icon}
					style={{ width: "100%", height: "100%" }}
					alt={item.name}
				/>
			)}

			{showQuantity && item.quantity > 1 && (
				<div
					style={{
						position: "absolute",
						bottom: -2,
						right: 2,
						fontSize: 20,
						fontWeight: "bold",
						color: "#fff",
						textShadow: "-2px 2px 0 #000",
					}}
				>
					{item.quantity}
				</div>
			)}
		</div>
	)
}
