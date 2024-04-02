import { createUserWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut } from "firebase/auth"
import { auth, googleAuthProvider } from "../config/firebase"
import { UserInfo } from "../utils/types"
import { getErrorStoreResponse, getSuccessStoreResponse, initializeAnonymousUserInfo } from "../utils/utils"

/**
 * Sing in app anonymously
 * @param name
 * @returns
 */
export async function signIn(name: string) {
	if (name.trim() === "") {
		return getErrorStoreResponse("Le nom ne peut pas être vide")
	}

	try {
		const userCredentials = await signInAnonymously(auth)
		const userInfo = {
			id: userCredentials.user.uid,
			name,
			isAuth: true,
		}
		storeUserInfo(userInfo)
		return getSuccessStoreResponse([userInfo])
	} catch (error) {
		console.error(error)
		return getErrorStoreResponse(error)
	}
}

/**
 * Sign in app with an email and password
 * @param email
 * @param password
 */
export async function signInWithEmail(email: string, name: string, password: string) {
	try {
		const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
		const userInfo = {
			id: userCredentials.user.uid,
			name,
			isAuth: true,
		}
		storeUserInfo(userInfo)
		return getSuccessStoreResponse([userInfo])
	} catch (error) {
		console.error(error)
		return getErrorStoreResponse(error)
	}
}

/**
 * Sign in app with a Google account
 */
export async function signInWithGoogle() {
	try {
		const userCredentials = await signInWithPopup(auth, googleAuthProvider)
		const userInfo = {
			id: userCredentials.user.uid,
			name: userCredentials.user.displayName ?? "Anonymous",
			isAuth: true,
		}
		storeUserInfo(userInfo)
		return getSuccessStoreResponse([userInfo])
	} catch (error) {
		console.error(error)
		return getErrorStoreResponse(error)
	}
}

/**
 * Log out from any account
 */
export async function logout() {
	try {
		await signOut(auth)
		// Delete user from local storage
		storeUserInfo(initializeAnonymousUserInfo())
	} catch (error) {
		console.error(error)
		return getErrorStoreResponse(error)
	}
	return getSuccessStoreResponse([])
}

/**
 * Store user info on the local storage
 * @param id
 * @param name
 * @param isAuth
 */
function storeUserInfo(userInfo: UserInfo) {
	localStorage.setItem("auth", JSON.stringify(userInfo))
}

/**
 * Get user info from the local storage
 * @returns UserInfo
 */
export function getUserInfo(): UserInfo {
	const userInfoJson = localStorage.getItem("auth")

	if (userInfoJson === null) {
		return initializeAnonymousUserInfo()
	}

	return JSON.parse(userInfoJson) as UserInfo
}
