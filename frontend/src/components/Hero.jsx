/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom"
import pineBg from "../../public/pineapple-field-aerial-view-tropical-farm.jpg"
import { motion } from "framer-motion"
import { fadeIn } from "../../utils/data/variants"

const Hero = () => {
	const navigate = useNavigate()

	return (
		<section>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: `url(${pineBg})`,
				}}>
				<div className="hero-overlay opacity-80 bg-black"></div>
				<div className="hero-content text-neutral-content text-center">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Hello there</h1>
						<p className="mb-5">
							Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
							quasi. In deleniti eaque aut repudiandae et a id nisi.
						</p>
						<button className="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
