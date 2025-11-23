"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { generateLyupisStory } from "../logic/generate"
import { Card } from "@/components/ui/card"
import { StickerCard } from "@/components/ui/sticker-card"

export default function StoryStarterUI() {
	const [text, setText] = useState("")
	const [character, setCharacter] = useState("Все")
	const [loading, setLoading] = useState(false)

	// История переходов (как в генераторе слов)
	const [history, setHistory] = useState<string[]>([])
	const [index, setIndex] = useState(-1)

	async function generateStory() {
		setLoading(true)
		setText("")
		await new Promise((r) => setTimeout(r, 150))

		const story = generateLyupisStory(character)
		setText(story)

		setHistory(prev => {
			const updated = [...prev.slice(0, index + 1), story]
			setIndex(updated.length - 1)
			return updated
		})

		setLoading(false)
	}

	useEffect(() => {
		generateStory()
	}, [character])

	function goBack() {
		if (index > 0) {
			setIndex(index - 1)
			setText(history[index - 1])
		}
	}

	function goForward() {
		if (index < history.length - 1) {
			setIndex(index + 1)
			setText(history[index + 1])
		}
	}

	return (
        <div className="w-full min-h-screen flex justify-center items-center">
	    	<Card className="flex flex-col gap-3">			
				{/* Выбор персонажа */}
                <Select value={character} onValueChange={setCharacter}>
                    <SelectTrigger tooltip="Выбери персонажа">
                        <SelectValue placeholder="Персонаж"/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Все">Все</SelectItem>
                        <SelectItem value="Люпи">Люпи</SelectItem>
                        <SelectItem value="Пупо">Пупо</SelectItem>
                        <SelectItem value="Питриц">Питриц</SelectItem>
                        <SelectItem value="Корешок">Корешок</SelectItem>
                        <SelectItem value="Карлос">Карлос</SelectItem>
                        <SelectItem value="Изюм">Изюм</SelectItem>
                        <SelectItem value="Молпар">Молпар</SelectItem>
                    </SelectContent>
                </Select>				

				{/* Текст истории */}
				<StickerCard>
					<div className="text-[20px] lg:text-[32px] font-bold leading-6 lg:leading-10">{loading ? "Генерация..." : text}</div>
				</StickerCard>			

                {/* Кнопки */}
                    <Button onClick={generateStory} className="w-full leading-9">
                        <p>Новая история</p>
                    </Button>
                    
                    <div className="flex justify-between gap-3 max-h-[100px]">
                        <Button disabled={index <= 0} onClick={goBack} tooltip="Предыдущая история">
                            <img src="/icons/back.svg"/>
                        </Button>

                        <Button disabled={index >= history.length - 1} onClick={goForward} tooltip="Следующая история">
                            <img src="/icons/forward.svg"/>
                        </Button>

                        <Button onClick={() => navigator.clipboard.writeText(text)} tooltip="Скопировать текст">
                            <img src="/icons/copy.svg"/>
                        </Button>
                    </div>
		    </Card>
        </div>
	)
}
