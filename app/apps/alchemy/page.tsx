import { Cauldron } from "@/features/alchemy/components/Cauldron"
import { Inventory } from "@/features/alchemy/components/Inventory"
import { PopupLayer } from "@/features/alchemy/components/PopupLayer"
import { BottomMenu } from "@/features/alchemy/components/BottomMenu"

export default function AlchemyPage() {
	return (
		<main className="lg:h-screen flex flex-col gap-3 justify-center py-20">
			
			{/* Верхний блок: котёл + инвентарь */}
			<div className="lg:flex-row flex flex-col gap-3 overflow-hidden">
				
				{/* Левая колонка — котёл */}
					<div className="w-full"><Cauldron /></div>

				{/* Правая колонка — инвентарь */}
					<div className="w-full"><Inventory /></div>
			</div>

			<BottomMenu />

			<PopupLayer />
		</main>
	)
}
