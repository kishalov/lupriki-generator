"use client"

import { useDroppable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import { Card, CardDescription } from "@/components/ui/card"
import { normalizeRarity } from "@/features/alchemy/hooks/useInventory"
import { useCauldron } from "@/features/alchemy/hooks/useCauldron"
import {
	useInventory,
	type InventoryItem,
	type IngredientType,
	type Rarity,
} from "@/features/alchemy/hooks/useInventory"

import { INGREDIENTS } from "@/features/alchemy/data/ingredients"
import { generatePotion } from "@/features/alchemy/logic/generatePotion"


export function Cauldron() {
	const { items: cauldronItems, clearCauldron } = useCauldron()
	const addItem = useInventory((s) => s.addItem)

	const { setNodeRef, isOver } = useDroppable({ id: "cauldron-drop" })

	/* -------------------------------------------------------------- */
	/* 👇 Собираем ПОЛНЫЕ данные ингредиентов по ID                   */
	/* -------------------------------------------------------------- */
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
				ingredients: undefined, // ингредиенты не имеют состава
				hue: 0,
			} as InventoryItem
		})
		.filter((i): i is InventoryItem => i !== null)
}


	/* -------------------------------------------------------------- */
	/* 🔥 ВАРИМ ЗЕЛЬЕ                                                 */
	/* -------------------------------------------------------------- */
	const handleCook = async () => {
		const fullIngredients = buildFullIngredients()

		if (fullIngredients.length < 2) return

		const potion = generatePotion(fullIngredients)

		await addItem(potion)
		await clearCauldron()
	}

	/* -------------------------------------------------------------- */
	/* ❌ ОТМЕНА — возвращаем ингредиенты                             */
	/* -------------------------------------------------------------- */
	const handleCancel = async () => {
		const invAdd = useInventory.getState().addItem
		const fullIngredients = buildFullIngredients()

		for (const ing of fullIngredients) {
			await invAdd({
				id: ing.id,
				name: ing.name,
				color: ing.color,
				rarity: ing.rarity,
				flavor: ing.flavor,
				type: ing.type, // IngredientType обязателен
			})
		}

		await clearCauldron()
	}

	return (
		<Card className="h-full flex flex-col items-baseline lg:items-center justify-between gap-6">
			<CardDescription>Котел Люпи</CardDescription>

			<div
				ref={setNodeRef}
				className={`relative flex items-center justify-center transition ${
					isOver ? "scale-105" : "scale-100"
				}`}
			>
				<img src="/images/cauldron.svg" className="w-full h-full" />

				{/* Иконки ингредиентов в котле */}
				<div className="absolute inset-0 grid grid-cols-2 grid-rows-2 place-items-center px-20 pb-15 pt-10 pointer-events-none">
					{cauldronItems.map((id) => {
						const item = INGREDIENTS.find((i) => i.id === id)
						if (!item) return null

						return (
							<img
								key={id}
								src={item.icon}
								className="w-15 h-15 drop-shadow-[-2px_4px_0_#000]/20"
							/>
						)
					})}
				</div>
			</div>

			<div className="flex gap-2 justify-between w-full">
				<Button onClick={handleCook}>
					<p>Сварить</p>
				</Button>
				<Button onClick={handleCancel}>
					<p>Отмена</p>
				</Button>
			</div>
		</Card>
	)
}
