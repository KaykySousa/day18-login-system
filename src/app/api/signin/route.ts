import { prisma } from "@/prisma/client"
import { compare } from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

interface Body {
	email: string
	password: string
}

export async function POST(request: NextRequest) {
	try {
		const { email, password }: Body = await request.json()

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!user) throw new Error("Usuário ou senha incorreta")

		const passwordMatch = await compare(password, user.password)

		if (!passwordMatch) throw new Error("Usuário ou senha incorreta")

		const response = NextResponse.json(
			{ token: user.id },
			{
				status: 200,
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
