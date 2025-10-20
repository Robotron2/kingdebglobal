/* eslint-disable no-unused-vars */
import { useTheme } from "../hooks/useTheme"
import { motion } from "framer-motion"
import { Leaf, TrendingUp } from "lucide-react"
import { fadeIn } from "../../utils/data/variants"

const Banner = ({ title, subtitle, paragraph }) => {
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
					className={`absolute inset-0 bg-gradient-to-b from-black via-black/40 ${
						theme === "light" ? "to-accent-light" : "to-black"
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
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-6 text-balance"
						variants={fadeIn("down", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						{title}
						<br />
						<span className="text-accent mt-1">{subtitle}</span>
					</motion.h1>

					<motion.p
						className="text-md sm:text-lg text-gray-300 mb-8 max-w-3xl mx-auto text-pretty font-semibold"
						variants={fadeIn("up", 0.2)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.5 }}>
						{paragraph}
					</motion.p>

					{/* Trust Badges */}
					<motion.div
						className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-12"
						variants={fadeIn("down", 0.3)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.6 }}>
						<div className="flex items-center gap-2 text-gray-300">
							<Leaf className="h-6 w-6 text-primary " />
							<span className="text-base font-semibold">100% Organic</span>
						</div>
						<div className="flex items-center gap-2 text-gray-300">
							<TrendingUp className="h-6 w-6 text-accent" />
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

export default Banner
