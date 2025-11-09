"use client";

import type { SavedStory } from "@/app/hooks/useSavedStories";
import CloseButton from "./CloseButton";
import DeleteButton from "./DeleteButton";
import { useEffect, useState } from "react";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	saved: SavedStory[];
	onRemove: (id: string) => void;
};

export function SavedStoriesDialog({ open, onOpenChange, saved, onRemove }: Props) {
	// ✅ хуки всегда вверху
	const [confirmingId, setConfirmingId] = useState<string | null>(null);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "auto";
	}, [open]);

	// теперь return после всех хуков — безопасно
	if (!open) return null;

	return (
		<div
			className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
			onClick={() => onOpenChange(false)}
		>
			<CloseButton onClick={() => onOpenChange(false)} />
			<div
				className="relative w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto border-2 border-black rounded-3xl bg-[#fffbea] p-8 shadow-lg"
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className="text-3xl mb-6 text-center">Избранные истории</h2>

				{saved.length === 0 ? (
					<p className="text-center text-gray-500 py-10">
						Пока пусто. Поставь лайк на понравившуюся историю, и она появится здесь.
					</p>
				) : (
					<div className="flex flex-col gap-4">
						{saved.map((story) => (
							<div
								key={story.id}
								className="relative border-2 border-black rounded-[20px] bg-white p-4"
							>
								{/* кнопка удаления */}
								<DeleteButton
									onClick={() =>
										setConfirmingId(
											confirmingId === story.id ? null : story.id
										)
									}
									className="absolute top-3 right-3"
								/>

								{/* мини-диалог подтверждения */}
								{confirmingId === story.id && (
									<div className="absolute inset-0 flex items-center justify-center bg-white rounded-[20px] border-2 border-black">
										<div className="text-center">
											<p className="mb-4 text-lg">Точно хочешь удалить?</p>
											<div className="flex justify-center gap-4">
												<button
													onClick={() => {
														onRemove(story.id);
														setConfirmingId(null);
													}}
													className="border-2 border-black bg-[#fffbea] rounded-xl px-4 py-2 hover:bg-[#ffefae] active:scale-95 transition-transform"
												>
													Да
												</button>
												<button
													onClick={() => setConfirmingId(null)}
													className="border-2 border-black bg-white rounded-xl px-4 py-2 hover:bg-gray-100 active:scale-95 transition-transform"
												>
													Нет
												</button>
											</div>
										</div>
									</div>
								)}

								<p className="whitespace-pre-line text-lg leading-snug w-[90%]">
									{story.text}
								</p>

								<div className="mt-2 text-xs text-gray-500 flex justify-between">
									<span>{story.character}</span>
									<span>
										{new Date(story.date).toLocaleString("ru-RU", {
											day: "2-digit",
											month: "2-digit",
											year: "2-digit",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</span>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
