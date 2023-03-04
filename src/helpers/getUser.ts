import { prisma } from "@/prisma/client"

export async function getUser(id?: string) {
	if (!id) return null

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			email: true,
			id: true,
			name: true,
		},
	})

	return user
}
