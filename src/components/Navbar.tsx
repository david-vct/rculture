import { Link } from "react-router-dom"
import { ThemeSwitch } from "./ThemeSwitch"

export const Navbar = () => {
	return (
		<div className="navbar absolute z-10 bg-transparent">
			<div className="flex-1 space-x-4">
				<Link to={"/"}>
					<div>
						<img className="object-contain w-12" src="/rculture-logo.png" />
					</div>
				</Link>
				<div className="menu menu-horizontal bg-base-100 rounded-box">
					<li>
						<Link to={"/questions"}>Créer des questions</Link>
					</li>
				</div>
			</div>

			<div className="flex-none px-2">
				<ThemeSwitch />
			</div>
		</div>
	)
}
