"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	tooltip?: string
}

export function Button({ className, tooltip, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(
				"relative",
				"btn-9 font-bold uppercase text-[16px] flex items-center justify-center w-full text-white select-none group",
				"hover:btn-9-hover active:btn-9-active disabled:opacity-35",
				"btn-children-press",
				"text-shadow-[0_-1px_0_#000,0_1px_0_#000,1px_0_0_#000,-1px_0_0_#000]",
				"p-2",
				"[&_img]:w-10 [&_img]:h-10",
				className
			)}
		>
			{props.children}

			{/* Тултип */}
			{tooltip && (
				<span
					className="
						absolute left-1/2 -translate-x-1/2 bottom-[calc(100%)]
						opacity-0 pointer-events-none
						translate-y-2
						transition-all duration-200
						dialog-9
						group-hover:opacity-100 group-hover:translate-y-0
						text-lg text-shadow-none text-black leading-5 font-normal
					"
				>
					{tooltip}
				</span>
			)}
		</button>
	)
}
