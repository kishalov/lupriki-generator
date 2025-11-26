"use client"

import { useEffect, useState } from "react"
import { useDroppable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"

import { normalizeRarity } from "@/features/alchemy/hooks/useInventory"
import {
	useInventory,
	type InventoryItem,
} from "@/features/alchemy/hooks/useInventory"

import { useCauldron } from "@/features/alchemy/hooks/useCauldron"
import { INGREDIENTS } from "@/features/alchemy/data/ingredients"
import { generatePotion } from "@/features/alchemy/logic/generatePotion"

import { BrewRunner } from "./BrewRunner"
import { BrewMiniGameUI } from "./BrewMiniGameUI"
import { useBrewMachine } from "../hooks/useBrewMiniGame"


// --------------------------------------------------------------
// Рандомная позиция в области котла (проценты от контейнера)
// --------------------------------------------------------------
function randomPos() {
	return {
		x: 30 + Math.random() * 40, // хаотично, но не вылезает за края
		y: 38 + Math.random() * 32,
		rot: Math.random() * 30 - 15,
	}
}


export function Cauldron() {
	const { items: cauldronItems, clearCauldron } = useCauldron()
	const addItem = useInventory((s) => s.addItem)

	const { setNodeRef, isOver } = useDroppable({ id: "cauldron-drop" })

	const {
		state,
		send,
		isIdle,
		isRunning,
		temp,
		timeLeft,
		threshold,
		result,
	} = useBrewMachine()


	// ---- Тип позиции ингредиента ----
	type CauldronPos = { x: number; y: number; rot: number }

	// ---- Проценты зоны воды ----
	const WATER_TOP = 20
	const WATER_BOTTOM = 20
	const X_SLOTS = [30, 45, 55, 70]

	// ---- Генерация позиций ----
	function generatePositions(ids: string[]): Record<string, CauldronPos> {
		const pos: Record<string, CauldronPos> = {}

		ids.forEach((id, index) => {
			const x = X_SLOTS[index] ?? 50
			const y = WATER_TOP + Math.random() * (WATER_BOTTOM - WATER_TOP)
			pos[id] = { x, y, rot: Math.random() * 20 - 10 }
		})

		return pos
	}

	// ---- Состояние (ВАЖНО: типизация!) ----
	const [positions, setPositions] = useState<Record<string, CauldronPos>>({})

	// ---- Генерация при изменении состава котла ----
	useEffect(() => {
		setPositions(generatePositions(cauldronItems))
	}, [cauldronItems])

	// --------------------------------------------------------------
	// Собираем полные данные ингредиентов
	// --------------------------------------------------------------
	function buildFullIngredients(): InventoryItem[] {
		return cauldronItems
			.map((id) => {
				const ing = INGREDIENTS.find((i) => i.id === id)
				if (!ing) return null

				return {
					id: ing.id,
					name: ing.name,
					icon: ing.icon,
					quantity: 1,
					color: ing.color,
					rarity: normalizeRarity(ing.rarity, ing.id),
					flavor: ing.flavor,
					type: ing.type,
					ingredients: undefined,
					hue: 0,
				} as InventoryItem
			})
			.filter((i): i is InventoryItem => i !== null)
	}


	// --------------------------------------------------------------
	// Обработка результата игры
	// --------------------------------------------------------------
	const [isProcessingResult, setIsProcessingResult] = useState(false)

	useEffect(() => {
		if (result === null) return

		setIsProcessingResult(true)

		const ingredients = buildFullIngredients()
		const success = result === "success"

		;(async () => {
			await clearCauldron()
			setPositions({})

			if (success) {
				const potion = generatePotion(ingredients)
				await addItem(potion)
			}

			setIsProcessingResult(false)

			// сбрасываем результат
			send({ type: "CLEAR_RESULT" })
		})()
	}, [result])


	// --------------------------------------------------------------
	// Кнопка "Варить"/"Поддать жару"
	// --------------------------------------------------------------
	const onCookPress = () => {
		if (isProcessingResult) return

		if (isRunning) {
			if (timeLeft > 0) send({ type: "INCREASE" })
			return
		}

		if (result !== null) return
		if (cauldronItems.length < 2) return

		send({ type: "START", count: cauldronItems.length })
	}

	const cookDisabled =
		isProcessingResult ||
		(!isRunning &&
			(result !== null || cauldronItems.length < 2))

	const cookLabel = isRunning ? "Поддать жару" : "Варить"


	// --------------------------------------------------------------
	// Отмена
	// --------------------------------------------------------------
	const handleCancel = async () => {
		if (isRunning || isProcessingResult) return

		const invAdd = useInventory.getState().addItem
		const list = buildFullIngredients()

		for (const ing of list) {
			await invAdd({
				id: ing.id,
				name: ing.name,
				color: ing.color,
				rarity: ing.rarity,
				flavor: ing.flavor,
				type: ing.type,
			})
		}

		await clearCauldron()
		setPositions({})
	}


	// --------------------------------------------------------------
	// UI
	// --------------------------------------------------------------
	return (
		<div className="h-full flex flex-col items-baseline lg:items-center justify-between gap-6">
			<CardDescription>Котёл Люпи</CardDescription>

			<div className="flex gap-6 items-center">
				<div
					ref={setNodeRef}
					className={`relative w-[200px] h-[100px] lg:w-[353px] lg:h-[235px] transition ${
						isOver ? "scale-105" : "scale-100"
					}`}
				>

					{/* ---- Задняя часть котла ---- */}
					<img
						src="/images/cauldron-back.svg"
						className="absolute inset-0 z-10 pointer-events-none"
					/>

					{/* ---- Ингредиенты внутри котла ---- */}
					<div className="absolute inset-0 z-20 pointer-events-none">
						{cauldronItems.map((id) => {
							const item = INGREDIENTS.find((i) => i.id === id)
							const pos = positions[id]
							if (!item || !pos) return null

							return (
								<img
									key={id}
									src={item.icon}
									className="absolute w-15 h-15 float drop-shadow-[-2px_4px_0_#000]/0"
									style={{
										left: `${pos.x}%`,
										top: `${pos.y}%`,
										transform: `translate(-50%, -50%) rotate(${pos.rot}deg)`,
										"--rot": `${pos.rot}deg`,
									} as any}
								/>
							)
						})}
					</div>

					{/* ---- Вода ---- */}
					<img
						src="/images/cauldron-water.svg"
						className="absolute inset-0 z-30 pointer-events-none"
					/>

					{/* ---- Передняя часть ---- */}
					<img
						src="/images/cauldron-front.svg"
						className="absolute inset-0 z-40 pointer-events-none"
					/>
				</div>

				<BrewRunner
					isRunning={isRunning}
					onTick={(dt) => send({ type: "TICK", dt })}
				/>

				<BrewMiniGameUI
					temp={temp}
					timeLeft={timeLeft}
					threshold={threshold}
					isRunning={isRunning}
				/>
			</div>

			<div className="flex gap-2 justify-between w-full">
				<Button
					onClick={onCookPress}
					disabled={cookDisabled}
					className={isRunning ? "text-[#fb6950]" : ""}
				>
					<p>{cookLabel}</p>
				</Button>

				<Button onClick={handleCancel} disabled={isRunning || isProcessingResult}>
					<p>Отмена</p>
				</Button>
			</div>
		</div>
	)
}
