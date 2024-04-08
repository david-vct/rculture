import { JoinGame } from "../components/JoinGame"
import { QuestionStatistics } from "../components/QuestionStatistics"

export const Home = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center pt-10">
			<div className="flex flex-col items-center w-full sm:w-auto px-4 py-8 sm:px-8 rounded-3xl">
				<div className="flex flex-col items-center pb-16">
					<h1 className="text-7xl sm:text-9xl font-bold">Rculture</h1>
					<p className="text-lg sm:text-xl font-medium pb-4 text-center">
						Le jeu de se <span className="line-through decoration-primary decoration-2">culturé</span> culturer avec des{" "}
						<span className="underline decoration-wavy decoration-primary">quiz</span> et des{" "}
						<span className="underline decoration-wavy decoration-primary">potes</span>
					</p>
					<QuestionStatistics />
				</div>
				<JoinGame />
			</div>
		</div>
	)
}
