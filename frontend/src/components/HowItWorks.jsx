// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { ShoppingBag, Sprout, TrendingUp } from "lucide-react"

const steps = [
	{
		icon: ShoppingBag,
		title: "Shop Fresh",
		description:
			"Browse our selection of premium, hand-picked pineapples and tropical produce delivered fresh to your door.",
	},
	{
		icon: Sprout,
		title: "Grow Sustainably",
		description:
			"Our eco-friendly farming practices ensure the highest quality fruit while protecting the environment.",
	},
	{
		icon: TrendingUp,
		title: "Invest & Earn",
		description: "Support sustainable agriculture and earn returns by investing in our farm expansion programs.",
	},
]

export function HowItWorks() {
	return (
		<section id="how-it-works" className="py-20 bg-muted/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16">
					{/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2> */}
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">How It Works </h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						From sustainable farming to your table, discover our simple three-step process.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<motion.div
							key={step.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="relative">
							<div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 text-center h-full shadow-xl hover:shadow-2xl transition-shadow">
								<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
									<step.icon className="h-8 w-8 text-accent" />
								</div>
								<h3 className="text-xl font-bold text-card-foreground mb-3">{step.title}</h3>
								<p className="text-muted-foreground">{step.description}</p>
							</div>

							{/* Connector Line (hidden on mobile) */}
							{index < steps.length - 1 && (
								<div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
							)}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
