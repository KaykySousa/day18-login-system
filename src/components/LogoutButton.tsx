"use client"

import { useRouter } from "next/navigation"
import Button from "./Button"

export default function LogoutButton() {
	const router = useRouter()

	return (
		<Button
			onClick={() => {
				document.cookie =
					"login-system-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
				router.push("/signin")
			}}
		>
			Sair
		</Button>
	)
}
