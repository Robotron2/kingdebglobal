/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "./ui/Card"
import { testimonials } from "../data/testimonials"

export function Testimonials() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [itemsToShow, setItemsToShow] = useState(3)

	useEffect(() => {
		const updateItemsToShow = () => {
			if (window.innerWidth < 768) {
				setItemsToShow(1)
			} else if (window.innerWidth < 1024) {
				setItemsToShow(2)
			} else {
				setItemsToShow(3)
			}
		}

		updateItemsToShow()
		window.addEventListener("resize", updateItemsToShow)
		return () => window.removeEventListener("resize", updateItemsToShow)
	}, [])

	const maxIndex = Math.max(0, testimonials.length - itemsToShow)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
		}, 6000)

		return () => clearInterval(interval)
	}, [maxIndex])

	const next = () => {
		if (currentIndex < maxIndex) {
			setCurrentIndex((prev) => prev + 1)
		}
	}

	const prev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1)
		}
	}

	return (
		<section className="container py-20 bg-muted">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
						What Our Customers Say
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Join thousands of satisfied customers enjoying fresh, sustainable pineapples.
					</p>
				</motion.div>

				<div className="relative">
					<div className="overflow-hidden">
						<motion.div
							className="flex gap-8"
							animate={{ x: `${-currentIndex * (100 / itemsToShow)}%` }}
							transition={{
								type: "tween",
								ease: "easeInOut",
								duration: 0.8,
							}}>
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.name}
									className="flex-shrink-0 bg-none"
									style={{
										width: `calc(${100 / itemsToShow}% - ${
											((itemsToShow - 1) * 32) / itemsToShow
										}px)`,
									}}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: index * 0.1 }}>
									<Card className="h-full border-none backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow">
										<CardContent className="p-6">
											<div className="flex items-center gap-1 mb-4">
												{Array.from({ length: 5 }).map((_, i) => (
													<Star key={i} className="h-5 w-5 fill-accent text-accent" />
												))}
											</div>

											<p className="text-card-foreground text-pretty mb-6 leading-relaxed">
												"{testimonial.quote}"
											</p>

											<div className="flex items-center gap-3">
												<img
													src={testimonial.avatar || "/placeholder.svg"}
													alt={testimonial.name}
													className="w-12 h-12 rounded-full object-cover"
													loading="lazy"
												/>
												<div>
													<p className="font-semibold text-card-foreground">
														{testimonial.name}
													</p>
													<p className="text-sm text-muted-foreground">{testimonial.role}</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</div>

					{maxIndex > 0 && (
						<>
							<button
								className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm shadow-lg"
								onClick={prev}
								disabled={currentIndex === 0}
								aria-label="Previous testimonials">
								<ChevronLeft className="h-5 w-5" />
							</button>

							<button
								className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm shadow-lg"
								onClick={next}
								disabled={currentIndex >= maxIndex}
								aria-label="Next testimonials">
								<ChevronRight className="h-5 w-5" />
							</button>
						</>
					)}

					{maxIndex > 0 && (
						<div
							className="flex justify-center gap-2 mt-8"
							role="tablist"
							aria-label="Testimonial navigation">
							{Array.from({ length: maxIndex + 1 }).map((_, index) => (
								<button
									key={index}
									className={`h-2 rounded-full transition-all ${
										index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/90"
									}`}
									onClick={() => setCurrentIndex(index)}
									aria-label={`Go to testimonial ${index + 1}`}
									role="tab"
									aria-selected={index === currentIndex}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
