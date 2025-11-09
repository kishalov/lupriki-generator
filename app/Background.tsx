"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import dynamic from "next/dynamic";
const Clouds = dynamic(() => import("./Clouds"), { ssr: false });

export default function Background() {
	// правильная типизация для variants
	const fadeUp: Variants = {
		hidden: { y: 60, opacity: 0 },
		visible: (custom: number = 0) => ({
			y: 0,
			opacity: 1,
			transition: {
				duration: 1.2,
				delay: custom,
				ease: [0.25, 0.1, 0.25, 1],
			},
		}),
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			className="absolute inset-0 overflow-hidden"
		>
			{/* ——— небо ——— */}
			<div className="absolute inset-0 overflow-hidden">

				<Image src="/images/bg/sky.png" alt="Sky" fill className="object-cover" priority />
			</div>

			{/* ——— солнце ——— */}
            <motion.div
            className="absolute top-10 right-1/2 z-10 opacity-90"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            >
            <motion.img
                src="/images/bg/sun.png"
                alt="Sun"
                className="w-40"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            </motion.div>


			{/* ——— облака ——— */}
			<motion.div variants={fadeUp} custom={0.4}>
				<Clouds />
			</motion.div>

            {/* ——— дальние кусты ——— */}
            <motion.div
                className="absolute bottom-20 left-0 z-20 select-none pointer-events-none"
                variants={fadeUp}
                custom={1.6}
                initial="hidden"
                animate="visible"
            >
                <motion.img
                    src="/images/bg/bushes-2.png"
                    alt="Far bushes"
                    width={1920}
                    height={1080}
                    animate={{ y: [0, 2.5, 0, -2.5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* ——— ближние кусты ——— */}
            <motion.div
            className="absolute bottom-0 left-0 w-full z-30 select-none pointer-events-none"
            variants={fadeUp}
            custom={1.4}
            initial="hidden"
            animate="visible"
            >
            <motion.img
                src="/images/bg/bushes.png"
                alt="Bushes"
                className="w-full"
                animate={{ y: [0, 3, 0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            </motion.div>

{/* ——— дом Люпи ——— */}
<motion.img
	src="/images/bg/house.png"
	alt="House"
	className="absolute select-none pointer-events-none z-40"
	style={{
		bottom: 'clamp(4vh, 18vw, 32vh)',
		left: 'clamp(13vh, 20vw, 32vh)',
		width: '35vw',
		maxWidth: '950px',
	}}
	variants={fadeUp}
	custom={1.1}
	initial="hidden"
	animate="visible"
	transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
/>

{/* ——— гриб ——— */}
<motion.div
	className="absolute select-none pointer-events-none z-40"
	style={{
		bottom: 'clamp(2vh, 25vw, 39vh)',
		right: '4vw',
		width: '9vw',
		maxWidth: '200px',
	}}
	variants={fadeUp}
	custom={1.0}
	initial="hidden"
	animate="visible"
>
	<motion.img
		src="/images/bg/mush.png"
		alt="Mushroom"
		className="w-full h-auto"
		style={{ transformOrigin: 'bottom center' }}
		animate={{ rotate: [0, 4.5, 0, -4.5, 0] }}
		transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
	/>
</motion.div>

			{/* ——— передний план ——— */}
				<Image
					src="/images/bg/foreground-2.png"
					alt="Foreground"
					width={1920}
					height={1080}
					className="absolute bottom-0 left-0 z-50 select-none pointer-events-none"
				/>

{/* ——— пень ——— */}
<motion.img
	src="/images/bg/stump.png"
	alt="Stump"
	className="absolute select-none pointer-events-none z-60"
	style={{
		bottom: 'clamp(3vh, 16vw, 29vh)',
		right: '18vw',
		width: '10vw',
		maxWidth: '240px',
	}}
	variants={fadeUp}
	custom={0.8}
	initial="hidden"
	animate="visible"
	transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
/>

{/* ——— дерево ——— */}
<motion.div
	className="absolute select-none pointer-events-none z-60"
	style={{
		bottom: 'clamp(5vh, 10vw, 15vh)', // высота над землей
		left: '-5vw', // немного за экраном
		width: '22vw', // масштаб относительно ширины экрана
		maxWidth: '400px',
	}}
	variants={fadeUp}
	custom={0.8}
	initial="hidden"
	animate="visible"
>
	<motion.img
		src="/images/bg/tree.png"
		alt="Tree"
		className="w-full h-auto"
		style={{ transformOrigin: 'bottom center' }}
		animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
		transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
	/>
</motion.div>

		</motion.div>
	);
}
