import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }: ButtonProps) {
	return (
		<button
			className={`h-10 w-full bg-teal-700 text-white font-semibold rounded ${className}`}
			{...props}
		/>
	)
}
