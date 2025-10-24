/* eslint-disable no-unused-vars */

import { motion } from "framer-motion"
import { TrendingUp, Leaf } from "lucide-react"
import { useTheme } from "../hooks/useTheme"
import { fadeIn } from "../../utils/data/variants"
import pineBg from "/hero.webp"

export function Hero() {
	const { theme } = useTheme()
	return (
		<section className="relative min-h-screen -mt-8 flex items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<img src={pineBg} alt="Pineapple farm aerial view" className="w-full h-full object-cover" />
				<div
					className={`absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 ${
						theme === "light" ? "to-accent-light" : "to-black/80"
					}`}
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl -mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
				<motion.div
					variants={fadeIn("down", 0.1)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: false, amount: 0.4 }}>
					<motion.h5
						className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-balance"
						variants={fadeIn("down", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<span
							className="text-primary
                        ">
							Green
						</span>{" "}
						is Life, <span className="text-primary">Green </span> is Wealth
					</motion.h5>
					<motion.h1
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance"
						variants={fadeIn("up", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						Fresh <span className="text-accent">Tropical</span> Pineapples
						<br />
						<span className="text-accent mt-1">From Farm to Table</span>
					</motion.h1>

					<motion.p
						className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty font-semibold"
						variants={fadeIn("left", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						Experience the sweetest, most sustainable pineapples. Shop premium produce or invest in the
						future of tropical agriculture.
					</motion.p>

					<motion.div
						className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 "
						variants={fadeIn("right", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
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
						variants={fadeIn("left", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<div className="flex items-center gap-2 text-muted-light">
							<Leaf className="h-5 w-5 text-primary" />
							<span className="text-base font-semibold">100% Organic</span>
						</div>
						<div className="flex items-center gap-2 text-white/90">
							<TrendingUp className="h-5 w-5 text-accent" />
							<span className="text-base font-semibold">Sustainable Farming</span>
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
