const Loading = () => {
	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center bg-base-100 text-base-content transition-colors duration-300 z-50">
			{/* Spinner */}
			<span className="loading loading-spinner loading-lg text-primary mb-3"></span>

			{/* Text */}
			<p className="font-medium tracking-wide animate-pulse">Loading...</p>
		</div>
	)
}

export default Loading
