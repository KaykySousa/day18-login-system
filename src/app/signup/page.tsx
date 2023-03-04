"use client"

import Button from "@/components/Button"
import Input from "@/components/Input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function Signup() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const router = useRouter()

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()

		try {
			const res = await fetch("/api/signup", {
				method: "POST",
				body: JSON.stringify({
					name,
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
				<p className="text-2xl mb-2 font-semibold">Cadastro</p>
				<Input
					type="text"
					labelText="Nome completo"
					onChange={(e) => setName(e.target.value)}
					required
				/>
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
					minLength={8}
					required
				/>
				<Link href="/signin" className="text-sm">
					Já possui uma conta? Entre
				</Link>
				<Button type="submit">Cadastrar</Button>
			</form>
		</div>
	)
}
