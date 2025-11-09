"use client";

import { useState } from "react";

type Props = {
	onClick: () => void;
	size?: number; // чтобы можно было менять размер при необходимости
	className?: string;
};

export default function DeleteButton({ onClick, size = 48, className = "" }: Props) {
	const [state, setState] = useState<"default" | "hover" | "pressed">("default");

	const isTouchDevice =
		typeof window !== "undefined" && "ontouchstart" in window;

	function handleMouseEnter() {
		if (isTouchDevice) return;
		if (state !== "pressed") setState("hover");
	}

	function handleMouseLeave() {
		if (isTouchDevice) return;
		setState("default");
	}

	function handleMouseDown() {
		if (isTouchDevice) return;
		setState("pressed");
	}

	function handleMouseUp() {
		if (isTouchDevice) return;
		setState("hover");
		onClick();
	}

	function handleTouchStart(e: React.TouchEvent) {
		e.preventDefault();
		setState("pressed");
	}

	function handleTouchEnd(e: React.TouchEvent) {
		e.preventDefault();
		setState("default");
		onClick();
	}

	const imageSrc =
		state === "pressed"
			? "/images/del-pressed.svg"
			: state === "hover"
			? "/images/del-hover.svg"
			: "/images/del-default.svg";

	return (
		<div
			className={`select-none cursor-pointer touch-none ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			title="Удалить из избранного"
		>
			<img
				src={imageSrc}
				alt="Удалить"
				width={size}
				height={size}
				draggable={false}
				className="pointer-events-none transition-transform duration-150 active:scale-95"
				loading="eager"
			/>
		</div>
	);
}
