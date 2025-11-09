"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";
import BackButton from "./BackButton";
import ForwardButton from "./ForwardButton";
import CopyButton from "./CopyButton";
import { starts, mids, ends } from "./data/stories";
import CharacterSelect from "@/components/ui/select";

const characters = [
	"Все",
	"Люпи",
	"Пупо",
	"Питриц",
	"Корешок",
	"Карлос",
	"Изюм",
	"Молпар",
	"Страж Нуля",
];

export default function StoryCard() {
	const [story, setStory] = useState({ start: "", mid: "", end: "" });
	const [character, setCharacter] = useState("Все");

	// буфер и указатель
	const [history, setHistory] = useState<{ start: string; mid: string; end: string }[]>([]);
	const [index, setIndex] = useState<number>(-1);

	function generateStory(): { start: string; mid: string; end: string } {
		let filteredStarts = starts;
		if (character !== "Все") {
			filteredStarts = starts.filter((s) => s.includes(character));
		}
		const start =
			filteredStarts[Math.floor(Math.random() * filteredStarts.length)] ||
			starts[Math.floor(Math.random() * starts.length)];
		const mid = mids[Math.floor(Math.random() * mids.length)];
		const end = ends[Math.floor(Math.random() * ends.length)];
		return { start, mid, end };
	}

	function roll() {
		const newStory = generateStory();

		// если мы находимся не в конце истории — обрезаем «будущее»
		const newHistory =
			index < history.length - 1 ? history.slice(0, index + 1) : history;

		const updated = [...newHistory, newStory];
		setHistory(updated);
		setIndex(updated.length - 1);
		setStory(newStory);
	}

	function goBack() {
		if (index > 0) {
			setIndex(index - 1);
			setStory(history[index - 1]);
		}
	}

	function goForward() {
		if (index < history.length - 1) {
			setIndex(index + 1);
			setStory(history[index + 1]);
		}
	}

	useEffect(() => {
		// при смене персонажа обнуляем историю
		const first = generateStory();
		setStory(first);
		setHistory([first]);
		setIndex(0);
	}, [character]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			className="absolute top-1/2 left-1/2 z-100 -translate-x-1/2 -translate-y-1/2 w-[95%] lg:w-auto rounded-[40px] bg-white/10 backdrop-blur-sm shadow-2xl/10 p-3 lg:p-10 text-center select-none"
		>
			<h1 className="text-xl lg:text-4xl mb-3 lg:mb-10">
				Генератор историй о Люприках
			</h1>

			<div className="flex flex-col gap-6 mb-10 text-left items-stretch max-w-3xl mx-auto">
				{/* --- карточка завязки --- */}
				<div className="flex flex-row gap-3">
					<div className="mt-1">
						<CharacterSelect value={character} onChange={setCharacter} />
					</div>
					<div className="rounded-[20px] bg-white border-2 border-black p-3 lg:p-6 w-full">
						<span className="block text-xl text-[#b99c32] mb-3 leading-tight">
							Завязка:
						</span>
						<p className="text-xl lg:text-3xl text-black leading-[1.2]">
							{story.start}
						</p>
					</div>
				</div>

				{/* --- карточка действия --- */}
				<div className="rounded-[20px] bg-white border-2 border-black p-3 lg:p-6">
					<span className="block text-xl text-[#b99c32] mb-3 leading-tight">
						Действие:
					</span>
					<p className="text-xl lg:text-3xl text-black leading-[1.2]">
						{story.mid}
					</p>
				</div>

				{/* --- карточка развязки --- */}
				<div className="rounded-[20px] bg-white border-2 border-black p-3 lg:p-6">
					<span className="block text-xl text-[#b99c32] mb-3 leading-tight">
						Развязка:
					</span>
					<p className="text-xl lg:text-3xl text-black leading-[1.2]">
						{story.end}
					</p>
				</div>
			</div>

			<div className="flex justify-between gap-4">
                <div className="flex flex-row gap-3">
                    <BackButton onClick={goBack} disabled={index <= 0} />
                    <ForwardButton onClick={goForward} disabled={index >= history.length - 1} />
                    <CopyButton
                        text={`Завязка: ${story.start}\n\nДействие: ${story.mid}\n\nРазвязка: ${story.end}`}
                    />
                </div>
				    <CustomButton onClick={roll} />
			</div>
		</motion.div>
	);
}
