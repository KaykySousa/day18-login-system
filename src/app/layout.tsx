import "./globals.css"

export const metadata = {
	title: "Day 18 - Login System",
	description: "Developed by: Kayky de Sousa",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
