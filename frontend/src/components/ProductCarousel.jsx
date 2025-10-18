/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "./ProductCard"
import { useEffect, useState } from "react"
import { products } from "../data/products"

export function ProductCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [direction, setDirection] = useState(0)

	const itemsPerView = {
		mobile: 1,
		tablet: 2,
		desktop: 3,
	}

	const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop)

	useEffect(() => {
		const updateItemsToShow = () => {
			if (window.innerWidth < 640) {
				setItemsToShow(itemsPerView.mobile)
			} else if (window.innerWidth < 1024) {
				setItemsToShow(itemsPerView.tablet)
			} else {
				setItemsToShow(itemsPerView.desktop)
			}
		}

		updateItemsToShow()
		window.addEventListener("resize", updateItemsToShow)
		return () => window.removeEventListener("resize", updateItemsToShow)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const maxIndex = Math.max(0, products.length - itemsToShow)

	useEffect(() => {
		const interval = setInterval(() => {
			setDirection(1)
			setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
		}, 5000)

		return () => clearInterval(interval)
	}, [maxIndex])

	const next = () => {
		if (currentIndex < maxIndex) {
			setDirection(1)
			setCurrentIndex((prev) => prev + 1)
		}
	}

	const prev = () => {
		if (currentIndex > 0) {
			setDirection(-1)
			setCurrentIndex((prev) => prev - 1)
		}
	}

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "ArrowLeft") prev()
			if (e.key === "ArrowRight") next()
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex, maxIndex])

	return (
		<div className="relative" role="region" aria-label="Product carousel">
			<div className="overflow-hidden">
				<motion.div
					className="flex gap-6"
					animate={{ x: `${-currentIndex * (100 / itemsToShow)}%` }}
					transition={{
						type: "tween",
						ease: "easeInOut",
						duration: 0.8,
					}}>
					{products.map((product) => (
						<div
							key={product.id}
							className="flex-shrink-0"
							style={{
								width: `calc(${100 / itemsToShow}% - ${((itemsToShow - 1) * 24) / itemsToShow}px)`,
							}}>
							<ProductCard product={product} />
						</div>
					))}
				</motion.div>
			</div>

			{/* Navigation Buttons */}

			<button
				className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm shadow-lg p-2"
				onClick={prev}
				disabled={currentIndex === 0}
				aria-label="Previous products">
				<ChevronLeft className="h-5 w-5" />
			</button>

			<button
				className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm shadow-lg p-2"
				onClick={next}
				disabled={currentIndex >= maxIndex}
				aria-label="Next products">
				<ChevronRight className="h-5 w-5" />
			</button>

			{/* Indicators */}
			<div className="flex justify-center gap-2 -mt-32" role="tablist" aria-label="Carousel navigation">
				{Array.from({ length: maxIndex + 1 }).map((_, index) => (
					<button
						key={index}
						className={`h-2 rounded-full transition-all ${
							index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/90"
						}`}
						onClick={() => {
							setDirection(index > currentIndex ? 1 : -1)
							setCurrentIndex(index)
						}}
						aria-label={`Go to slide ${index + 1}`}
						role="tab"
						aria-selected={index === currentIndex}
					/>
				))}
			</div>
		</div>
	)
}
