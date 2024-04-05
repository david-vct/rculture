import { JoinGame } from "../components/JoinGame"

export const Home = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center pt-8">
			<div className="flex flex-col items-center w-full sm:w-auto px-4 py-8 sm:px-8 rounded-3xl">
				<h1 className="text-7xl sm:text-9xl font-bold">Rculture</h1>
				<p className="text-lg sm:text-xl font-medium pb-16">
					Le jeu de se <span className="line-through decoration-primary decoration-2">culturé</span> culturer avec des{" "}
					<span className="underline decoration-wavy decoration-primary">quiz</span> et des{" "}
					<span className="underline decoration-wavy decoration-primary">potes</span>
				</p>
				<JoinGame />
			</div>
		</div>
	)
}
