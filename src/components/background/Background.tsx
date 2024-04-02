import { BackgroundElement } from "./BackgroundElement"

type BackgroundProps = {
	nbElements: number
}

export const Background = (props: BackgroundProps) => {
	return (
		<div className="absolute inset-0">
			{Array.from({ length: props.nbElements }).map((_, index) => (
				<BackgroundElement key={index} />
			))}
		</div>
	)
}
