"use client";

import { useState } from "react";

type Props = {
	onClick?: () => void;
};

export default function CustomButton({ onClick }: Props) {
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
	}

	const imageSrc =
		state === "pressed"
			? "/images/button-pressed.svg"
			: state === "hover"
			? "/images/button-hover.svg"
			: "/images/button-default.svg";

	return (
		<div
			className="relative inline-block select-none cursor-pointer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
            onTouchStart={() => setState("pressed")}
            onTouchEnd={() => {setState("default");}}			
			onClick={onClick}
		>
			<img
				src={imageSrc}
				alt="Button"
				width={220}
				height={70}
				draggable={false}
				className="pointer-events-none transition-all duration-150"
				loading="eager"
			/>
		</div>
	);
}
