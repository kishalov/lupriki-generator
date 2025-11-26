import { Inventory } from "./Inventory"
import { Notebook } from "./Notebook"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function InventoryPopup() {
	const [tab, setTab] = useState<"inventory" | "notebook">("inventory")

	return (
		<div className="flex flex-col gap-6 w-full h-[60vh]">

			{/* Табы */}
			<div className="flex justify-center gap-4">
				<Button onClick={() => setTab("inventory")} disabled={tab === "inventory"}>
					Инвентарь
				</Button>

				<Button onClick={() => setTab("notebook")} disabled={tab === "notebook"}>
					Блокнот
				</Button>
			</div>

			{/* Контент */}
            <div className="flex items-start justify-center w-full overflow-auto">
                <div key={tab} className="w-full h-full">
                    {tab === "inventory" ? <Inventory /> : <Notebook />}
                </div>
            </div>
		</div>
	)
}
