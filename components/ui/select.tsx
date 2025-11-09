"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";

const characters = [
	{ name: "Все", img: "/images/chars/all.png" },
	{ name: "Люпи", img: "/images/chars/lyupi.png" },
	{ name: "Пупо", img: "/images/chars/pupo.png" },
	{ name: "Питриц", img: "/images/chars/pitric.png" },
	{ name: "Корешок", img: "/images/chars/koreshok.png" },
	{ name: "Карлос", img: "/images/chars/karlos.png" },
	{ name: "Изюм", img: "/images/chars/izyum.png" },
	{ name: "Молпар", img: "/images/chars/molpar.png" },
	{ name: "Страж Нуля", img: "/images/chars/guardian.png" },
];

export default function CharacterSelect({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<Select.Root defaultValue="Все" onValueChange={onChange}>

			<Select.Trigger className="flex items-center justify-between gap-2 border-2 h-full w-full border-black bg-white px-4 py-2 rounded-[20px] text-xl lg:text-3xl cursor-pointer">
				<Select.Value placeholder="Выбери персонажа" />
				<Select.Icon>
					<ChevronDownIcon className="size-8 text-black" />
				</Select.Icon>
			</Select.Trigger>

			<Select.Portal>
				<Select.Content
					className="z-1000 rounded-xl border-2 border-black bg-white"
					position="popper"
					sideOffset={8}
				>
					<Select.Viewport className="p-2 max-h-100">
						{characters.map((char) => (
							<Select.Item
								key={char.name}
								value={char.name}
								className="flex items-center gap-3 px-3 py-2 rounded-[20px] cursor-pointer text-lg text-black hover:bg-[#e4ce92] focus:bg-[#e4ce92] hover:border-2 hover:border-black focus:border-2 focus:border-black outline-none select-none"
							>
								<Image
									src={char.img}
									alt={char.name}
									width={64}
									height={64}
									className="rounded-full"
								/>
								<Select.ItemText>{char.name}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}
