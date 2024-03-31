import { Navbar } from "../../components/Navbar"
import { LobbySettings } from "./LobbySettings"
import { LobbyPlayers } from "./LobbyPlayers"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { addPlayerToGame, listenGame, updateGameUserAnswers, updateGameUserReviews } from "../../services/games-store"
import { getSnapshotData } from "../../services/store"
import { Game, GameSchema, GameState, Question, StoreResponse } from "../../utils/types"
import { GameQuestion } from "./GameQuestion"
import { getUserInfo } from "../../services/authentication"
import { isEqual } from "lodash"
import { GameReview } from "./GameReview"
import { GameScoreBoard } from "./GameScoreBoard"

export const GameController = () => {
	const [gameState, setGameState] = useState(GameState.WAITING)
	const [questionIndex, setQuestionIndex] = useState(0)
	const [usernames, setUsernames] = useState({})
	const [questions, setQuestions] = useState([] as Question[])
	const [answers, setAnswers] = useState({} as Record<string, string>)
	const [game, setGame] = useState({} as Game)

	const { gameId } = useParams()
	const navigate = useNavigate()

	console.log("Rendering app")

	// Game state contoller
	useEffect(() => {
		if (gameId === undefined) {
			console.error("Undefined game id")
			navigate("/error/")
			return
		}

		// Add user to game
		addPlayerToGame(gameId, getUserInfo())

		// TODO: Handle stop listening game
		listenGame(gameId, (snapshot) => {
			console.log("Snapshot listener")
			const response: StoreResponse<Game> = getSnapshotData(snapshot, GameSchema)

			// Error handler
			if (!response.success) {
				console.error(response.error)
				navigate("/error/")
				return
			}
			if (response.data.length !== 1) {
				console.error("Number of games must be 1")
				navigate("/error/")
				return
			}

			// Get this game
			const game = response.data.shift()!

			// Set game as state
			setGame(game)

			// Update users if needed
			if (!isEqual(usernames, game.users)) {
				setUsernames(Object.values(game.users))
			}

			// Start the game play
			if (game.isSetup) {
				setQuestions(game.questions)
				setGameState(GameState.PLAYING)
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Game play controller
	const handleAnswer = (answer: string) => {
		// Add answer to answers
		answers[questions[questionIndex].id] = answer
		setAnswers(answers)

		// Next question
		if (questionIndex < questions.length - 1) {
			setQuestionIndex(questionIndex + 1)
		}

		// Reviwing state
		else {
			updateGameUserAnswers(game.id, getUserInfo().id, answers).then((response) => {
				if (!response.success) {
					console.error(response.error)
					navigate("/error/")
				} else {
					setGameState(GameState.REVIEWING)
				}
			})
		}
	}

	const handleReviewCompleted = (reviews: Record<string, Record<string, boolean>>) => {
		updateGameUserReviews(game.id, getUserInfo().id, reviews).then((response) => {
			if (!response.success) {
				console.error(response.error)
				navigate("/error/")
			} else {
				setGameState(GameState.END)
				console.log("Game end!!")
			}
		})
	}

	if (gameId === undefined) {
		console.error("Undefined game id")
		navigate("/error/")
		return
	}

	return (
		<div>
			<Navbar />
			{gameState === GameState.WAITING ? (
				<div>
					<h1>Nouvelle partie</h1>
					<LobbySettings gameId={gameId} />
					<LobbyPlayers usernames={usernames} />
				</div>
			) : gameState === GameState.PLAYING ? (
				<GameQuestion question={questions[questionIndex]} sendAnswer={handleAnswer} />
			) : gameState === GameState.REVIEWING ? (
				<GameReview game={game} sendReviews={handleReviewCompleted} />
			) : (
				<GameScoreBoard game={game} />
			)}
		</div>
	)
}
