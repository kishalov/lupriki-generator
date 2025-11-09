import Background from "./Background";
import StoryCard from "./StoryCard";

export default function Page() {
	return (
		<main className="relative w-full h-screen overflow-hidden">
			<Background />
			<StoryCard />
		</main>
	);
}
