import { useEffect } from "react"

type LoadingPageProps = {
	duration: number
	text: string
	onComplete: () => void
}

export const LoadingPage = (props: LoadingPageProps) => {
	useEffect(() => {
		// Countdown
		setTimeout(() => {
			props.onComplete()
		}, props.duration)
	}, [props, props.onComplete, props.duration])

	return (
		<div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-base-100/80 transition-all">
			<span className="loading loading-dots loading-md"></span>
			<p>{props.text}</p>
		</div>
	)
}
