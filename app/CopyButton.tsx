"use client";

import { useState } from "react";

type Props = {
	text: string; // готовый текст для копирования
};

export default function CopyButton({ text }: Props) {
	const [state, setState] = useState<"default" | "hover" | "pressed">("default");
	const [copied, setCopied] = useState(false);

	function handleMouseEnter() {
		if (state !== "pressed") setState("hover");
	}

	function handleMouseLeave() {
		setState("default");
	}

	function handleMouseDown() {
		setState("pressed");
	}

	function handleMouseUp() {
		setState("hover");
	}

	async function handleClick() {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1200);
		} catch (err) {
			console.error("Ошибка копирования:", err);
		}
	}

	const imageSrc =
		state === "pressed"
			? "/images/copy-pressed.png"
			: state === "hover"
			? "/images/copy-hover.png"
			: "/images/copy-default.png";

	return (
		<div
			className="relative inline-block select-none cursor-pointer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onClick={handleClick}
			title={copied ? "Скопировано!" : "Скопировать историю"}
		>
			<img
				src={imageSrc}
				alt="Copy"
				width={76}
				height={85}
				draggable={false}
				className={`pointer-events-none transition-all duration-150 ${
					copied ? "opacity-70" : "opacity-100"
				}`}
				loading="eager"
			/>
		</div>
	);
}
