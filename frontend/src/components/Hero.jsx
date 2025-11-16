/* eslint-disable no-unused-vars */

import { motion } from "framer-motion"
import { TrendingUp, Leaf } from "lucide-react"
import { useTheme } from "../hooks/useTheme"
import { fadeIn } from "../../utils/data/variants"
import pineBg from "/hero.webp"
import { Link } from "react-router-dom"
import YouTubeEmbed from "./YoutubeEmbed"

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
			<div className="relative z-10 max-w-7xl -mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
				<motion.div
					variants={fadeIn("down", 0.1)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: false, amount: 0.4 }}>
					<motion.h5
						className="text-4xl md:text-5xl lg:text-7xl  font-bold text-white mb-6 text-balance mt-2"
						variants={fadeIn("down", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<span
							className="text-primary 
                        ">
							Green
						</span>{" "}
						is Life, <span className="text-primary ">Green </span> is Wealth
					</motion.h5>
					<motion.h1
						className="text-lg md:text-3xl lg:text-5xl font-bold text-white mb-6 text-balance"
						variants={fadeIn("up", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						Fresh <span className="text-accent">Tropical</span> Pineapples
						<br />
						<span className="text-accent mt-1">From Farm to Table</span>
					</motion.h1>

					<motion.p
						className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty font-semibold"
						variants={fadeIn("left", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						Experience the sweetest, most sustainable pineapples. Shop premium produce or invest in the
						future of tropical agriculture.
						<span className="flex text-center items-center justify-center gap-2">
							<small>100% Ogranic</small>
							<small>Sustainable Farming</small>
						</span>
					</motion.p>

					<motion.div
						className="flex flex-row items-center justify-center gap-4 mb-12 -mt-2"
						variants={fadeIn("right", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<a
							href="#products"
							className="btn  bg-accent text-primary hover:bg-accent/90 font-semibold text-lg px-6 w-1/3 md:w-1/4">
							Shop
						</a>

						<Link
							to={"/contact-us"}
							className="btn bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 font-semibold text-lg px-6 w-1/3 md:w-1/4">
							Invest
						</Link>
					</motion.div>
				</motion.div>
				<div>
					<YouTubeEmbed
						src="https://www.youtube.com/embed/h0BxCpJM0Qs?si=Bhuz9kMgHRq4P9gA"
						className="h-[180px] md:h-[350px] w-full bg-base-200 "
					/>
				</div>
			</div>
		</section>
	)
}
export default Hero
