/* eslint-disable no-unused-vars */
import Banner from "../components/Banner"
import { useTheme } from "../hooks/useTheme"
import { fadeIn } from "../../utils/data/variants"
import { motion } from "framer-motion"
import YouTubeEmbed from "../components/YoutubeEmbed"

const About = () => {
	const { theme } = useTheme()
	return (
		<>
			<Banner
				title={"About Us"}
				subtitle={""}
				paragraph={"Growing Africa’s finest pineapples while building wealth, sustainability, and opportunity."}
			/>

			<section className="container h-1/2 mx-auto my-8 overflow-hidden">
				{/* Who we are */}
				<div className="flex flex-col lg:flex-row lg:space-x-8 px-4 py-8">
					{/* Left side with Image content */}
					<motion.div
						className="w-full lg:w-1/2 flex flex-col space-y-4 mb-8 lg:mb-0"
						variants={fadeIn("left", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<div className="rounded-2xl shadow-xl overflow-hidden h-96 lg:h-auto lg:max-h-[350px] ">
							{/* Image One */}
							{/* <img src={pineBg} alt="Logistics Warehouse" className="w-full h-full object-cover" /> */}

							<YouTubeEmbed
								src="https://www.youtube.com/embed/h0BxCpJM0Qs?si=Bhuz9kMgHRq4P9gA"
								className="h-full lg:h-[350px] w-full"
							/>
						</div>

						<div className="flex space-x-4">
							{/* Image Two */}
							<div className="w-1/2 rounded-2xl shadow-xl overflow-hidden aspect-video">
								<YouTubeEmbed
									src="https://www.youtube.com/embed/5oPHFi3w9RQ?si=unYI0cc_bzcuNA9x"
									className="w-full aspect-video h-full"
								/>
							</div>

							{/* Image Three */}
							<div className="w-1/2 rounded-2xl shadow-xl overflow-hidden aspect-video">
								<YouTubeEmbed
									src={"https://www.youtube.com/embed/YneB51dWi-o?si=LUiIznjij14hvsfu"}
									className="w-full aspect-video h-full"
								/>
							</div>
						</div>
					</motion.div>

					{/* Right side with texts*/}
					{/* <div className="w-full lg:w-1/2">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">Who We Are</h2>

						<p className={`mb-4 ${theme === "light" ? "text-muted-dark" : "text-muted-light"}`}>
							At <strong className="text-primary">The0 Ltd</strong>, we are redefining how agriculture and
							investment connect. We specialize in sustainable pineapple cultivation and provide a
							transparent platform where individuals and institutions can invest in real agricultural
							value — driving growth from the farm to the global market.
						</p>

						<p className={`${theme === "light" ? "text-muted-dark" : "text-muted-light"}`}>
							Our work combines technology, innovation, and ethical farming to deliver both profitability
							and purpose. By empowering farmers, creating jobs, and promoting environmentally responsible
							practices, we are not just growing pineapples — we’re growing opportunities, wealth, and a
							more sustainable future for all.
						</p>
					</div> */}
					<motion.div
						className="w-full lg:w-1/2"
						variants={fadeIn("right", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">Who We Are</h2>

						<p className={`mb-4 ${theme === "light" ? "text-muted-dark" : "text-muted-light"}`}>
							At <strong className="text-primary">King Deb Global</strong>, we bridge the gap between
							agriculture and investment. Through innovation, sustainability, and transparency, we’re
							building Africa’s leading pineapple brand — where every fruit harvested and every naira
							invested contributes to lasting value.
						</p>

						<p className={`${theme === "light" ? "text-muted-dark" : "text-muted-light"}`}>
							Our model empowers local farmers, optimizes agricultural efficiency, and provides investors
							with measurable, sustainable returns. By combining ethical farming practices with smart
							investment opportunities, we’re creating a thriving ecosystem that delivers growth — for
							people, profit, and the planet.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="container my-10 mb-24 px-6 overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Vision */}
					<motion.div
						className="p-8 rounded-2xl shadow-lg bg-base-100"
						variants={fadeIn("right", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<p className="text-sm text-primary uppercase tracking-widest mb-2 font-medium">Our Vision</p>
						<h3 className="text-2xl md:text-3xl font-bold text-accent mb-4">
							To lead Africa’s pineapple production and investment revolution
						</h3>
						<p className="text-base-content text-base leading-relaxed">
							We envision a future where sustainable pineapple farming becomes a cornerstone of economic
							growth across Africa — empowering communities, investors, and consumers through innovation,
							transparency, and eco-friendly agricultural practices.
						</p>
					</motion.div>

					{/* Mission */}
					<motion.div
						className="p-8 rounded-2xl shadow-lg bg-base-100"
						variants={fadeIn("left", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<p className="text-sm text-primary uppercase tracking-widest mb-2 font-medium">Our Mission</p>
						<h3 className="text-2xl md:text-3xl font-bold text-accent mb-4">
							Growing wealth through sustainable pineapple farming
						</h3>
						<p className="text-base-content text-base leading-relaxed">
							Our mission is to connect everyday investors with the power of agriculture — cultivating
							premium pineapples while generating consistent, ethical returns. We merge technology,
							transparency, and teamwork to create lasting impact for our farmers, partners, and the
							planet.
						</p>
					</motion.div>
				</div>
			</section>
		</>
	)
}

export default About
