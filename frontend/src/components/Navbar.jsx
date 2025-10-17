import { useState, useRef, useEffect } from "react"
import { useTheme } from "../hooks/useTheme"

const THEMES = ["light", "dark", "system"]

const Navbar = () => {
	const { theme, setTheme } = useTheme()
	const [open, setOpen] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const handleThemeChange = (e) => {
		const val = e.target.getAttribute("data-set-theme")
		setTheme(val)
		setOpen(false)
	}

	return (
		<header className="sticky top-0 z-50 py-2 shadow-sm glass">
			<div className="container">
				<div className="navbar px-0 ">
					{/* Left Section */}
					<div className="navbar-start">
						<div className="dropdown">
							<label
								tabIndex={0}
								role="button"
								className="btn btn-circle text-white bg-primary hover:bg-secondary transition-all duration-300 border-none outline-none lg:hidden mr-1 p-0">
								<i className="bi bi-list text-2xl font-bold"></i>
							</label>

							<ul
								tabIndex="-1"
								className="menu menu-md dropdown-content bg-base-200 rounded-box z-1 mt-1 w-52 p-2 shadow">
								<li>
									<a href="/about">About</a>
								</li>
								<li>
									<a href="/">Invest</a>
								</li>
								<li>
									<a href="/contact-us">Contact</a>
								</li>
							</ul>
						</div>
						<a href="/" className="btn btn-ghost font-bold text-2xl outline-none">
							The0
						</a>
					</div>

					{/* Center Section */}
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal px-1 font-bold text-xl">
							<li>
								<a href="/about">About</a>
							</li>
							<li>
								<a href="/invest">Invest</a>
							</li>
							<li>
								<a href="/contact-us">Contact</a>
							</li>
						</ul>
					</div>

					{/* Right Section - Theme Toggle */}
					<div className="navbar-end" ref={dropdownRef}>
						<div className="relative">
							<button
								onClick={() => setOpen(!open)}
								className="btn btn-ghost btn-circle transition-transform hover:scale-110">
								{theme === "light" && <i className="bi bi-sun text-2xl"></i>}
								{theme === "dark" && <i className="bi bi-moon text-2xl"></i>}
								{theme === "system" && <i className="bi bi-laptop text-2xl"></i>}
							</button>

							{/* Dropdown */}
							<div
								className={`absolute right-0 top-12 bg-base-200 text-base-content rounded-box w-40 p-2 shadow z-50
								transition-all duration-300 origin-top-right transform ${
									open
										? "opacity-100 scale-100 pointer-events-auto"
										: "opacity-0 scale-95 pointer-events-none"
								}`}>
								<ul className="menu menu-sm">
									{THEMES.map((themeOption, i) => (
										<li key={i}>
											<button
												data-set-theme={themeOption}
												onClick={handleThemeChange}
												className={`flex items-center gap-2 ${
													themeOption === theme ? "active font-medium" : ""
												}`}>
												{themeOption === "light" && <i className="bi bi-sun-fill text-lg"></i>}
												{themeOption === "dark" && <i className="bi bi-moon-fill text-lg"></i>}
												{themeOption === "system" && (
													<i className="bi bi-laptop-fill text-lg"></i>
												)}
												{themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
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
