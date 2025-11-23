// useItemPopup.ts
"use client"

import { create } from "zustand"
import type { InventoryItem } from "@/features/alchemy/hooks/useInventory"

type ItemPopupState = {
	item: InventoryItem | null
	openItem: (item: InventoryItem) => void
	closeItem: () => void
}

export const useItemPopup = create<ItemPopupState>((set) => ({
	item: null,
	openItem: (item) => set({ item }),
	closeItem: () => set({ item: null }),
}))
