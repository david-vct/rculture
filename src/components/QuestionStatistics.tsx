import { useEffect, useState } from "react"
import { findStatistics } from "../services/statistics-store"
import { AppStatistics, StoreResponse } from "../utils/types"
import { getQuestionTagValue } from "../utils/utils"

export const QuestionStatistics = () => {
	const [orderedTags, setOrderedTags] = useState([] as string[])
	const [quantities, setQuantities] = useState({} as Record<string, number>)
	//const statistics = useMemo(findStatistics, [])

	useEffect(() => {
		findStatistics().then((response: StoreResponse<AppStatistics>) => {
			console.log(response)
			if (response.success) {
				const data = response.data[0].questions.quantity as Record<string, number>
				// Sort tags by value
				const keysTags = Object.keys(data)
				keysTags.sort((a, b) => data[b] - data[a])
				// Remove total key
				keysTags.splice(keysTags.indexOf("total"), 1)
				// Set up sates
				setOrderedTags(keysTags)
				setQuantities(data)
			}
		})
	}, [])

	// Wait for statistics to be loaded
	if (quantities.length === 0) {
		return <div className="w-full sm:w-auto px-4 py-8 sm:px-8 rounded-3xl">Waiting</div>
	}

	return (
		<div className="flex flex-row flex-wrap justify-center">
			<span key="total" className="badge badge-lg badge-outline cursor-default m-1">
				{quantities["total"] + " questions !"}
			</span>
			{orderedTags.slice(0, 3).map((tag) => (
				<span key={tag} className="badge badge-lg badge-outline cursor-default m-1">
					{quantities[tag] + " en " + getQuestionTagValue(tag)}
				</span>
			))}
			<span key="others" className="badge badge-lg badge-outline cursor-default m-1">
				...
			</span>
		</div>
	)
}
