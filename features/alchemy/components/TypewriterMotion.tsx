"use client"

import { motion } from "framer-motion"

export function TypewriterMotion({ text }: { text: string }) {
	const letters = text.split("")

	const container = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.03, // задержка между появлением каждого символа
			},
		},
	}

	const child = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	return (
		<motion.p
			className="text-[20px] lg:text-[32px] font-bold leading-7 lg:leading-9 whitespace-pre-wrap"
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{letters.map((char, i) => (
				<motion.span key={i} variants={child}>
					{char}
				</motion.span>
			))}
		</motion.p>
	)
}
