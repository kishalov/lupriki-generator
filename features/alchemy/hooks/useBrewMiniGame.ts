import { useMachine } from "@xstate/react"
import { brewMachine } from "../machines/brewMachine"

export function useBrewMachine() {
	const [state, send] = useMachine(brewMachine)
	const { temp, timeLeft, threshold, result } = state.context

	return {
		state,
		send,
		temp,
		timeLeft,
		threshold,
		result,
		isIdle: state.matches("idle"),
		isRunning: state.matches("running"),
	}
}
