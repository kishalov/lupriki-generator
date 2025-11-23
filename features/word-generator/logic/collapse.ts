// features/word-generator/collapse.ts

const VOWELS = "аеёиоуыэюя"
const CONSONANTS = "бвгджзйклмнпрстфхцчшщ"

function isVowel(ch: string) {
	return VOWELS.includes(ch.toLowerCase())
}

function isConsonant(ch: string) {
	return CONSONANTS.includes(ch.toLowerCase())
}

function trimToEndWith(word: string, wantConsonant: boolean): string {
	for (let i = word.length - 1; i >= 0; i--) {
		const ch = word[i]
		if (wantConsonant && isConsonant(ch)) return word.slice(0, i + 1)
		if (!wantConsonant && isVowel(ch)) return word.slice(0, i + 1)
	}
	// fallback: если ничего не нашли, берём последний символ
	return word.slice(0, 1)
}

export function collapsePhraseToWord(
	phrase: string,
	minLen = 4,
	maxLen = 8
): string {

	const parts = phrase.toLowerCase().split(" ")
	const chunks: string[] = []

	// берём первые 3–5 букв каждого слова
	for (const p of parts) {
		let clean = p.replace(/[^а-яё]/gi, "")
		if (clean.length === 0) continue
		chunks.push(clean.slice(0, Math.floor(3 + Math.random() * 2)))
	}

	if (chunks.length === 0) return "лупро"

	// коллапсируем с учётом гласность → согласность
	let result = chunks[0]

	for (let i = 1; i < chunks.length; i++) {
		let prev = result
		let next = chunks[i]

		const nextStartsVowel = isVowel(next[0])
		const wantConsonant = nextStartsVowel // если следующее слово начинается с гласной — хотим согласную

		prev = trimToEndWith(prev, wantConsonant)
		result = prev + next
	}

	// ограничение по длине
	if (result.length > maxLen) {
		result = result.slice(0, maxLen)
	}
	if (result.length < minLen) {
		// добиваем последними буквами исходных кусков
		for (const c of chunks) {
			if (result.length >= minLen) break
			result += c[c.length - 1]
		}
	}

	// финальная правка — заглавная буква
	return result[0].toUpperCase() + result.slice(1)
}
