/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useForm } from "react-hook-form"
import useWeb3Forms from "@web3forms/react"
import { Mail, Phone, Globe, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn } from "../../utils/data/variants"
import Banner from "../components/Banner"

const Contact = () => {
	const [userType, setUserType] = useState("individual")
	const [isSending, setIsSending] = useState(false)
	const [result, setResult] = useState(null)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm()

	const accessKey = import.meta.env.VITE_WEBFORM_API_KEY

	const { submit: onSubmitWeb3 } = useWeb3Forms({
		access_key: accessKey,
		settings: {
			from_name: "KING DEB GLOBAL",
			subject: "New Contact Message from Website",
		},
		onSuccess: (msg, data) => {
			setResult("Form submitted successfully!")
			reset()
			setIsSending(false)
			setTimeout(() => setResult(""), 3000)
		},
		onError: (msg, data) => {
			setResult("Something went wrong. Please try again.")
			setIsSending(false)
			setTimeout(() => setResult(""), 3000)
		},
	})

	const validateBeforeSubmit = (data) => {
		if (userType === "individual" && !data.name) {
			setResult("Please enter your full name.")
			return false
		}
		if (userType === "company" && (!data.company || !data.contact_person)) {
			setResult("Please fill in all company fields.")
			return false
		}
		if (!data.email) {
			setResult("Please enter your email address.")
			return false
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(data.email)) {
			setResult("Please enter a valid email address.")
			return false
		}
		if (!data.message) {
			setResult("Please type your message.")
			return false
		}
		return true
	}

	const onSubmit = (data) => {
		setResult("")
		if (!validateBeforeSubmit(data)) return

		const payload = { ...data, userType }

		setIsSending(true)
		onSubmitWeb3(payload)
	}

	const activeClass = "bg-primary text-white shadow-md"
	const inactiveClass = "bg-primary/20 text-base-content/20"

	return (
		<>
			<Banner
				title="Get in Touch"
				subtitle="We’d love to hear from you"
				paragraph="Have a question, partnership idea, or investment inquiry? Reach out — our team is always ready to connect and help you grow with us."
			/>

			<section className="container mx-auto py-12 px-6 lg:px-8 my-20 overflow-hidden">
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
							At <strong className="font-semibold">King Deb Global</strong>, we’re always here to connect
							with our growers, investors, and pineapple lovers. Reach out via phone, email, or our
							contact form — we’ll get back to you as soon as possible.
						</p>

						<div className="space-y-3">
							<p>
								<Phone className="inline-block h-4 w-4 mr-2 text-primary/95" />
								<strong className="font-medium">Phone:</strong> +2347031968530, +2347088973250
							</p>
							<p>
								<Mail className="inline-block h-4 w-4 mr-2 text-primary/95" />
								<strong className="font-medium">Email:</strong>{" "}
								<a href="mailto:kingdebglobal@gmail.com" className="text-primary hover:underline">
									kingdebglobal@gmail.com
								</a>
							</p>
							<p>
								<Globe className="inline-block h-4 w-4 mr-2 text-primary/95" />
								<strong className="font-medium">Website:</strong>{" "}
								<a
									href="http://kingdebglobal.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline">
									kingdebglobal.com
								</a>
							</p>
							<p>
								<Briefcase className="inline-block h-4 w-4 mr-2 text-primary/95" />
								<strong className="font-medium">Company:</strong> KING DEB GLOBAL
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

						{/* User Type Toggle */}
						<div className="flex space-x-2 mb-6 p-1 bg-base-200 rounded-lg max-w-sm">
							<button
								type="button"
								onClick={() => setUserType("individual")}
								className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-1/2 ${
									userType === "individual" ? activeClass : inactiveClass
								}`}>
								Individual
							</button>

							<button
								type="button"
								onClick={() => setUserType("company")}
								className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors w-1/2 ${
									userType === "company" ? activeClass : inactiveClass
								}`}>
								Company
							</button>
						</div>

						{/*  FORM */}
						<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
							{/* Conditional Fields */}
							{userType === "individual" && (
								<>
									<input
										type="text"
										placeholder="Enter your full name"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
										{...register("name")}
									/>
									<input
										type="tel"
										placeholder="Enter phone number"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
										{...register("phone")}
									/>
								</>
							)}

							{userType === "company" && (
								<>
									<input
										type="text"
										placeholder="Enter your company's name"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
										{...register("company")}
									/>
									<input
										type="text"
										placeholder="Contact person name"
										className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
										{...register("contact_person")}
									/>
								</>
							)}

							{/* Common Fields */}
							<input
								type="email"
								placeholder="Enter email"
								className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150"
								{...register("email")}
							/>

							<textarea
								rows="4"
								placeholder="Type your message"
								className="w-full bg-transparent px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none transition duration-150 resize-none"
								{...register("message")}
							/>

							{/* Submit */}
							<button
								type="submit"
								className={`w-full py-3 font-semibold rounded-lg transition duration-300 ${
									isSending
										? "bg-secondary/70 text-white cursor-not-allowed"
										: "bg-secondary text-white hover:bg-gray-700"
								}`}
								disabled={isSending}>
								{isSending ? "Sending..." : "Submit Message"}
							</button>
						</form>

						{/* Result */}
						{result && (
							<p className="mt-4 text-center text-primary transition-opacity duration-300">{result}</p>
						)}
					</motion.div>
				</div>
			</section>
		</>
	)
}

export default Contact
