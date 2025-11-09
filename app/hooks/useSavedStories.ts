"use client";

import { useEffect, useState } from "react";

export interface SavedStory {
	id: string;
	text: string;
	character: string;
	date: string;
}

const STORAGE_KEY = "lyupis_saved_stories";

export function useSavedStories() {
	const [saved, setSaved] = useState<SavedStory[]>([]);

	// загрузка при старте
	useEffect(() => {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (data) setSaved(JSON.parse(data));
		} catch {
			setSaved([]);
		}
	}, []);

	// запись при изменении
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
	}, [saved]);

	function addStory(story: Omit<SavedStory, "id" | "date">) {
		setSaved((prev) => {
			// если уже есть такой текст — не дублируем
			if (prev.some((s) => s.text === story.text)) return prev;
			const newStory: SavedStory = {
				...story,
				id: crypto.randomUUID(),
				date: new Date().toISOString(),
			};
			return [newStory, ...prev];
		});
	}

	function removeStory(id: string) {
		setSaved((prev) => prev.filter((s) => s.id !== id));
	}

	return { saved, addStory, removeStory };
}
