import { useState } from "react"

type QuestionBodyInputProps = {
	onChange: (body: string[]) => void
}

export const QuestionBodyInput = (props: QuestionBodyInputProps) => {
	const [body, setBody] = useState([] as string[])
	const [nbElements, setNbElements] = useState(1)

	const handleQuestionChange = (index: number, text: string) => {
		body[index] = text
		setBody(body)

		// Send changes to parent
		props.onChange(body.filter((element) => element !== ""))
	}

	const handleElementRemove = () => {
		body.pop()
		setBody(body)
		setNbElements(nbElements - 1)
	}

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
				{Array.from({ length: nbElements }).map((_, index) => (
					<textarea
						key={index}
						className="textarea textarea-bordered resize-none rounded-3xl"
						placeholder="Déscription ou choix"
						onChange={(e) => handleQuestionChange(index, e.target.value)}
					></textarea>
				))}
			</div>
			<div className="pt-2">
				<button
					className="btn btn-sm btn-neutral btn-outline rounded-full mr-2 font-bold"
					onClick={() => setNbElements(nbElements + 1)}
				>
					&#43;
				</button>
				<button
					className="btn btn-sm btn-neutral btn-outline rounded-full font-bold"
					disabled={nbElements === 0}
					onClick={handleElementRemove}
				>
					&#8722;
				</button>
			</div>
		</div>
	)
}
