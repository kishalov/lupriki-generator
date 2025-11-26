"use client"

import { Button } from "@/components/ui/button"
import { usePopup } from "../hooks/usePopup"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useMusic } from "@/features/alchemy/hooks/useMusic"

export function BottomMenu() {
	const { openPopup } = usePopup()

	const isEnabled = useMusic((s) => s.isEnabled)
	const init = useMusic((s) => s.init)
	const toggle = useMusic((s) => s.toggle)
	const audio = useMusic((s) => s.audio)

	function handleMusicClick() {
		// если аудио ещё не создано — создаём
		if (!audio) {
			init()
		}

		// включаем/выключаем
		toggle()
	}

	return (
		<Card className="lg:flex-row flex flex-col justify-between gap-3">
			<Button onClick={() => openPopup("quests")} tooltip="Выбрать квест">
				<p>Доска объявлений</p>
			</Button>

			<Button onClick={() => openPopup("adventure")} tooltip="Отправиться за вещичками">
				<p>Приключения</p>
			</Button>

			<Button  onClick={() => openPopup("shop")} tooltip="Купить предметы">
				<p>Лавка Питрица</p>
			</Button>

			{/* Кнопка музыки */}
			<Button onClick={handleMusicClick}>
				<Image
					src={isEnabled ? "/icons/music_on.svg" : "/icons/music_off.svg"}
					width={32}
					height={32}
					alt="music toggle"
				/>
			</Button>
		</Card>
	)
}
