"use client"

import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/features/auth/useUser"
import Image from "next/image"

export function LoginButton() {
	const user = useUser((s) => s.user)

	async function login() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/`,
			},
		})

		if (error) {
			console.error("Login error:", error)
		}
	}

	async function logout() {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error("Logout error:", error)
		}
		useUser.getState().setUser(null)
	}

	if (!user) {
		return (
			<button
				onClick={login}
				className="text-[28px] hover:scale-110 active:scale-90 transition"
			>
				Войти
			</button>
		)
	}

	return (
		<button
			onClick={logout}
			className="flex items-center gap-3 text-[28px] hover:scale-110 active:scale-90 transition"
		>
			<Image
				src="/images/user.svg"
				alt="user"
				width={48}
				height={48}
			/>
			Выйти
		</button>
	)
}
