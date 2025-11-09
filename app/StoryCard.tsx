"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";
import BackButton from "./BackButton";
import ForwardButton from "./ForwardButton";
import CopyButton from "./CopyButton";
import CharacterSelect from "@/components/ui/select";
import LikeButton from "./LikeButton";
import type { SavedStory } from "@/app/hooks/useSavedStories";
import { generateLyupisStory } from "@/app/storyGenerator";

type Props = {
	saved: SavedStory[];
	addStory: (story: { text: string; character: string }) => void;
	removeStory: (id: string) => void;
};

export default function StoryCard({ saved, addStory, removeStory }: Props) {
	const [text, setText] = useState("");
	const [character, setCharacter] = useState("Все");
	const [loading, setLoading] = useState(false);

	const [history, setHistory] = useState<string[]>([]);
	const [index, setIndex] = useState<number>(-1);

	async function generateStory() {
		setText("");
		setLoading(true);
		await new Promise((r) => setTimeout(r, 200));
		const story = generateLyupisStory(character);
		setText(story);
		setHistory((prev) => {
			const updated = [...prev.slice(0, index + 1), story];
			setIndex(updated.length - 1);
			return updated;
		});
		setLoading(false);
	}

	useEffect(() => {
		generateStory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [character]);

	const current = saved.find((s) => s.text === text);
	const isLiked = !!current;

	function toggleLike() {
		if (!text.trim()) return;
		if (current) removeStory(current.id);
		else addStory({ text, character });
	}

	function goBack() {
		if (index > 0) {
			setIndex(index - 1);
			setText(history[index - 1]);
		}
	}

	function goForward() {
		if (index < history.length - 1) {
			setIndex(index + 1);
			setText(history[index + 1]);
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="absolute top-1/2 left-1/2 z-100 -translate-x-1/2 -translate-y-1/2 w-[95%] lg:w-auto rounded-[40px] bg-white/1 backdrop-blur-[2px] shadow-2xl/20 p-3 lg:p-10 text-center select-none"
		>
			<h1 className="text-xl lg:text-4xl mb-3 lg:mb-10">
				Генератор историй о Люприках
			</h1>

			<div className="flex flex-col gap-6 mb-10 text-left items-stretch max-w-3xl mx-auto">
				<div className="flex flex-col gap-3">
					<div className="mt-1">
						<CharacterSelect value={character} onChange={setCharacter} />
					</div>

					<div className="rounded-[20px] bg-white border-2 border-black p-4 lg:p-6 w-full h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#b99c32] scrollbar-track-transparent hover:scrollbar-thumb-[#d8b84c] transition-colors">
						<p className="text-xl lg:text-3xl text-black leading-[1.3] whitespace-pre-line">
							{text || (loading ? "Генерация..." : "—")}
						</p>
					</div>
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="flex flex-row gap-3">
					<BackButton onClick={goBack} disabled={index <= 0} />
					<ForwardButton
						onClick={goForward}
						disabled={index >= history.length - 1}
					/>
					<CopyButton text={text} />
					<LikeButton liked={isLiked} onToggle={toggleLike} />
				</div>
				<CustomButton onClick={generateStory} />
			</div>
		</motion.div>
	);
}
