import { useState } from "react"
import { QuestionTag } from "../../utils/types"

type TagSelectorProps = {
	onChange: (tags: string[]) => void
}

export const TagSelector = (props: TagSelectorProps) => {
	const [tags, setTags] = useState([] as string[])

	const handleTagClick = (tag: string) => {
		if (tags.includes(tag)) {
			// Remove tag from tags
			const index = tags.indexOf(tag)
			tags.splice(index, 1)
			setTags([...tags])
		} else {
			tags.push(tag)
			setTags([...tags])
		}

		// Send updated tags to parent
		props.onChange(tags)
	}

	return (
		<div className="flex flex-row flex-wrap">
			{Object.keys(QuestionTag).map((key, index) => (
				<button
					key={key}
					className={
						"btn btn-xs m-0.5 rounded-full " + (!tags.includes(key) ? "btn-neutral btn-outline" : "btn-primary")
					}
					onClick={() => handleTagClick(key)}
				>
					{Object.values(QuestionTag)[index]}
				</button>
			))}
		</div>
	)
}
