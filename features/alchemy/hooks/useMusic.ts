"use client"

import { create } from "zustand"

type MusicState = {
	isEnabled: boolean
	audio: HTMLAudioElement | null

	toggle: () => void
	init: () => void
}

export const useMusic = create<MusicState>((set, get) => ({
	isEnabled: false, // ← теперь выключено по умолчанию
	audio: null,

	init: () => {
		// если уже есть — выходим
		if (get().audio) return

		const audio = new Audio("/music/lupi-theme.mp3")
		audio.loop = true
		audio.volume = 0.1

		set({ audio })
	},

	toggle: () => {
		const state = get()
		const audio = state.audio
		if (!audio) return

		if (state.isEnabled) {
			audio.pause()
		} else {
			audio.play().catch(() => {})
		}

		set({ isEnabled: !state.isEnabled })
	},
}))
