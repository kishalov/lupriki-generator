"use client";

import { useState } from "react";

type Props = {
	onClick?: () => void;
	disabled?: boolean;
};

export default function ForwardButton({ onClick, disabled }: Props) {
	const [state, setState] = useState<"default" | "hover" | "pressed">("default");

	function handleMouseEnter() {
		if (!disabled && state !== "pressed") setState("hover");
	}

	function handleMouseLeave() {
		if (!disabled) setState("default");
	}

	function handleMouseDown() {
		if (!disabled) setState("pressed");
	}

	function handleMouseUp() {
		if (!disabled) setState("hover");
	}

	const imageSrc =
		state === "pressed"
			? "/images/forward-pressed.svg"
			: state === "hover"
			? "/images/forward-hover.svg"
			: "/images/forward-default.svg";

	return (
		<div
			className={`relative inline-block select-none ${
				disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
            onTouchStart={() => setState("pressed")}
            onTouchEnd={() => {
                setState("default");
                
            }}
			onClick={!disabled ? onClick : undefined}
		>
			<img
				src={imageSrc}
				alt="Вперед"
				width={90}
				height={70}
				draggable={false}
				className="pointer-events-none transition-all duration-150"
				loading="eager"
			/>
		</div>
	);
}
