import { SimpleQuestionCreator } from "./SimpleQuestionCreator"

export const QuestionCreator = () => {
	return (
		<div className="w-full min-h-screen bg-base-200 flex flex-col justify-center items-center">
			<div className="w-full sm:w-auto px-4 py-8 sm:px-8 rounded-box">
				<h1 className="text-5xl font-bold pb-16">Créateur de questions</h1>
				<SimpleQuestionCreator />
			</div>
		</div>
	)
}
