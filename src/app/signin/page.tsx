"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Signin() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const router = useRouter()

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		try {
			const res = await fetch("/api/signin", {
				method: "POST",
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})

			const json = await res.json()

			router.push("/")
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message)
			}
		}
	}

	return (
		<div className="min-h-screen w-full flex justify-center items-center p-6">
			<form
				className="w-full max-w-sm flex flex-col gap-y-4 text-gray-900"
				onSubmit={handleSubmit}
			>
				<p className="text-2xl mb-2 font-semibold">Login</p>
				<Input
					type="email"
					labelText="Email"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					type="password"
					labelText="Senha"
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Link href="/signup" className="text-sm">
					Ainda não possui uma conta? Cadastre-se
				</Link>
				<Button type="submit">Entrar</Button>
			</form>
		</div>
	)
}
