/* eslint-disable no-unused-vars */
"use client"
import { motion } from "framer-motion"
import { ShoppingCart, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "./ui/Card"

export function ProductCard({ product }) {
	return (
		<motion.div whileHover={{ y: -8, transition: { duration: 0.1 } }} className="h-full">
			<Card className="h-3/4 overflow-hidden bg-card/50 backdrop-blur-sm  shadow-xl pt-0 border-none rounded-md">
				<div className="relative aspect-square overflow-hidden">
					<img
						src={product.image || "/placeholder.svg"}
						alt={product.name}
						className="w-full h-full object-cover"
						loading="lazy"
					/>
					{product.badge && (
						<div className="absolute top-3 right-3 bg-accent text-deep text-xs font-bold px-3 py-1 rounded-full">
							{product.badge}
						</div>
					)}
				</div>

				<CardContent className="p-4">
					<h3 className="text-xl font-semibold text-card-foreground mb-2 text-primary">{product.name}</h3>
					<p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

					<div className="flex items-center gap-1 mb-3">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star
								key={i}
								className={`h-4 w-4 ${i < product.rating ? "fill-accent text-accent" : "text-muted"}`}
							/>
						))}
						<span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
					</div>

					<div className="flex items-baseline gap-2">
						<span className="text-2xl font-bold text-card-foreground">₦ {product.price}</span>
						<span className="text-sm text-muted-foreground">/ {product.unit}</span>
					</div>
				</CardContent>

				<CardFooter className="p-4 pt-0">
					{/* <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</Button> */}
					<button className="w-3/4 mx-auto bg-primary text-white hover:bg-primary/90 flex items-center justify-center p-2 rounded-lg">
						<ShoppingCart className="mr-2 h-4 w-4" />
						Add to Cart
					</button>
				</CardFooter>
			</Card>
		</motion.div>
	)
}
