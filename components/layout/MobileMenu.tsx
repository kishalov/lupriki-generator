"use client"

import Image from "next/image"
import Link from "next/link"
import { LoginButton } from "../ui/LoginButton"

export function MobileMenu({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	return (
		<div
			className={`
				fixed inset-0 z-999
				transition-all duration-300
				${open ? "pointer-events-auto" : "pointer-events-none"}
			`}
		>
			{/* затемнение */}
			<div
				onClick={onClose}
				className={`
					absolute inset-0 bg-black/40 transition-opacity cursor-pointer
					${open ? "opacity-100" : "opacity-0"}
				`}
			/>

			{/* шторка */}
			<div
				className={`
					absolute right-0 top-0 h-full
					w-[80vw] max-w-[380px]
					bg-[#f9e8d8] border-2 border-black
					p-12 flex flex-col gap-20
					transition-transform duration-300
					${open ? "translate-x-0" : "translate-x-full"}
				`}
			>
				<div className="flex justify-between items-center">
					<Link href="/" className=" items-center hidden lg:flex">
						<Image
							src="/logo.svg"
							alt="logo"
							width={160}
							height={40}
							className="hover:scale-105 active:scale-90 transition cursor-pointer"
						/>
					</Link>
					<button
						onClick={onClose}
						className="self-end p-1 hover:scale-110 active:scale-90 transition"
					>
						<Image
							src="/icons/close.svg"
							alt="close"
							width={48}
							height={26}
						/>
					</button>
				</div>
				<nav className="flex flex-col gap-10 text-[32px] leading-9">
					<Link href="/encyclopedia" onClick={onClose} className="hover:scale-110 active:scale-90 transition">
						Энциклопедия
					</Link>
					<Link href="/apps/word-generator" onClick={onClose} className="hover:scale-110 active:scale-90 transition">
						Синтезатор слов
					</Link>
					<Link href="/apps/story-starter" onClick={onClose} className="hover:scale-110 active:scale-90 transition">
						Стартер историй
					</Link>
					<Link href="/apps/alchemy" onClick={onClose} className="hover:scale-110 active:scale-90 transition">
						Лаборатория Люпи
					</Link>
					<div className="pt-10">
						<LoginButton />
					</div>
				</nav>
			</div>
		</div>
	)
}