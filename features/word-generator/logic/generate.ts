// features/word-generator/logic/generate.ts

import { templateMap } from "../data/templates-map"
import { fillTemplate } from "./fill"
import { rand } from "./rand"
import { collapsePhraseToWord } from "./collapse"
import type { GenerateMode } from "../data/modes"

// генерим фразу по режиму
export function generatePhraseByMode(mode: GenerateMode): string {
	const tpls = templateMap[mode]
	const tpl = rand(tpls)

	const phrase = fillTemplate(tpl)
	return phrase[0].toUpperCase() + phrase.slice(1)
}

// обёртка, которая ещё и слово делает
export function generateWord(mode: GenerateMode = "character") {
	const phrase = generatePhraseByMode(mode)
	const word = collapsePhraseToWord(phrase)
	return { phrase, word }
}
