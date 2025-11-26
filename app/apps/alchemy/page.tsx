"use client"

import { PopupLayer } from "@/features/alchemy/components/PopupLayer"
import { Button } from "@/components/ui/button"
import { usePopup } from "@/features/alchemy/hooks/usePopup"

export default function AlchemyPage() {
	const { openPopup } = usePopup()

	return (
		<main className="grid lg:grid-cols-3 lg:h-screen items-center justify-center gap-12 py-20">
				<div className="flex flex-col gap-2">
					<img src="/images/bulletin.svg" className="w-60 h-auto max-w-none"></img>
					<Button onClick={() => openPopup("quests")} tooltip="Выбрать квест">Доска объявлений</Button>
				</div>
				<div className="flex flex-col gap-2">
					<img src="/images/backpack.svg" className="w-60 h-auto max-w-none"></img>
					<Button onClick={() => openPopup("inventory")}>Рюкзак</Button>
				</div>
				<div className="flex flex-col gap-2">
					<img src="/images/garden.svg" className="w-60 h-auto max-w-none"></img>
					<Button>Огород</Button>
				</div>
				<div className="flex flex-col gap-2">
					<img src="/images/cauldron-menu.svg" className="w-60 h-auto max-w-none"></img>
					<Button onClick={() => openPopup("cauldron")} tooltip="На кухню">Котелок</Button>
				</div>
				<div className="flex flex-col gap-2">
					<img src="/images/forest.svg" className="w-60 h-auto max-w-none"></img>
					<Button onClick={() => openPopup("adventure")} tooltip="Отправиться за вещичками">Питучий лес</Button>
				</div>
				<div className="flex flex-col gap-2">
					<img src="/images/shop.svg" className="w-60 h-auto max-w-none"></img>
					<Button onClick={() => openPopup("shop")} tooltip="Купить предметы">Лавка Питрица</Button>
				</div>
			<PopupLayer />
		</main>
	)
}
