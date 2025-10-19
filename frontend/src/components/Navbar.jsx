import { useState, useRef, useEffect } from "react"
import { useTheme } from "../hooks/useTheme"
import { Link } from "react-router-dom"

const THEMES = ["light", "dark", "system"]

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const { theme, setTheme } = useTheme()
	const [open, setOpen] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	useEffect(() => {
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const handleThemeChange = (newTheme) => {
		if (!newTheme) return
		setTheme(newTheme)
		setOpen(false)
	}

	return (
		<header
			className={`sticky top-0 z-50 py-0 shadow-sm transition-all ease-in-out duration-300 ${
				isScrolled ? "glass backdrop-blur-xl bg-opacity-60 text-primary" : "bg-primary text-primary-content"
			} ${(theme === "dark" || theme === "system") && isScrolled ? "text-white" : ""}`}>
			<div className="container py-0">
				<div className="navbar py-0">
					{/* Left Section */}
					<div className="navbar-start">
						<div className="dropdown">
							<label
								tabIndex={0}
								role="button"
								className="btn btn-circle text-gray-100 bg-primary hover:bg-secondary transition-all duration-300 border-none outline-none lg:hidden mr-1 p-0">
								<i className="bi bi-list text-2xl font-bold"></i>
							</label>

							<ul
								tabIndex="-1"
								className={`menu menu-md dropdown-content bg-base-100 rounded-box z-1 font-semibold mt-1 w-52 p-2 shadow ${
									theme === "dark" || theme === "system" ? "text-white" : "text-primary"
								}`}>
								<li>
									<Link to="/about">About</Link>
								</li>
								{/* <li>
									<Link to="/invest">Invest</Link>
								</li> */}
								<li>
									<Link to="/contact-us">Contact</Link>
								</li>
							</ul>
						</div>
						<Link to="/" className=" font-bold text-2xl outline-none">
							The0
						</Link>
					</div>

					{/* Center Section */}
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal px-1 font-bold text-xl">
							<li>
								<Link to="/about">About</Link>
							</li>
							{/* <li>
								<Link to="/invest">Invest</Link>
							</li> */}
							<li>
								<Link to="/contact-us">Contact</Link>
							</li>
						</ul>
					</div>

					{/* Right Section - Theme Toggle */}
					<div className="navbar-end" ref={dropdownRef}>
						<div className="relative">
							<button
								onClick={() => setOpen(!open)}
								className="btn  btn-circle transition-transform hover:scale-110">
								{theme === "light" && <i className="bi bi-sun text-2xl"></i>}
								{theme === "dark" && <i className="bi bi-moon text-2xl"></i>}
								{theme === "system" && <i className="bi bi-laptop text-2xl"></i>}
							</button>

							<div
								className={`absolute right-0 top-12 bg-base-200 rounded-box w-40 p-2 shadow z-50
								transition-all duration-300 origin-top-right transform ${
									open
										? "opacity-100 scale-100 pointer-events-auto"
										: "opacity-0 scale-95 pointer-events-none"
								}`}>
								<ul className="menu menu-sm">
									{THEMES.map((option) => (
										<li key={option}>
											<button
												onClick={() => handleThemeChange(option)}
												className={`flex items-center gap-2 ${
													theme === "dark" || theme === "system"
														? "text-white"
														: "text-primary"
												} ${option === theme ? "active font-bold" : ""}`}>
												{option === "light" && <i className="bi bi-sun text-lg"></i>}
												{option === "dark" && <i className="bi bi-moon text-lg"></i>}
												{option === "system" && <i className="bi bi-laptop text-lg"></i>}
												<span className="font-medium">
													{option.charAt(0).toUpperCase() + option.slice(1)}
												</span>
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Navbar
