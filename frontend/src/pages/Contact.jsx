/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Mail, Phone, Globe, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn } from "../../utils/data/variants"

const Contact = () => {
	const [userType, setUserType] = useState("individual")

	const activeClass = "bg-primary text-white shadow-md"
	const inactiveClass = "bg-primary/20 text-base-content/20"

	return (
		<section className="container mx-auto py-12 px-6 lg:px-8 my-20">
			<div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-12">
				{/* Left Side: Contact Info */}
				<motion.div
					className="w-full md:w-1/2 mb-10 lg:mb-0"
					variants={fadeIn("right", 0.1)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: false, amount: 0.4 }}>
					<h2 className="text-2xl font-semibold text-secondary mb-4">Get In Touch</h2>
					<p className="text-primary-content-600 mb-6">
						At <strong className="font-semibold">The0 Ltd</strong>, we’re always here to connect with our
						growers, investors, and pineapple lovers. Reach out via phone, email, or our contact form —
						we’ll get back to you as soon as possible.
					</p>

					<div className="space-y-3">
						<p>
							<Phone className="inline-block h-4 w-4 mr-2 text-primary/95" />
							<strong className="font-medium">Phone:</strong> 09034392134
						</p>
						<p>
							<Mail className="inline-block h-4 w-4 mr-2 text-primary/95" />
							<strong className="font-medium">Email:</strong>{" "}
							<a href="mailto:sales@the0.com" className="text-primary hover:underline">
								sales@the0.com
							</a>
						</p>
						<p>
							<Globe className="inline-block h-4 w-4 mr-2 text-primary/95" />
							<strong className="font-medium">Website:</strong>{" "}
							<a
								href="http://github.com/robotron2"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline">
								www.the0.com
							</a>
						</p>
						<p>
							<Briefcase className="inline-block h-4 w-4 mr-2 text-primary/95" />
							<strong className="font-medium">Company:</strong> THE0 LIMITED
						</p>
					</div>
				</motion.div>

				{/* Right Side: Contact Form */}
				<motion.div
					className="w-full md:w-1/2 p-6 bg-base-100 rounded-xl shadow-2xl"
					variants={fadeIn("left", 0.1)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: false, amount: 0.4 }}>
					<h3 className="text-2xl font-bold mb-6 text-primary">Send Us a Message</h3>

					{/* 2. Toggle Buttons */}
					<div className="flex space-x-2 mb-6 p-1 bg-base-200 rounded-lg max-w-sm">
						<button
							onClick={() => setUserType("individual")}
							className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-1/2 ${
								userType === "individual" ? activeClass : inactiveClass
							}`}>
							Individual
						</button>

						<button
							onClick={() => setUserType("company")}
							className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-1/2 ${
								userType === "company" ? activeClass : inactiveClass
							}`}>
							Company
						</button>
					</div>

					<form className="space-y-4">
						{/* ----------------- Individual Fields ----------------- */}
						{userType === "individual" && (
							<div className="space-y-4">
								<div>
									<input
										type="text"
										placeholder="Enter your full name"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
										required
									/>
								</div>
								<div>
									<input
										type="tel"
										placeholder="Enter phone number"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
									/>
								</div>
							</div>
						)}

						{/* ----------------- Company Fields ----------------- */}
						{userType === "company" && (
							<div className="space-y-4">
								<div>
									<input
										type="text"
										placeholder="Enter your company's name"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
										required
									/>
								</div>
								<div>
									<input
										type="text"
										placeholder="Contact person name"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
										required
									/>
								</div>
							</div>
						)}

						{/* ----------------- Common Fields ----------------- */}
						<div>
							<input
								type="email"
								placeholder="Enter email"
								className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
								required
							/>
						</div>

						<div>
							<textarea
								placeholder="Type your message"
								rows="4"
								className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150 resize-none"
								required></textarea>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300">
							Submit Message
						</button>
					</form>
				</motion.div>
			</div>
		</section>
	)
}

export default Contact
