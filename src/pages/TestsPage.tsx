import { findRandomQuestionsByTags } from "../services/questions-store"

export const TestsPage = () => {
	function action() {
		findRandomQuestionsByTags(["HISTORY", "GEOGRAPHY", "ENIGMA", "DILEMMA"], 6).then((response) => {
			if (response.success) {
				console.log(response.data)
			} else {
				console.error(response.error)
			}
		})
	}

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center">
			<button className="btn" onClick={action}>
				Action
			</button>
		</div>
	)
}
