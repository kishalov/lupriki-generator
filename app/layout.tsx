import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Генератор историй о Люприках",
	description: "Случайные истории из мира Люприков",
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon.ico", type: "image/x-icon" },
		],
		apple: [
			{ url: "/android-chrome-192x192.png" },
			{ url: "/android-chrome-512x512.png" },
		],
	},
	manifest: "/site.webmanifest",

	openGraph: {
		title: "Генератор историй о Люприках",
		description: "Случайные истории из мира Люприков",
		url: "https://your-domain.com", // можешь подставить свой домен
		siteName: "Люприки",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Генератор историй о Люприках",
			},
		],
		locale: "ru_RU",
		type: "website",
	},

	twitter: {
		card: "summary_large_image",
		title: "Генератор историй о Люприках",
		description: "Случайные истории из мира Люприков",
		images: ["/og-image.png"],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body>{children}</body>
		</html>
	);
}
