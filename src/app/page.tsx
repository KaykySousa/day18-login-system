import LogoutButton from "@/components/LogoutButton"
import { getUser } from "@/helpers/getUser"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const revalidate = 0

export default async function Home() {
	const token = cookies().get("login-system-token")?.value

	const user = await getUser(token)

	if (!user) redirect("/signin")

	return (
		<div className="min-h-screen w-full flex flex-col justify-center items-center">
			<div>
				<h1 className="text-2xl font-semibold mb-4">
					Usuário Autenticado
				</h1>
				<p>
					<strong>Nome:</strong> {user.name}
				</p>
				<p className="mb-4">
					<strong>Email:</strong> {user.email}
				</p>
				<LogoutButton />
			</div>
		</div>
	)
}
