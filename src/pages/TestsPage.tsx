import { findQuestionByTags } from "../services/questions-store"

export const TestsPage = () => {
	function action() {
		findQuestionByTags(["histoire", "enigme"]).then((response) => {
			if (response.success) {
				console.log(response.data)
			} else {
				console.error(response.error)
			}
		})
	}

	return (
		<div>
			<button onClick={action}>Action</button>
		</div>
	)
}
