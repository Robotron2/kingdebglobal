import { Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"

const Footer = () => {
	const { theme } = useTheme()
	return (
		<footer className={`${theme === "light" ? " bg-primary text-base-200 " : "bg-base-200"}`}>
			<div className="container">
				<div className="footer py-10 md:py-16 grid-cols-2 md:grid-cols-4 lg:grid-cols-auto">
					<nav>
						<h6 className="footer-title text-lg">Services</h6>
						<a className="link link-hover">Purchase</a>
						<a className="link link-hover">Invest</a>
					</nav>
					<nav>
						<h6 className="footer-title text-lg">Company</h6>
						<a className="link link-hover">About us</a>
						<a className="link link-hover">Contact</a>
					</nav>
					<nav>
						<h6 className="footer-title text-lg">Legal</h6>
						<a className="link link-hover">Terms of use</a>
						<a className="link link-hover">Privacy policy</a>
						<a className="link link-hover">Cookie policy</a>
					</nav>
					<form className="w-full col-span-full md:col-auto">
						<h6 className="footer-title text-lg">Newsletter</h6>
						<fieldset className="w-full">
							<label className="mr-4 mb-8">Enter your email address</label>
							<div className="join">
								{/* <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item"
                            /> */}
								<input
									type="text"
									placeholder="username@site.com"
									className="input input-bordered join-item p-2 outline-none active:outline-none text-primary mt-1"
								/>
								<button className="btn bg-secondary text-white p-1 join-item outline-none border-none">
									Subscribe
								</button>
							</div>
						</fieldset>
					</form>
				</div>
				<div className="flex flex-col sm:flex-row items-center border-t border-base-300 py-4 gap-2">
					<div className="flex-grow text-center sm:text-start">
						<p>&copy; 2025 Theophilus, Inc. All rights reserved.</p>
					</div>
					<div className="grid grid-flow-col gap-4 py-4">
						<Link
							target="blank"
							to="https://x.com/The0_ph1lus"
							className={`link ${theme === "light" ? "text-base-200" : "text-secondary"}`}>
							<i className="bi bi-twitter text-xl"></i>
						</Link>
						<Link
							target="blank"
							to="https://www.instagram.com/the0_ph1lus"
							className={`link ${theme === "light" ? "text-base-200" : "text-secondary"}`}>
							<i className="bi bi-instagram text-xl"></i>
						</Link>
						<Link
							target="blank"
							to="https://github.com/robotron2"
							className={`link ${theme === "light" ? "text-base-200" : "text-secondary"}`}>
							<i className="bi bi-github text-xl"></i>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
