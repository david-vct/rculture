import { useState } from "react"
import { startGame } from "../../services/games-store"
import { Toast } from "../../components/Toast"
import { toast } from "react-toastify"
import { TagSelector } from "../../components/question/TagSelector"

type LobbySettingsProps = {
	gameId: string
}

export const LobbySettings = (props: LobbySettingsProps) => {
	const [tags, setTags] = useState([] as string[])
	const [nbQuestions, setNbQuestions] = useState(10)
	const [answerDuration, setAnswerDuration] = useState(20)
	const [reviewDuration, setReviewDuration] = useState(20)

	const handleGameStart = () => {
		// Verify tags
		if (tags.length === 0) {
			return toast.error("Veuillez sélectionner au moins un thème")
		}

		// Verify number of questions
		if (nbQuestions <= 0 || nbQuestions > 10) {
			return toast.error("Veuillez entrer un nombre de questions entre 1 et 10")
		}

		// Set up and start game with new settings
		startGame(props.gameId, tags, nbQuestions, answerDuration, reviewDuration).then((response) => {
			if (!response.success) {
				console.error(response.error)
				toast.error("Erreur lors de le lancement du jeu")
			} else {
				toast.success("Jeu lancé avec succes")
			}
		})
	}

	const handleNbQuestionsChange = (nbQuestions: number) => {
		setNbQuestions(nbQuestions)
	}

	const handleTagSelectorChange = (tags: string[]) => {
		setTags(tags)
	}

	const handleAnswerDurationChange = (answerDuration: number) => {
		setAnswerDuration(answerDuration)
	}

	const handleReviewDurationChange = (reviewDuration: number) => {
		setReviewDuration(reviewDuration)
	}

	return (
		<div className="flex flex-col space-y-4">
			<h2 className="text-2xl">Paramètres</h2>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Nombre de questions</span>
				</label>
				<input
					className="input input-bordered max-w-sm rounded-full"
					placeholder="Nombre de questions"
					type="number"
					value={nbQuestions}
					onChange={(e) => handleNbQuestionsChange(e.target.valueAsNumber)}
				/>
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Thèmes</span>
				</label>
				<TagSelector onChange={(tags) => handleTagSelectorChange(tags)} />
			</div>
			<div className="form-control">
				<label>
					<span className="label-text">Durée par réponse ({answerDuration} s)</span>
				</label>
				<input
					type="range"
					min={5}
					max={60}
					value={answerDuration}
					className="range range-xs max-w-sm"
					onChange={(e) => handleAnswerDurationChange(e.target.valueAsNumber)}
				/>
			</div>
			<div className="form-control">
				<label>
					<span className="label-text">Durée par review ({reviewDuration} s)</span>
				</label>
				<input
					type="range"
					min={5}
					max={60}
					value={reviewDuration}
					className="range range-xs max-w-sm"
					onChange={(e) => handleReviewDurationChange(e.target.valueAsNumber)}
				/>
			</div>
			<button className="btn btn-primary self-end mt-4 rounded-full" onClick={handleGameStart}>
				Commencer
			</button>
			<Toast />
		</div>
	)
}
