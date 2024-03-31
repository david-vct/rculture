import { Link } from "react-router-dom"
import { ThemeSwitch } from "./ThemeSwitch"

export const Navbar = () => {
	return (
		<div className="navbar bg-base-100 fixed top-0 px-4">
			<div className="navbar-start space-x-4">
				<div className="menu menu-vertical lg:menu-horizontal bg-base-100 rounded-box">
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

			<div className="navbar-end">
				<ThemeSwitch />
			</div>
		</div>
	)
}
