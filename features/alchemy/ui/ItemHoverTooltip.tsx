"use client"

import { useState, useRef, useEffect } from "react"
import { TooltipPortal } from "../logic/TooltipPortal"

export function ItemHoverTooltip({
	text,
	children,
}: {
	text: string
	children: React.ReactElement
}) {
	const [visible, setVisible] = useState(false)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleMove(e: MouseEvent) {
			setPos({ x: e.clientX, y: e.clientY })
		}
		if (visible) {
			window.addEventListener("mousemove", handleMove)
		}
		return () => window.removeEventListener("mousemove", handleMove)
	}, [visible])

	return (
		<div
			ref={ref}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
			style={{ display: "inline-block" }}
		>
			{children}

			{visible && (
				<TooltipPortal>
					<div
						className="
							dialog-9 fixed z-9999
							text-black text-sm
							pointer-events-none
							transition-opacity duration-100 
						"
						style={{
							left: pos.x,
							top: pos.y - 50,
						}}
					>
						{text}
					</div>
				</TooltipPortal>
			)}
		</div>
	)
}
