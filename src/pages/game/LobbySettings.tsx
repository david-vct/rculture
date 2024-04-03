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

	const startGameHandler = () => {
		// Verify tags
		if (tags.length === 0) {
			return toast.error("Veuillez sélectionner au moins un thème")
		}

		// Verify number of questions
		if (nbQuestions <= 0 || nbQuestions > 10) {
			return toast.error("Veuillez entrer un nombre de questions entre 1 et 10")
		}

		// Set up and start game with new settings
		startGame(props.gameId, tags, nbQuestions).then((response) => {
			if (!response.success) {
				console.error(response.error)
				toast.error("Erreur lors de le lancement du jeu")
			} else {
				toast.success("Jeu lancé avec succes")
			}
		})
	}

	const setNbQuestionsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value)
		if (!isNaN(value)) setNbQuestions(value)
	}

	const handleTagSelectorChange = (tags: string[]) => {
		setTags(tags)
	}

	return (
		<div className="flex flex-col space-y-4">
			<h2 className="text-2xl">Parametres</h2>
			<div>Code : {props.gameId}</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Nombre de questions</span>
				</label>
				<input
					className="input input-bordered rounded-full"
					placeholder="Nombre de questions"
					type="number"
					value={nbQuestions}
					onChange={setNbQuestionsHandler}
				/>
			</div>
			<div className="form-control pb-4">
				<label className="label">
					<span className="label-text">Thèmes</span>
				</label>
				<TagSelector onChange={(tags) => handleTagSelectorChange(tags)} />
			</div>
			<button className="btn btn-primary self-end rounded-full" onClick={startGameHandler}>
				Commencer
			</button>
			<Toast />
		</div>
	)
}
