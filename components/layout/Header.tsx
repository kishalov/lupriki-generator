"use client"

import Image from "next/image"
import { useState } from "react"
import { MobileMenu } from "./MobileMenu"

export function Header() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<header
			onClick={() => setOpen(true)}
				className="
					sticker-9
					fixed top-5 right-5 z-100
					flex items-center justify-between
					mx-auto group cursor-pointer
				"
			>

				<button
					onClick={() => setOpen(true)}
					className="p-2 group-hover:scale-110 active:scale-90 transition"
				>
					<Image
						src="/burger.svg"
						alt="menu"
						width={64}
						height={36}
					/>
				</button>
			</header>

			<MobileMenu open={open} onClose={() => setOpen(false)} />
		</>
	)
}
