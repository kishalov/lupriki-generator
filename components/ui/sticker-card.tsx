import * as React from "react"
import { cn } from "@/lib/utils"

export function StickerCard({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sticker-card"
			className={cn(
				"sticker-9",
				className
			)}
			{...props}
		/>
	)
}
