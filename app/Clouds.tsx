"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Cloud = {
	top: string;
	left: string;
	width: string;
	delay: number;
	duration: number;
};

export default function Clouds() {
	const [clouds, setClouds] = useState<Cloud[]>([]);

	useEffect(() => {
		const generated = Array.from({ length: 6 }).map(() => ({
			top: `${10 + Math.random() * 50}%`,
			left: `${-200 + Math.random() * 200}px`,
			width: `${100 + Math.random() * 300}px`,
			delay: Math.random() * 10,
			duration: 50 + Math.random() * 30,
		}));
		setClouds(generated);
	}, []);

	return (
		<div className="absolute inset-0 z-30 overflow-hidden pointer-events-none">
			{clouds.map((cloud, i) => (
				<motion.img
					key={i}
					src="/images/bg/cloud.png"
					alt="Cloud"
					className="absolute"
					style={{
						top: cloud.top,
						left: cloud.left,
						width: cloud.width,
					}}
					initial={{ x: `${Math.random() * 10}vw` }}
					animate={{ x: "120vw" }}
                    transition={{
                        duration: cloud.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: -Math.random() * cloud.duration,
                    }}
				/>
			))}
		</div>
	);
}
