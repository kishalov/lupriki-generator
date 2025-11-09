"use client";

import { useState } from "react";

type Props = {
	liked: boolean;
	onToggle: () => void;
};

export default function LikeButton({ liked, onToggle }: Props) {
	const [state, setState] = useState<"default" | "hover" | "pressed">("default");

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
		onToggle();
	}
	function handleTouchStart() {
		setState("pressed");
	}
	function handleTouchEnd() {
		setState("default");
		onToggle();
	}

	const imageSrc =
		state === "pressed"
			? "/images/like-pressed.svg"
			: state === "hover"
			? "/images/like-hover.svg"
			: "/images/like-default.svg";

	return (
		<div
			className="relative inline-block select-none cursor-pointer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			title={liked ? "Убрать из избранного" : "Добавить в избранное"}
		>
			<img
				src={imageSrc}
				alt="Like"
				width={76}
				height={85}
				draggable={false}
				className={`pointer-events-none transition-all duration-150 ${
					liked ? "opacity-70" : "opacity-100"
				}`}
				loading="eager"
			/>
		</div>
	);
}
