"use client";

import { useState } from "react";

type Props = {
	onClick: () => void;
};

export default function CloseButton({ onClick }: Props) {
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
			? "/images/close-pressed.svg"
			: state === "hover"
			? "/images/close-hover.svg"
			: "/images/close-default.svg";

	return (
		<div
			className="fixed top-6 right-6 lg:top-12 lg:right-12 z-999 select-none cursor-pointer touch-none"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			title="Закрыть"
		>
			<img
				src={imageSrc}
				alt="Close"
				width={72}
				height={72}
				draggable={false}
				className="pointer-events-none transition-transform duration-150 active:scale-95"
				loading="eager"
			/>
		</div>
	);
}
