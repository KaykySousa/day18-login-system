import { prisma } from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"

interface Body {
	token: string
}

export async function POST(request: NextRequest) {
	try {
		const { token }: Body = await request.json()

		const user = await prisma.user.findUnique({
			where: {
				id: token,
			},
			select: {
				email: true,
				id: true,
				name: true,
			},
		})

		if (!user) throw new Error("Usuário inválido")

		return NextResponse.json(
			{ token: user.id },
			{
				status: 200,
			}
		)
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
