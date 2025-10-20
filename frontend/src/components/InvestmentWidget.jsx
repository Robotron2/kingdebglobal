/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import { Slider } from "./ui/Slider"
import { useTheme } from "../hooks/useTheme"
import { fadeIn } from "../../utils/data/variants"

export function InvestmentWidget() {
	const [months, setMonths] = useState([12])
	const minInvestment = 1000
	const returnRate = 0.08 // 8% annual return
	const { theme } = useTheme()

	const calculateReturns = (term) => {
		const years = term / 12
		const returns = minInvestment * returnRate * years
		return returns.toFixed(2)
	}

	return (
		<section id="invest" className="py-20 bg-acce">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					variants={fadeIn("down", 0.1)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: false, amount: 0.4 }}
					className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
						Invest in Sustainable Agriculture
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Support our farm expansion and earn competitive returns while promoting eco-friendly farming.
					</p>
				</motion.div>

				<motion.div
					variants={fadeIn("up", 0.1)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: false, amount: 0.4 }}
					className="max-w-2xl mx-auto">
					<Card className="backdrop-blur-sm border-gray-300/0 rounded-lg shadow-2xl">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-2xl">
								<TrendingUp className="h-6 w-6 text-primary" />
								Investment Calculator
							</CardTitle>
						</CardHeader>

						<CardContent className="space-y-6">
							<div>
								<div className="flex items-center justify-between mb-4">
									<label className="text-sm font-medium text-base-content">Investment Term</label>
									<span className="text-2xl font-bold text-primary">{months[0]} months</span>
								</div>

								<Slider
									value={months}
									onValueChange={setMonths}
									min={3}
									max={24}
									step={3}
									className="mb-2"
								/>

								<div className="flex justify-between text-xs text-muted-foreground">
									<span>3 months</span>
									<span>24 months</span>
								</div>
							</div>

							{/* Progress Bar */}
							<div
								className={`relative h-3 ${
									theme === "light" ? "bg-muted-light" : "bg-muted-dark"
								} rounded-full overflow-hidden`}>
								<motion.div
									className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
									initial={{ width: 0 }}
									animate={{ width: `${(months[0] / 24) * 100}%` }}
									transition={{ duration: 0.3 }}
								/>
							</div>

							{/* Returns Display */}
							<div className="bg-base-200 rounded-xl p-6 space-y-3">
								<div className="flex items-center justify-between">
									<span
										className={`text-sm font-normal ${
											theme === "light" ? "text-primary/95" : "text-gray-300"
										}`}>
										Minimum Investment
									</span>
									<span className="text-lg font-semibold text-card-foreground">
										₦{minInvestment.toLocaleString()}
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span
										className={`text-sm font-normal ${
											theme === "light" ? "text-primary/95" : "text-gray-300"
										}`}>
										Expected Returns
									</span>
									<span className="text-lg font-semibold text-leaf">
										₦{calculateReturns(months[0])}
									</span>
								</div>
								<div className="flex items-center justify-between pt-3 border-t border-base-300">
									<span className="text-sm font-medium text-card-foreground">Total Value</span>
									<span className="text-2xl font-bold text-primary">
										₦
										{(
											minInvestment + Number.parseFloat(calculateReturns(months[0]))
										).toLocaleString()}
									</span>
								</div>
							</div>

							<p
								className={`text-xs font-normal${
									theme === "light" ? "text-primary/50" : "text-gray-300"
								}  text-center`}>
								* Returns are estimates based on historical performance. Actual returns may vary.
							</p>
						</CardContent>

						<CardFooter>
							<button className="w-3/4 p-2 rounded-lg mx-auto bg-primary text-white hover:bg-primary/90">
								Start Investing Today
							</button>
						</CardFooter>
					</Card>
				</motion.div>
			</div>
		</section>
	)
}
