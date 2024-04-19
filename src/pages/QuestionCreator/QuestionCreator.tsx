import { SimpleQuestionCreator } from "./SimpleQuestionCreator"

export const QuestionCreator = () => {
	return (
		<div className="flex flex-col w-full min-h-screen justify-center items-center pt-10">
			<div className="w-full sm:w-auto px-4 py-8 sm:px-8 rounded-box backdrop-blur-3xl">
				<h1 className="text-5xl font-bold pb-16">Créateur de questions</h1>
				<SimpleQuestionCreator />
			</div>
		</div>
	)
}
