import Hero from "../components/Hero"
import { HowItWorks } from "../components/HowItWorks"
import { InvestmentWidget } from "../components/InvestmentWidget"
import { ProductCarousel } from "../components/ProductCarousel"
import { Testimonials } from "../components/Testimonials"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { fadeIn } from "../../utils/data/variants"
import Faq from "../components/FAQ"

const Home = () => {
	return (
		<main className="min-h-screen">
			{/* <Navbar /> */}
			<Hero />

			<section id="products" className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						className="text-center mb-12"
						variants={fadeIn("down", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}>
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
							Our Premium Products
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							From plants, to fresh fruits and treats, discover our full range of tropical offerings.
						</p>
					</motion.div>
					<ProductCarousel />
				</div>
			</section>
			<HowItWorks />
			<InvestmentWidget />
			<Testimonials />
			<Faq />
			{/* <Footer /> */}
		</main>
	)
}

export default Home
