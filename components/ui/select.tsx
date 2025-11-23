"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from "@/lib/utils"

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

// ---------- Trigger ----------
export function SelectTrigger({
	className,
	children,
	tooltip,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & { tooltip?: string }) {
	return (
		<SelectPrimitive.Trigger
			className={cn(
				"relative select-9 flex items-center justify-between w-full cursor-pointer z-51 group select-none",
				"text-[20px]",
				className
			)}
			{...props}
		>
			{children}

			{/* Иконка ▼ */}
			<SelectPrimitive.Icon asChild>
				<img
					src="/icons/down.svg"
					className="w-10 h-10 group-hover:scale-110 group-active:scale-90 transition select-none"
				/>
			</SelectPrimitive.Icon>

			{/* --- ТУЛТИП ДЛЯ СЕЛЕКТА --- */}
			{tooltip && (
				<span
					className="
						absolute left-1/2 -translate-x-1/2 bottom-[calc(100%)]
						opacity-0 pointer-events-none
						translate-y-2
						transition-all duration-200
						dialog-9
						group-hover:opacity-100 group-hover:translate-y-0
						text-lg text-shadow-none text-black leading-5 uppercase
						z-9999
					"
				>
					{tooltip}
				</span>
			)}
		</SelectPrimitive.Trigger>
	)
}

// ---------- Content ----------
export function SelectContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				side="bottom"
				align="center"
				position="popper"
				className={cn(
					"slide-down-9 z-50",
					"w-[calc(var(--radix-select-trigger-width)*0.95)]",
					"data-[state=open]:-translate-y-5 data-[state=closed]:translate-y-0",
					className
				)}
				{...props}
			>
				<SelectPrimitive.Viewport className="p-1">
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

// ---------- Item ----------
export function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			className={cn(
				"cursor-pointer px-3 py-2 hover:border-2 hover:border-black rounded-md text-[20px] select-none",
				className
			)}
			{...props}
		>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
}
