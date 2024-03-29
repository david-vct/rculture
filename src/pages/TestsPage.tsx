import { useState } from "react"
import { findQuestionById } from "../services/questions-store"

export const TestsPage = () => {
	const [questionId, setQuestionId] = useState("")

	function find() {
		findQuestionById(questionId).then((response) => {
			if (response.success) {
				console.log("Docs nb : " + response.data.length)
			} else {
				console.error(response.error)
			}
		})
	}

	return (
		<div>
			<input placeholder="id" onChange={(e) => setQuestionId(e.target.value)} />
			<button onClick={find}>Find</button>
		</div>
	)
}
