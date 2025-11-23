"use client"

import { useEffect } from "react"
import { StickerCard } from "@/components/ui/sticker-card"
import { Button } from "@/components/ui/button"
import { useQuests } from "../hooks/useQuests"

type QuestBoardPopupProps = {
	open: boolean
	onClose: () => void
}

export function QuestBoardPopup({ open, onClose }: QuestBoardPopupProps) {
	const quests = useQuests((s) => s.quests)
	const loadQuests = useQuests((s) => s.loadQuests)
	const generateQuests = useQuests((s) => s.generateQuests)
	const acceptQuest = useQuests((s) => s.acceptQuest)

	/* -------------------------------------------------------------- */
	/* 1. При открытии — грузим квесты из БД                          */
	/* -------------------------------------------------------------- */
	useEffect(() => {
		if (open) {
			loadQuests()
		}
	}, [open, loadQuests])

	return (
		<div className="flex flex-col gap-4">
			<p className="text-[28px] font-bold text-center">
				Доска объявлений
			</p>

			<div className="flex flex-col lg:flex-row gap-4">
				{quests.map((quest) => {
					const isAccepted = quest.status === "accepted"
					const isCompleted = quest.status === "completed"
					const disabled = isAccepted || isCompleted

					return (
						<StickerCard
							key={quest.id}
							className={`flex flex-col gap-4 p-4 ${
								disabled ? "opacity-50" : ""
							}`}
						>
							<p className="text-[20px] lg:text-[32px] font-bold">{quest.title}</p>

							<p className="text-base">{quest.description}</p>

							<Button
								disabled={disabled}
								onClick={() => acceptQuest(quest.id)}
								className={disabled ? "cursor-not-allowed" : ""}
							>
								<p>
									{isCompleted
										? "Выполнено"
										: isAccepted
										? "Принят"
										: "Принять"}
								</p>
							</Button>
						</StickerCard>
					)
				})}
			</div>
		</div>
	)
}
