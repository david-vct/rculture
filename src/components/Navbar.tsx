import { Link } from "react-router-dom"
import { ThemeSwitch } from "./ThemeSwitch"

export const Navbar = () => {
	return (
		<div className="navbar fixed top-0">
			<div className="flex-1 space-x-4">
				<div className="menu menu-horizontal bg-base-100 rounded-box">
					<li>
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						<Link to={"/questions"}>Créer des questions</Link>
					</li>
					<li>
						<Link to={"/signin"}>Connexion</Link>
					</li>
				</div>
			</div>

			<div className="flex-none px-2">
				<ThemeSwitch />
			</div>
		</div>
	)
}
