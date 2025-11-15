/* eslint-disable no-unused-vars */
import { useTheme } from "../hooks/useTheme"
import { motion } from "framer-motion"
import { Leaf, TrendingUp } from "lucide-react"
import { fadeIn } from "../../utils/data/variants"
import bannerImg from "/hero.webp"

const Banner = ({ title, subtitle, paragraph }) => {
	const { theme } = useTheme()
	return (
		<section className="relative min-h-screen -mt-8 flex items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0 overflow-hidden">
				<img src={bannerImg} alt="Pineapple farm aerial view" className="w-full h-full object-cover" />
				<div
					className={`absolute inset-0 bg-gradient-to-b from-black via-black/40 ${
						theme === "light" ? "to-accent-light" : "to-black"
					}`}
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 max-w-7xl -mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center overflow-hidden">
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
				</motion.div>
			</div>
		</section>
	)
}

export default Banner
