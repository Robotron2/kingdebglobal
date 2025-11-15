import { useEffect, useRef, useState } from "react"

const YouTubeEmbed = ({
	src,
	className = "",
	minSkeletonMs = 200,
	fallbackTimeoutMs = 10000,
	title = "YouTube video",
	onReady,
	onError,
}) => {
	const [loaded, setLoaded] = useState(false)
	const [errored, setErrored] = useState(false)
	const mountTimeRef = useRef(null)
	const fallbackTimerRef = useRef(null)
	const settleTimerRef = useRef(null)

	const iframeLoadedRef = useRef(false)

	const [iframeKey, setIframeKey] = useState(0)

	useEffect(() => {
		mountTimeRef.current = Date.now()
		iframeLoadedRef.current = false
		setLoaded(false)
		setErrored(false)

		if (fallbackTimeoutMs > 0) {
			fallbackTimerRef.current = setTimeout(() => {
				if (!iframeLoadedRef.current) {
					console.warn("[YouTubeEmbed] fallback timeout reached, marking errored")
					setErrored(true)

					setLoaded(true)
					if (typeof onError === "function") onError(new Error("Iframe load timeout"))
				} else {
					console.log("[YouTubeEmbed] fallback timer fired, but iframe already loaded")
				}
			}, fallbackTimeoutMs)
		}

		return () => {
			clearTimeout(fallbackTimerRef.current)
			clearTimeout(settleTimerRef.current)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iframeKey])

	const handleIframeLoad = () => {
		iframeLoadedRef.current = true
		clearTimeout(fallbackTimerRef.current)

		const now = Date.now()
		const elapsed = mountTimeRef.current ? now - mountTimeRef.current : Infinity
		const remaining = Math.max(0, minSkeletonMs - elapsed)

		if (remaining === 0) {
			setLoaded(true)
			if (typeof onReady === "function") onReady()
		} else {
			settleTimerRef.current = setTimeout(() => {
				setLoaded(true)
				if (typeof onReady === "function") onReady()
			}, remaining)
		}

		if (errored) setErrored(false)
		console.log("[YouTubeEmbed] iframe onLoad fired — iframe considered loaded")
	}

	const handleRetry = () => {
		console.log("[YouTubeEmbed] retrying iframe load")
		clearTimeout(fallbackTimerRef.current)
		clearTimeout(settleTimerRef.current)
		iframeLoadedRef.current = false
		setErrored(false)
		setLoaded(false)
		setIframeKey((k) => k + 1)
	}

	if (!src || typeof src !== "string") {
		return (
			<div className={`relative rounded-2xl overflow-hidden bg-base-200 ${className} aspect-video`}>
				<div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
					Invalid video source
				</div>
			</div>
		)
	}

	return (
		<div className={`relative rounded-2xl overflow-hidden bg-base-200 ${className} aspect-video`}>
			{/* Skeleton overlay until we consider the iframe loaded */}
			{!loaded && (
				<div className="absolute inset-0 z-30 flex items-center justify-center" aria-hidden="true">
					<div className="w-full h-full animate-pulse" />
				</div>
			)}

			{/* If errored, show retry overlay on top */}
			{errored && (
				<div
					className="absolute inset-0 z-40 flex items-center justify-center p-4"
					role="alert"
					aria-live="polite">
					<div className="text-center">
						<div className="mb-2 text-sm font-medium">Video failed to load</div>
						<button className="px-3 py-1 text-sm rounded bg-primary text-white" onClick={handleRetry}>
							Retry
						</button>
					</div>
				</div>
			)}

			{/* iframe (key changes on retry) */}
			<iframe
				key={iframeKey}
				className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${
					loaded ? "opacity-100" : "opacity-0 pointer-events-none"
				} z-10`}
				src={src}
				onLoad={handleIframeLoad}
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerPolicy="strict-origin-when-cross-origin"
				allowFullScreen
				title={title}
			/>
		</div>
	)
}

export default YouTubeEmbed
