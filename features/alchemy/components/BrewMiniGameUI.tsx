"use client"

type BrewMiniGameUIProps = {
	temp: number
	timeLeft: number
	threshold: number
	isRunning: boolean
}

export function BrewMiniGameUI({
	temp,
	timeLeft,
	threshold,
	isRunning,
}: BrewMiniGameUIProps) {
	return (
		<div className="flex flex-col items-center gap-4 mt-6 select-none">
			<div className="relative h-[170px] lg:h-64 w-12 bg-[#f9e8d8] border-2 border-black">
				<div
					className="absolute -left-2 -right-2 bg-black z-1"
					style={{ bottom: `${threshold}%`, height: "2px" }}
				/>
				<div
					className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-red-500 to-yellow-300 transition-all duration-75"
					style={{ height: `${temp}%` }}
				/>
			</div>

			<p className="text-md opacity-70">
				{isRunning ? timeLeft.toFixed(1) : ""}
			</p>
		</div>
	)
}
