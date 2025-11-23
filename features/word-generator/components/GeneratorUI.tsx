"use client"

import { useState } from "react"
import { StickerCard } from "@/components/ui/sticker-card"
import { generateWord } from "@/features/word-generator/logic/generate"
import { GenerateMode } from "../data/modes"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

export default function WordGeneratorPage() {
	const [phrase, setPhrase] = useState("")
	const [word, setWord] = useState("")
	const [loading, setLoading] = useState(false)

	async function handleGenerate() {
		setLoading(true)

		try {
			const result = generateWord(mode)
			setPhrase(result.phrase)
			setWord(result.word)
		} finally {
			setLoading(false)
		}
	}

    const [mode, setMode] = useState<GenerateMode>("character")

	return (
		<div className="min-h-screen w-full flex items-center justify-center gap-3">
			<Card>
				{/* --- Две колонки внутри карточки --- */}
				<CardContent>
                <Select value={mode} onValueChange={(v) => setMode(v as GenerateMode)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Тип генерации" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="character">Персонаж</SelectItem>
                        <SelectItem value="creature">Существо</SelectItem>
                        <SelectItem value="location">Локация</SelectItem>
                        <SelectItem value="item">Вещичка</SelectItem>
                        <SelectItem value="anomaly">Аномалия</SelectItem>
                        <SelectItem value="fruit">Фрукт</SelectItem>
                        <SelectItem value="vegetable">Овощ</SelectItem>
                        <SelectItem value="sweet">Сладость</SelectItem>
                        <SelectItem value="dimension">Измерение</SelectItem>
                    </SelectContent>
                </Select>

                    <div className="flex  flex-col gap-3">
                        {word ? (
                            <div>
                                <div className="text-[20px]">Слово:</div>
                                    <StickerCard className="flex justify-center items-center">
                                        <div className="text-[32px] font-bold text-center leading-10">{word}</div>
                                    </StickerCard>
                                <div className="text-[20px]">Что в переводе означает:</div>
                                    <StickerCard className="flex justify-center items-center">
                                        <div className="text-[32px] font-bold text-center leading-10">{phrase}</div>
                                    </StickerCard>
                            </div>
                        ) : (
                            <p className="text-[20px]">Нажми кнопку ниже, чтобы получить первое слово.</p>
                        )}

                        <Button onClick={handleGenerate} className="leading-9">
                            Создать новое слово
                        </Button>
                    </div>
                </CardContent>
			</Card>
		</div>
	)
}
