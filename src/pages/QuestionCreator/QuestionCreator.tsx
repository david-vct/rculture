import { useState } from "react"
import { QuestionType } from "../../utils/types"
import { CompleteQuestionCreator } from "./CompleteQuestionCreator"
import { SimpleQuestionCreator } from "./SimpleQuestionCreator"
import { ChoiceQuestionCreator } from "./ChoiceQuestionCreator"
import { Navbar } from "../../components/Navbar"

export const QuestionCreator = () => {
	const [questionType, setQuestionType] = useState(0)

	return (
		<div>
			<Navbar />
			<h1>Créateur de questions</h1>
			<div>
				<select onChange={(e) => setQuestionType(+e.target.value)}>
					<option value={QuestionType.SIMPLE}>Question simple</option>
					<option value={QuestionType.COMPLETE}>Question complete</option>
					<option value={QuestionType.CHOICE}>Question à choix</option>
				</select>

				{questionType == QuestionType.SIMPLE && <SimpleQuestionCreator />}
				{questionType == QuestionType.COMPLETE && <CompleteQuestionCreator />}
				{questionType == QuestionType.CHOICE && <ChoiceQuestionCreator />}
			</div>
		</div>
	)
}
