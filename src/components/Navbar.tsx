import { Link } from "react-router-dom"

export const Navbar = () => {
	return (
		<div>
			<Link to={"/"}>Home</Link>
			<Link to={"/creation"}>Créer des questions</Link>
			<Link to={"/signin"}>Connexion</Link>
		</div>
	)
}
