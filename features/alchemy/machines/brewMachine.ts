import { setup, assign } from "xstate"

export const brewMachine = setup({
	types: {
		context: {} as {
			temp: number
			timeLeft: number
			threshold: number
			result: "success" | "fail" | null
		},
		events: {} as
			| { type: "START"; count: number } // ← добавили count
			| { type: "INCREASE" }
			| { type: "TICK"; dt: number }
			| { type: "CLEAR_RESULT" },
	},
}).createMachine({
	id: "brew",

	initial: "idle",

	context: {
		temp: 0,
		timeLeft: 3,
		threshold: 70,
		result: null,
	},

	states: {
		/* ---------------- Покой ---------------- */
		idle: {
			on: {
				START: {
					target: "running",
					actions: assign(({ context, event }) => {
						// Сколько предметов в котле
						const count = event.count

						// Маппинг сложности:
						// 2 ингреда → 70
						// 3 ингреда → 80
						// 4+ → 90
						let nextThreshold = 70
						if (count >= 4) {
							nextThreshold = 90
						} else if (count === 3) {
							nextThreshold = 80
						} else {
							nextThreshold = 70
						}

						return {
							temp: 40,
							timeLeft: 3,
							result: null,
							threshold: nextThreshold,
						}
					}),
				},
				CLEAR_RESULT: {
					actions: assign({
						result: null,
					}),
				},
			},
		},

		/* -------------- Игра идёт -------------- */
		running: {
			on: {
				INCREASE: {
					actions: assign(({ context }) => ({
						temp: Math.min(100, context.temp + 6),
					})),
				},
				TICK: [
					{
						guard: ({ context, event }) =>
							context.timeLeft - event.dt <= 0,
						target: "idle",
						actions: assign(({ context, event }) => {
							const cooledTemp = Math.max(
								0,
								context.temp - event.dt * 18
							)
							const success =
								cooledTemp > context.threshold

							return {
								temp: 0,
								timeLeft: 0,
								result: success ? "success" : "fail",
							}
						}),
					},
					{
						actions: assign(({ context, event }) => ({
							temp: Math.max(
								0,
								context.temp - event.dt * 40
							),
							timeLeft: context.timeLeft - event.dt,
						})),
					},
				],
			},
		},
	},
})
