import { useState } from "react"

const YouTubeEmbed = ({ src, className }) => {
	const [loaded, setLoaded] = useState(false)

	return (
		<div className={`relative rounded-2xl overflow-hidden bg-base-200 ${className}`}>
			{!loaded && <div className="skeleton" />}

			<iframe
				className={`w-full h-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
				src={src}
				onLoad={() => setLoaded(true)}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
				title="YouTube video"
			/>
		</div>
	)
}

export default YouTubeEmbed
