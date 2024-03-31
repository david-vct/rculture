import { SimpleQuestionCreator } from "./SimpleQuestionCreator"

export const QuestionCreator = () => {
	return (
		<div className="min-h-screen bg-base-200 flex flex-col justify-center items-center">
			<div className="p-8 rounded-box w-1/3 max-w-2xl">
				<h1 className="text-5xl font-bold pb-16">Créateur de questions</h1>
				<SimpleQuestionCreator />
			</div>
		</div>
	)
}
