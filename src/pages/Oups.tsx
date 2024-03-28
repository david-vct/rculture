import { Link } from "react-router-dom"

export const Oups = () => {
	return (
		<div>
			<Link to={"/"}>Revenir à l'accueil</Link>
			<h1>Oups!</h1>
			<p>C'est surement un petit rien...</p>
		</div>
	)
}
