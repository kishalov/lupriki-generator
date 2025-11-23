"use client"

import { Button } from "@/components/ui/button"
import { useAdventure } from "../hooks/useAdventures"
import { ItemIcon } from "../ui/ItemIcon"
import { StickerCard } from "@/components/ui/sticker-card"
import { TypewriterMotion } from "../components/TypewriterMotion"

export function AdventurePopup() {
	const {
		isRunning,
		steps,
		currentStep,
		rewards,
		startAdventure,
		nextStep,
	} = useAdventure()

	// начало
	if (!isRunning)
		return (
			<Button onClick={startAdventure}>
				<p>Отправиться в приключение</p>
			</Button>
		)

	// процесс
	if (currentStep < steps.length) {
		const step = steps[currentStep]

		return (
			<div className="flex flex-col gap-3 items-center">

				{/* КАРТОЧКА С КАРТИНКОЙ */}
				{step.image && (
					<StickerCard>
						<img
							src={step.image}
							alt=""
							className="max-w-[200px] rounded-lg object-contain"
						/>
					</StickerCard>
				)}

				{/* КАРТОЧКА С ТЕКСТОМ И КНОПКОЙ */}
				<StickerCard className="flex flex-col items-center justify-center gap-6 p-6">
					<TypewriterMotion
						key={currentStep}
						text={step.text}
					/>

					<Button onClick={nextStep}>
						<p>Дальше</p>
					</Button>
				</StickerCard>

			</div>
		)
	}

	// финал — просто показ наград, БЕЗ addItem
	return (
		<StickerCard className="flex flex-col items-center justify-center gap-6 p-6">
			<p className="text-[20px] lg:text-[32px] font-bold text-center">
				Люпи вернулся с находками:
			</p>

			<div className="flex gap-3">
				{rewards.map((r, index) => (
					<ItemIcon key={index} item={r}/>
				))}
			</div>

			<p className="text-center text-lg opacity-80">
				Закрой это окно, чтобы забрать предметы в инвентарь.
			</p>
		</StickerCard>
	)
}
