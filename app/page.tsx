"use client";

import { useState } from "react";
import Background from "./Background";
import StoryCard from "./StoryCard";
import BurgerButton from "@/components/BurgerButton";
import { SavedStoriesDialog } from "@/components/SavedStoriesDialog";
import { useSavedStories } from "@/app/hooks/useSavedStories";

export default function Page() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { saved, addStory, removeStory } = useSavedStories();

	return (
		<main className="relative w-full h-screen overflow-hidden">
			<Background />
			<StoryCard saved={saved} addStory={addStory} removeStory={removeStory} />
			<BurgerButton onClick={() => setIsDialogOpen(true)} />
			<SavedStoriesDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				saved={saved}
				onRemove={removeStory}
			/>
		</main>
	);
}
