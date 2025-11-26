"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

type PopupProps = {
	isOpen: boolean
	onClose: () => void
	title?: string
	children?: React.ReactNode
}

export function Popup({ isOpen, onClose, title, children }: PopupProps) {

	// 🔒 Блокировка скролла страницы
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")
		} else {
			document.body.classList.remove("overflow-hidden")
		}

		return () => {
			document.body.classList.remove("overflow-hidden")
		}
	}, [isOpen])

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* затемнение */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black z-999"
						onClick={onClose}
					/>

					{/* попап */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						transition={{ duration: 0.15 }}
						className="fixed z-999 inset-0 flex items-center justify-center"
					>
						<Card className="flex flex-col gap-3 w-[90%] lg:w-[50%]">
							<div className="max-h-[70vh] overflow-y-auto">
								{children}
							</div>

							<Button onClick={onClose}>Закрыть</Button>
						</Card>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
