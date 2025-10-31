/* eslint-disable no-unused-vars */
import { fadeIn } from "../../utils/data/variants"
import faqArray from "../data/faqContent"
import { useTheme } from "../hooks/useTheme"
import { motion } from "framer-motion"

const Faq = () => {
	const { theme } = useTheme()
	return (
		<>
			<div className={`container my-16 mb-32 ${theme === "light" ? "text-green-950" : "text-gray-300"}`}>
				<motion.div
					variants={fadeIn("down", 0.1)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: false, amount: 0.4 }}
					className="section-title flex items-start justify-center text-primary gap-0 mb-4">
					{/* <FaRegStarHalf size={20} /> */}
					<h1 className="title text-3xl md:text-5xl font-bold ">FAQs</h1>
				</motion.div>
				<div className="wrapper flex items-center justify-center">
					<motion.div
						variants={fadeIn("up", 0.1)}
						initial="hidden"
						whileInView={"show"}
						viewport={{ once: false, amount: 0.4 }}
						className="w-3/4 md:w-1/2">
						{faqArray.map((item) => {
							return (
								//Open the first faq with defaultChecked
								<div className="collapse collapse-arrow " key={item.id}>
									<input type="radio" name="my-accordion-2" defaultChecked={item.id == 1} />
									<div className="collapse-title text-xl font-medium text-primary">{item.title}</div>
									<div className="collapse-content">
										<p className="text-pretty">{item.body}</p>
									</div>
								</div>
							)
						})}
					</motion.div>
				</div>
			</div>
		</>
	)
}

export default Faq
