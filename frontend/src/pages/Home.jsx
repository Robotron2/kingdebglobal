import Footer from "../components/Footer"
import Hero from "../components/Hero"
import { HowItWorks } from "../components/HowItWorks"
import { InvestmentWidget } from "../components/InvestmentWidget"
import Navbar from "../components/Navbar"
import { ProductCarousel } from "../components/ProductCarousel"
import { Testimonials } from "../components/Testimonials"

const Home = () => {
	return (
		<main className="min-h-screen">
			<Navbar />
			<Hero />

			<section id="products" className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
							Our Premium Products
						</h2>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							From fresh fruit to plants and treats, discover our full range of tropical offerings.
						</p>
					</div>
					<ProductCarousel />
				</div>
			</section>
			<HowItWorks />
			<InvestmentWidget />
			<Testimonials />
			<Footer />
		</main>
	)
}

export default Home
