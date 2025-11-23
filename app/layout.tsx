import type { Metadata } from "next";
import { Neucha } from "next/font/google"
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { UserLoader } from "./UserLoader";

const neucha = Neucha({
	subsets: ["latin", "cyrillic"],
	weight: "400",
})

export const metadata: Metadata = {
  title: "Люприки",
  description: "Во истину альтернативная реальность",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="ru">
			<body className={neucha.className}>
        <UserLoader />
        <Header />
				<main className="bg-grass bg-grass-pattern px-[5%] md:px-[15%] xl:px-[20%] 2xl:px-[30%]">{children}</main>
			</body>
		</html>
  );
}
