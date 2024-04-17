import { useState } from "react"
import { logout, signIn, signInWithGoogle } from "../services/authentication"
import { Toast } from "../components/Toast"
import { toast } from "react-toastify"

type AuthProps = {
	onSignIn: () => void
}

export const Auth = (props: AuthProps) => {
	const [name, setName] = useState("")

	const handleSignIn = (name: string) => {
		signIn(name).then((response) => {
			if (response.success) {
				toast.success("Connexion reussie")
			} else {
				toast.error("Erreur lors de la connexion")
			}

			props.onSignIn()
		})
	}

	const handleSignInWithGoogle = () => {
		signInWithGoogle().then((response) => {
			if (response.success) {
				toast.success("Connexion reussie")
			} else {
				toast.error("Erreur lors de la connexion")
			}

			props.onSignIn()
		})
	}

	const handleLogout = () => {
		logout()
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center pt-16">
			<div className="w-full lg:w-3/4 max-w-xl px-4 py-8 lg:px-8 space-y-4 rounded-box ">
				<div className="card-body">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Nom</span>
						</label>
						<input
							type="email"
							className="input input-bordered rounded-full"
							placeholder="nom"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="form-control mt-6">
						<button className="btn btn-neutral rounded-full" onClick={() => handleSignIn(name)}>
							Sign In
						</button>
					</div>

					<div className="divider">ou</div>

					<button className="btn btn-primary rounded-full" onClick={handleSignInWithGoogle}>
						Sign in with Google
					</button>

					<div className="mt-6">
						Assez pour aujourd'hui...&nbsp;
						<span>
							<a className="link" onClick={handleLogout}>
								logout
							</a>
						</span>
					</div>
				</div>
			</div>
			<Toast />
		</div>
	)
}
