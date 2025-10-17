import LogoDark from "../assets/gogo-dark.png"
import { useTheme } from "../hooks/useTheme"

// const Footer = () => {
// 	// const { theme } = useTheme()
// 	return (
// 		<>
// 			<footer className="footer sm:footer-horizontal fixed bottom-0 z-50 bg-neutral text-neutral-content p-10">
// 				<nav>
// 					<h6 className="footer-title">Services</h6>
// 					<a className="link link-hover">Branding</a>
// 					<a className="link link-hover">Design</a>
// 					<a className="link link-hover">Marketing</a>
// 					<a className="link link-hover">Advertisement</a>
// 				</nav>
// 				<nav>
// 					<h6 className="footer-title">Company</h6>
// 					<a className="link link-hover">About us</a>
// 					<a className="link link-hover">Contact</a>
// 					<a className="link link-hover">Jobs</a>
// 					<a className="link link-hover">Press kit</a>
// 				</nav>
// 				<nav>
// 					<h6 className="footer-title">Legal</h6>
// 					<a className="link link-hover">Terms of use</a>
// 					<a className="link link-hover">Privacy policy</a>
// 					<a className="link link-hover">Cookie policy</a>
// 				</nav>
// 			</footer>
// 		</>
// 	)
// }

const Footer = () => {
	const { theme } = useTheme()
	return (
		<>
			<div
				className={` mt-28 w-full p-10 bg-base-200 text-base-content fixed bottom-0 ${
					theme == "light" ? "text-secondary" : "text-primary"
				} `}>
				<footer className="container flex flex-col sm:flex-row justify-between gap-6 bg-base-200 text-base-content p-10">
					{/* <footer className="container footer sm:footer-horizontal bg-base-200 text-base-content p-10"> */}
					<nav className="flex flex-col gap-y-1">
						<h6 className="footer-title text-xl font-semibold">Services</h6>
						<a className="link link-hover">Design</a>
						<a className="link link-hover">Marketing</a>
						<a className="link link-hover">Advertisement</a>
					</nav>
					<nav className="flex flex-col gap-y-1">
						<h6 className="footer-title text-xl font-semibold">Company</h6>
						<a className="link link-hover">About us</a>
						<a className="link link-hover">Contact</a>
					</nav>
					<nav>
						<h6 className="footer-title">Legal</h6>
						<a className="link link-hover">Terms of use</a>
						<a className="link link-hover">Privacy policy</a>
					</nav>
					<form className="">
						<h6 className="footer-title text-xl font-semibold mb-1">Newsletter</h6>
						<fieldset className="w-full">
							<div className="join items-center">
								<input
									type="text"
									placeholder="username@site.com"
									className="input input-bordered join-item p-2 outline-none active:outline-none"
								/>
								<button className="btn bg-secondary p-1 join-item">Subscribe</button>
							</div>
						</fieldset>
					</form>
				</footer>
			</div>
		</>
	)
}

export default Footer
