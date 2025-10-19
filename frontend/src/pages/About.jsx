import Banner from "../components/Banner"
import pineBg from "../../public/pineapple-field-aerial-view-tropical-farm.jpg"
import { useTheme } from "../hooks/useTheme"
const About = () => {
	const { theme } = useTheme()
	return (
		<>
			<Banner
				title={"About Us"}
				subtitle={""}
				paragraph={
					"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ullam esse in aliquam minima assumenda. Consectetur iste hic aut non dicta, obcaecati, porro voluptatibus animi esse fuga veniam omnis doloremque?"
				}
			/>

			<section className="container h-1/2 mx-auto my-8">
				{/* Who we are */}
				<div className="flex flex-col lg:flex-row lg:space-x-8 px-4 py-8">
					{/* Left side with Image content */}
					<div className="w-full lg:w-1/2 flex flex-col space-y-4 mb-8 lg:mb-0">
						<div className="rounded-2xl shadow-xl overflow-hidden h-80 lg:h-auto lg:max-h-[350px] ">
							{/* Image One */}
							<img src={pineBg} alt="Logistics Warehouse" className="w-full h-full object-cover" />
						</div>

						<div className="flex space-x-4">
							{/* Image Two */}
							<div className="w-1/2 rounded-2xl shadow-xl overflow-hidden aspect-video">
								<img src={pineBg} alt="Trucks at Port" className="w-full h-full object-cover" />
							</div>

							{/* Image Three */}
							<div className="w-1/2 rounded-2xl shadow-xl overflow-hidden aspect-video">
								<img src={pineBg} alt="Fleet of Trucks" className="w-full h-full object-cover" />
							</div>
						</div>
					</div>

					{/* Right side with texts*/}
					<div className="w-full lg:w-1/2">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">Who We Are</h2>
						<p className={`mb-4 ${theme === "light" ? "text-muted-dark" : "text-muted-light"}`}>
							At <strong className="text-primary">The0 Ltd</strong>, Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Saepe ducimus, perferendis mollitia velit cum rem nulla quas
							hic quidem praesentium vitae temporibus earum eveniet voluptate. Aliquam atque perferendis
							nobis quod.
						</p>
						<p className={`${theme === "light" ? "text-muted-dark" : "text-muted-light"}`}>
							Our company integrates best practices in operations, compliance, and customer service,
							making us adaptable to the unique needs of our clients. Whether you're a multinational
							corporation or a local enterprise, we offer tailor-made solutions to streamline your supply
							chain and optimize your business performance.
						</p>
					</div>
				</div>
			</section>
		</>
	)
}

export default About
