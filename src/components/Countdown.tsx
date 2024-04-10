import { useEffect, useState } from "react"

type CountdownProps = {
	time: number
	onComplete: () => void
}

export const Countdown = (props: CountdownProps) => {
	const [counter, setCounter] = useState(props.time)

	useEffect(() => {
		if (counter > 0) {
			setTimeout(() => setCounter(counter - 1), 1000)
		} else {
			props.onComplete()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [counter])

	useEffect(() => {
		setCounter(props.time)
	}, [props.time])

	return (
		<span className="">
			<span>{counter}</span>
		</span>
	)
}
