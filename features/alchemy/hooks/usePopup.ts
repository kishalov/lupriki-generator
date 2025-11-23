"use client"

import { create } from "zustand"

type PopupType = "quests" | "adventure" | "shop" | "notebook" | null

type PopupState = {
	open: PopupType
	openPopup: (type: PopupType) => void
	closePopup: () => void
}

export const usePopup = create<PopupState>((set) => ({
	open: null,
	openPopup: (type) => set({ open: type }),
	closePopup: () => set({ open: null }),
}))
