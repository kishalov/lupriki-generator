"use client"

import { StickerCard } from "@/components/ui/sticker-card"
import { Button } from "@/components/ui/button"
import { useQuests } from "../hooks/useQuests"
import { useInventory } from "@/features/alchemy/hooks/useInventory"
import type { Quest } from "../hooks/useQuests"

export function Notebook() {
	const activeQuests = useQuests((s) => s.activeQuests)
	const completeQuest = useQuests((s) => s.completeQuest)

	const items = useInventory((s) => s.items)
	const removeItem = useInventory((s) => s.removeItem)

	function handleComplete(quest: Quest) {
		const potionId = quest.potion.id

		const hasPotion = items.some(
			(i) => i.id === potionId && i.quantity > 0
		)

		if (!hasPotion) return

		removeItem(potionId, 1)
		completeQuest(quest.id)
	}

	return (
		<div className="h-full overflow-y-auto overflow-x-hidden flex flex-col items-center gap-3 pr-3 scrollbar-9">

			{/* Если активных квестов нет */}
			{activeQuests.length === 0 && (
				<p className="text-center text-lg opacity-80">
					У Люпи пока нет активных заданий.
				</p>
			)}

			{/* Список квестов */}
			<div className="flex flex-col gap-4">
				{activeQuests.map((quest) => {
					const hasPotion = items.some(
						(i) => i.id === quest.potion.id && i.quantity > 0
					)

					return (
						<StickerCard
							key={quest.id}
							className="flex flex-col gap-3"
						>

							{/* Заголовок */}
							<p className="text-[20px] lg:text-[32px] leading-8">
								{quest.title}
							</p>

							{/* Описание */}
							<p className="text-[16px] opacity-80 leading-snug">
								{quest.description}
							</p>

							{/* Ингредиенты зелья (если есть) */}
							{Array.isArray(quest.potion.ingredients) &&
								quest.potion.ingredients.length > 0 && (
									<div className="flex gap-2 mt-1 mb-5">
										{quest.potion.ingredients.map((ing) => (
											<img
												key={ing.id}
												src={ing.icon}
												alt={ing.name}
												className="w-10 h-10 object-contain"
											/>
										))}
									</div>
								)}

							{/* Кнопка завершения */}
							<Button
								disabled={!hasPotion}
								onClick={() => handleComplete(quest)}
							>
								<p>{hasPotion ? "Завершить" : "Нужно зелье"}</p>
							</Button>
						</StickerCard>
					)
				})}
			</div>
		</div>
	)
}
