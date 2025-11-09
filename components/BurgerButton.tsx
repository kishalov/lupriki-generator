"use client";

import { useState } from "react";

type Props = {
	onClick: () => void;
};

export default function BurgerButton({ onClick }: Props) {
	const [state, setState] = useState<"default" | "hover" | "pressed">("default");

	// простая проверка на тач-устройство
	const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;

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
			? "/images/burger-pressed.svg"
			: state === "hover"
			? "/images/burger-hover.svg"
			: "/images/burger-default.svg";

	return (
		<div
			className="fixed top-6 right-6 lg:top-6 lg:right-6 z-999 select-none cursor-pointer touch-none"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			title="Меню"
		>
			<img
				src={imageSrc}
				alt="Menu"
				width={72}
				height={72}
				draggable={false}
				className="pointer-events-none transition-transform duration-150 active:scale-95"
				loading="eager"
			/>
		</div>
	);
}
