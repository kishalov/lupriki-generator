"use client"

import { useEffect, useRef } from "react"

type BrewRunnerProps = {
	isRunning: boolean
	onTick: (dt: number) => void
}

export function BrewRunner({ isRunning, onTick }: BrewRunnerProps) {
	const raf = useRef<number | null>(null)
	const last = useRef<number | null>(null)

	useEffect(() => {
		if (!isRunning) {
			if (raf.current !== null) {
				cancelAnimationFrame(raf.current)
			}
			raf.current = null
			last.current = null
			return
		}

		const loop = (ts: number) => {
			if (last.current != null) {
				const dt = (ts - last.current) / 1000
				onTick(dt)
			}
			last.current = ts
			raf.current = requestAnimationFrame(loop)
		}

		raf.current = requestAnimationFrame(loop)

		return () => {
			if (raf.current !== null) {
				cancelAnimationFrame(raf.current)
			}
			raf.current = null
			last.current = null
		}
	}, [isRunning, onTick])

	return null
}
