import { random } from "lodash"

import "../../index.css"

export const Background = () => {
	const randomIndex = random(0, 3, false)
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-base-100" style={{ zIndex: -10 }}>
			{randomIndex === 0 ? (
				<svg
					className="fill-svg"
					preserveAspectRatio="none"
					viewBox="0 0 900 600"
					style={{ width: "100vw", height: "100vh" }}
				>
					<defs>
						<linearGradient id="grad1_0" x1="33.3%" y1="100%" x2="100%" y2="0%">
							<stop offset="20%" stopColor="#001220" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#001220" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<defs>
						<linearGradient id="grad2_0" x1="0%" y1="100%" x2="66.7%" y2="0%">
							<stop offset="20%" stopColor="#001220" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#001220" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<g transform="translate(900, 600)">
						<path
							className="fill-accent"
							d="M-297.5 0C-267.9 -31.2 -238.4 -62.4 -219.9 -91.1C-201.3 -119.8 -193.7 -146.1 -179.6 -179.6C-165.5 -213.1 -144.9 -254 -113.8 -274.8C-82.8 -295.7 -41.4 -296.6 0 -297.5L0 0Z"
							fill="#a991f7"
						></path>
					</g>
					<g transform="translate(0, 0)">
						<path
							className="fill-accent"
							d="M297.5 0C269.2 30.7 240.9 61.4 225.4 93.4C209.9 125.4 207.1 158.7 191.6 191.6C176.1 224.6 147.9 257.2 113.8 274.8C79.8 292.4 39.9 294.9 0 297.5L0 0Z"
							fill="#a991f7"
						></path>
					</g>
				</svg>
			) : randomIndex === 1 ? (
				<svg
					className="fill-svg"
					preserveAspectRatio="none"
					viewBox="0 0 900 600"
					style={{ width: "100vw", height: "100vh" }}
				>
					<defs>
						<linearGradient id="grad1_0" x1="33.3%" y1="100%" x2="100%" y2="0%">
							<stop offset="20%" stopColor="#001220" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#001220" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<defs>
						<linearGradient id="grad2_0" x1="0%" y1="100%" x2="66.7%" y2="0%">
							<stop offset="20%" stopColor="#001220" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#001220" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<g transform="translate(900, 600)">
						<path
							d="M-405.6 0C-379.1 -48.9 -352.6 -97.8 -323.4 -133.9C-294.1 -170.1 -262 -193.6 -236.9 -236.9C-211.7 -280.2 -193.6 -343.3 -155.2 -374.7C-116.9 -406.2 -58.5 -405.9 0 -405.6L0 0Z"
							fill="#eee"
						></path>
					</g>
					<g transform="translate(0, 0)">
						<path
							d="M405.6 0C402.8 55 400 109.9 374.7 155.2C349.5 200.5 301.9 236.2 256.7 256.7C211.5 277.2 168.7 282.6 126.3 304.9C83.9 327.2 42 366.4 0 405.6L0 0Z"
							fill="#eee"
						></path>
					</g>
				</svg>
			) : (
				<svg
					className="fill-svg"
					preserveAspectRatio="none"
					viewBox="0 0 900 600"
					style={{ width: "100vw", height: "100vh" }}
				>
					<defs>
						<linearGradient id="grad1_0" x1="33.3%" y1="100%" x2="100%" y2="0%">
							<stop offset="20%" stopColor="#001220" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#001220" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<defs>
						<linearGradient id="grad2_0" x1="0%" y1="100%" x2="66.7%" y2="0%">
							<stop offset="20%" stopColor="#001220" stopOpacity="1"></stop>
							<stop offset="80%" stopColor="#001220" stopOpacity="1"></stop>
						</linearGradient>
					</defs>
					<g transform="translate(900, 600)">
						<path
							d="M-378.6 0C-376.1 -53.3 -373.6 -106.6 -348.3 -144.3C-323 -182 -274.8 -204.1 -239.7 -239.7C-204.6 -275.3 -182.6 -324.4 -144.9 -349.8C-107.1 -375.2 -53.6 -376.9 0 -378.6L0 0Z"
							fill="#eee"
						></path>
					</g>
					<g transform="translate(0, 0)">
						<path
							d="M378.6 0C379.6 55.9 380.6 111.7 349.8 144.9C318.9 178 256.2 188.5 218.5 218.5C180.8 248.5 168.1 298 135.9 328C103.6 357.9 51.8 368.2 0 378.6L0 0Z"
							fill="#eee"
						></path>
					</g>
				</svg>
			)}
			<div className="fixed top-0 left-0 w-full h-full backdrop-blur-3xl sm:backdrop-blur-0"></div>
		</div>
	)
}

/**
 * <div className="fixed inset-0 z-2 bg-accent">
			<svg className="w-full h-full">
				<image className="z-0" xlinkHref="/shine.svg" x="-50vw" y="-50vh" height="200vh" width="200vw" />
			</svg>
		</div>
 */
