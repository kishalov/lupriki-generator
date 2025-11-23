"use client"

import { Popup } from "../ui/Popup"
import { usePopup } from "../hooks/usePopup"
import { AdventurePopup } from "./AdventurePopup"
import { useAdventure } from "../hooks/useAdventures"
import { useInventory } from "../hooks/useInventory"
import { QuestBoardPopup } from "./QuestBoardPopup"
import { NotebookPopup } from "./NotebookPopup"
import { ShopPopup } from "./ShopPopup"

export function PopupLayer() {
	const { open, closePopup } = usePopup()

	const {
		steps,
		currentStep,
		isRunning,
		claimRewards,
		reset
	} = useAdventure()

	const addItem = useInventory((s) => s.addItem)

	function handleAdventureClose() {
		// приключение завершено, если прошли все шаги
		const isFinished = isRunning && currentStep >= steps.length

		if (isFinished) {
			const rewards = claimRewards()

			rewards.forEach((r) => {
				const qty = r.quantity ?? 1

				addItem(
					{
						id: r.id,
						name: r.name,
						color: r.color,
						rarity: r.rarity,
						hue: r.hue,
						type: r.type,
						ingredients: r.ingredients,
					},
					qty
				)
			})
		} else {
			// если закрыли раньше — сбрасываем стейт
			reset()
		}

		closePopup()
	}

	return (
		<>
			{/* Доска объявлений */}
			<Popup
				isOpen={open === "quests"}
				onClose={closePopup}
			>
				<QuestBoardPopup
					open={open === "quests"}
					onClose={closePopup}
				/>
			</Popup>

			{/* Приключения */}
			<Popup
				isOpen={open === "adventure"}
				onClose={handleAdventureClose}
				title="Приключения"
			>
				<AdventurePopup />
			</Popup>

			{/* Лавка Питрица */}
			<Popup
				isOpen={open === "shop"}
				onClose={closePopup}
				title="Лавка Питрица"
			>
				<ShopPopup />
			</Popup>

			{/* Блокнот Люпи */}
			<Popup
				isOpen={open === "notebook"}
				onClose={closePopup}
				title="Блокнот"
			>
				<NotebookPopup />
			</Popup>
		</>
	)
}
