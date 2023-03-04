import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	labelText?: string
}

export default function Input({
	type,
	className,
	labelText,
	...props
}: InputProps) {
	return (
		<div>
			{labelText && (
				<label className="text-gray-900 font-semibold mb-1 block">
					{labelText}
				</label>
			)}
			<input
				className={`h-10 w-full block px-3 bg-neutral-50 border border-gray-300 text-gray-900 rounded focus:border-teal-500 focus:ring-teal-500 ${className}`}
				type={type ?? "text"}
				{...props}
			/>
		</div>
	)
}
