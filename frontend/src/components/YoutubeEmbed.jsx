import { useState } from "react"

const YouTubeEmbed = ({ src }) => {
	const [loaded, setLoaded] = useState(false)

	return (
		<div className="w-full h-full relative bg-base-200 rounded-2xl overflow-hidden">
			{!loaded && <div className="skeleton h-full w-full"></div>}

			<iframe
				className={`w-full h-full ${loaded ? "opacity-100" : "opacity-0"}`}
				src={src}
				title="YouTube video player"
				onLoad={() => setLoaded(true)}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
			/>
		</div>
	)
}

export default YouTubeEmbed
