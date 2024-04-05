import { JoinGame } from "../components/JoinGame"

export const Home = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center pt-8">
			<div className="flex flex-col items-center w-full sm:w-auto px-4 py-8 sm:px-8 rounded-3xl">
				<h1 className="text-9xl font-bold">Rculture</h1>
				<p className="font-bold pb-16">Un jeu de se culturer avec des quiz</p>

				<JoinGame />
			</div>
		</div>
	)
}
