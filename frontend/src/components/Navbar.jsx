import { useState, useRef, useEffect } from "react"
import { useTheme } from "../hooks/useTheme"
import { Link } from "react-router-dom"
import Logo from "/logo.webp"

const THEMES = ["light", "dark", "system"]

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const { theme, setTheme } = useTheme()
	const [open, setOpen] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)
	const dropdownRef = useRef(null)
	const navbarRef = useRef(null)

	// Handle scroll shadow
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10)
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Handle click outside for theme dropdown ONLY
	useEffect(() => {
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	// Handle outside click for mobile menu
	useEffect(() => {
		function handleOutsideMobile(e) {
			if (navbarRef.current && !navbarRef.current.contains(e.target)) {
				setMobileOpen(false)
			}
		}
		document.addEventListener("mousedown", handleOutsideMobile)
		return () => document.removeEventListener("mousedown", handleOutsideMobile)
	}, [])

	const handleThemeChange = (newTheme) => {
		if (!newTheme) return
		setTheme(newTheme)
		setOpen(false)
	}

	const handleNavLinkClick = () => {
		setMobileOpen(false)
	}

	return (
		<header
			ref={navbarRef}
			className={`sticky top-0 z-50 py-0 shadow-sm transition-all ease-in-out duration-300 ${
				isScrolled ? "glass backdrop-blur-xl bg-opacity-60 text-primary" : "bg-primary text-primary-content"
			} ${(theme === "dark" || theme === "system") && isScrolled ? "text-white" : ""}`}>
			<div className="container py-0">
				<div className="navbar py-0">
					{/* Left Section */}

					<div className="navbar-start flex items-center  gap-2 w-full">
						{/* Mobile Menu Button */}
						<div className="relative lg:hidden mb-3">
							<button
								onClick={() => setMobileOpen(!mobileOpen)}
								className="btn btn-circle text-gray-100 bg-primary hover:bg-secondary transition-all duration-300 border-none outline-none mr-1 p-0">
								<i className="bi bi-list text-lg font-bold"></i>
							</button>

							{/* Mobile Dropdown */}
							<div
								className={`absolute left-0 mt-2 w-52 bg-base-100 rounded-box shadow-lg font-semibold transition-all duration-200 z-50 ${
									mobileOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
								}`}>
								<ul
									className={`menu menu-md dropdown-content bg-base-100 rounded-box font-semibold mt-1 w-52 p-2 shadow ${
										theme === "dark" || theme === "system" ? "text-white" : "text-primary"
									}`}>
									<li>
										<Link to="/about" onClick={handleNavLinkClick}>
											About
										</Link>
									</li>
									<li>
										<Link to="/contact-us" onClick={handleNavLinkClick}>
											Contact
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* Logo */}
						<Link to="/" className="flex items-center gap-1 font-bold text-xl outline-none w-full">
							<img
								src={Logo}
								alt="Kngdgb logo"
								className="w-24 h-24 object-contain bg-red-00 -ml-8 sm:-ml-0 -mr-7"
							/>
							<span className="text-nowrap text-sm md:text-xl w-full">King Deb Global</span>
						</Link>
					</div>

					{/* Center Section */}
					<div className="navbar-center hidden lg:flex">
						<ul className="menu menu-horizontal px-1 font-bold text-xl">
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/contact-us">Contact</Link>
							</li>
						</ul>
					</div>

					{/* Right Section - Theme Toggle */}
					<div className="navbar-end" ref={dropdownRef}>
						<div className="relative mb-3">
							<button
								onClick={() => setOpen(!open)}
								className="btn btn-circle transition-transform hover:scale-110">
								{theme === "light" && <i className="bi bi-sun text-xl"></i>}
								{theme === "dark" && <i className="bi bi-moon text-xl"></i>}
								{theme === "system" && <i className="bi bi-laptop text-xl"></i>}
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
