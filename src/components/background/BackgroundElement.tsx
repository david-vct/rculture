import "../../index.css"

export const BackgroundElement = () => {
	const x = Math.round(Math.random() * 8 + 1) * 10
	const y = Math.random() * 100

	console.log(x, y)
	const time = Math.random() * 10 + 10
	const color = Math.floor(Math.random() * 2) === 0 ? "text-neutral" : "text-secondary"

	return (
		<div
			className={"absolute text-5xl font-bold text-secondary " + color}
			style={{
				top: y + "%",
				left: x + "%",
				animation: "background-animation " + time + "s infinite",
			}}
		>
			?
		</div>
	)
}
