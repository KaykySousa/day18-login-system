import { prisma } from "@/prisma/client"
import { hash } from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

interface Body {
	name: string
	email: string
	password: string
}

export async function POST(request: NextRequest) {
	try {
		const { email, name, password }: Body = await request.json()

		if (!email || !name || !password)
			throw new Error("Preencha todos os campos")

		if (password.length < 8) throw new Error("Senha fraca")

		const passwordHash = await hash(password, 10)

		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: passwordHash,
			},
			select: {
				id: true,
				email: true,
				name: true,
			},
		})

		const response = NextResponse.json(
			{ token: user.id, user },
			{
				status: 201,
			}
		)
		response.cookies.set("login-system-token", user.id, {
			maxAge: 60 * 60 * 24 * 2, //2 days
			path: "/",
		})
		return response
	} catch (error) {
		if (error instanceof Error) {
			console.error(error)
			return NextResponse.json(
				{ error: error.message },
				{
					status: 400,
				}
			)
		}
	}
}
