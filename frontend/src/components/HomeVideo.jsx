import { fadeIn } from "../../utils/data/variants"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import YouTubeEmbed from "./YoutubeEmbed"
import YoutubeEmbed from "./YoutubeEmbed"

const HomeVideo = () => {
	return (
		<>
			<section id="kingdeb-farm" className="container py-20 bg-muted/30">
				<div className="mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						variants={fadeIn("up", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}
						className="text-center mb-16">
						{/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2> */}
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">King Deb Farm </h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							From sustainable farming to your table, discover our simple three-step process.
						</p>
					</motion.div>

					<YouTubeEmbed
						src="https://www.youtube.com/embed/h0BxCpJM0Qs?si=Bhuz9kMgHRq4P9gA"
						className="h-full lg:h-[350px] w-full"
						minSkeletonMs={300}
						fallbackTimeoutMs={8000}
						onReady={() => console.log("iframe visually ready")}
						onError={(err) => console.error("iframe failed to load", err)}
					/>
				</div>
			</section>
		</>
	)
}

export default HomeVideo
