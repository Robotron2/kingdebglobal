/* eslint-disable no-unused-vars */
// import { useNavigate } from "react-router-dom"
// import pineBg from "../../public/pineapple-field-aerial-view-tropical-farm.jpg"
// import { motion } from "framer-motion"
// import { fadeIn } from "../../utils/data/variants"

// const Hero = () => {
// 	const navigate = useNavigate()

// 	return (
// 		<section>
// 			<div
// 				className="hero min-h-screen"
// 				style={{
// 					backgroundImage: `url(${pineBg})`,
// 				}}>
// 				<div className="hero-overlay opacity-80 bg-black"></div>
// 				<div className="hero-content text-neutral-content text-center">
// 					<div className="max-w-md">
// 						<h1 className="mb-5 text-5xl font-bold">Hello there</h1>
// 						<p className="mb-5">
// 							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
// 							quasi. In deleniti eaque aut repudiandae et a id nisi.
// 						</p>
// 						<button className="btn btn-primary">Get Started</button>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	)
// }

// export default Hero

import { motion } from "framer-motion"
import { ShoppingBag, TrendingUp, Truck, Leaf } from "lucide-react"
import { useTheme } from "../hooks/useTheme"

export function Hero() {
	const { theme } = useTheme()
	return (
		<section className="relative min-h-screen -mt-8 flex items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<img
					src="/pineapple-field-aerial-view-tropical-farm.jpg"
					alt="Pineapple farm aerial view"
					className="w-full h-full object-cover"
				/>
				<div
					className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 ${
						theme === "light" ? "to-accentLight" : "to-black/80"
					}`}
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl -mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<motion.h1
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}>
						Fresh Tropical Pineapples
						<br />
						<span className="text-accent mt-1">From Farm to Table</span>
					</motion.h1>

					<motion.p
						className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty font-semibold"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}>
						Experience the sweetest, most sustainable pineapples. Shop premium produce or invest in the
						future of tropical agriculture.
					</motion.p>

					<motion.div
						className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 "
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}>
						<button className="btn  bg-accent text-primary hover:bg-accent/90 font-semibold text-lg px-6">
							Shop Now
						</button>

						<button className="btn bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-semibold text-lg px-6">
							Invest Today
						</button>
					</motion.div>

					{/* Trust Badges */}
					<motion.div
						className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}>
						<div className="flex items-center gap-2 text-white/90">
							<Leaf className="h-5 w-5 text-secondary" />
							<span className="text-sm font-medium">100% Organic</span>
						</div>
						<div className="flex items-center gap-2 text-white/90">
							<TrendingUp className="h-5 w-5 text-accent" />
							<span className="text-sm font-medium">Sustainable Farming</span>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}>
				<div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
					<div className="w-1.5 h-3 bg-white/70 rounded-full" />
				</div>
			</motion.div>
		</section>
	)
}
export default Hero
