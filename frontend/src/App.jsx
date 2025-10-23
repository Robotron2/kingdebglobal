// import "bootstrap-icons/font/bootstrap-icons.css"
// import { Suspense, lazy, useEffect } from "react"
// import { Navigate, Route, Routes, useLocation } from "react-router-dom"
// import Loading from "./components/ui/Loading"
// import Layout from "./components/ui/Layout"

// const ScrollToTop = () => {
// 	const { pathname } = useLocation()

// 	useEffect(() => {
// 		window.scrollTo(0, 0)
// 	}, [pathname])

// 	return null
// }
// const Home = lazy(() => import("./pages/Home"))
// const About = lazy(() => import("./pages/About"))
// const Contact = lazy(() => import("./pages/Contact"))
// const App = () => {
// 	return (
// 		<>
// 			<Suspense fallback={<Loading />}>
// 				<Routes>
// 					{/* Layout used as root - shared header/footer */}
// 					<Route element={<Layout />}>
// 						<Route index element={<Home />} />
// 						<Route path="about" element={<About />} />
// 						<Route path="contact-us" element={<Contact />} />

// 						{/* protected subtree */}
// 						{/* <Route
// 						path="dashboard"
// 						element={
// 							<ProtectedRoute>
// 								<Dashboard />
// 							</ProtectedRoute>
// 						}
// 					/> */}
// 					</Route>

// 					{/* Auth pages that don't use the layout*/}
// 					{/* <Route path="/signin" element={<SignIn />} /> */}
// 					{/* <Route path="/register" element={<Register />} /> */}

// 					{/* catch-all */}
// 					<Route path="*" element={<Navigate to="/" replace />} />
// 				</Routes>
// 			</Suspense>
// 			<ScrollToTop />
// 		</>
// 	)
// }

// export default App

import "bootstrap-icons/font/bootstrap-icons.css"
import { Suspense, lazy, useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion"
import Loading from "./components/ui/Loading"
import Layout from "./components/ui/Layout"

const ScrollToTop = () => {
	const { pathname } = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])
	return null
}

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))

const App = () => {
	const location = useLocation()

	// Preload other routes after mount for faster navigation
	useEffect(() => {
		import("./pages/About")
		import("./pages/Contact")
	}, [])

	return (
		<>
			<ScrollToTop />
			<Suspense fallback={<Loading />}>
				<AnimatePresence mode="wait">
					<Routes location={location} key={location.pathname}>
						{/* Layout used as root - shared header/footer */}
						<Route element={<Layout />}>
							<Route
								index
								element={
									<PageTransition>
										<Home />
									</PageTransition>
								}
							/>
							<Route
								path="about"
								element={
									<PageTransition>
										<About />
									</PageTransition>
								}
							/>
							<Route
								path="contact-us"
								element={
									<PageTransition>
										<Contact />
									</PageTransition>
								}
							/>

							{/* protected subtree */}
							{/* <Route
								path="dashboard"
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/> */}
						</Route>

						{/* Auth pages that don't use the layout*/}
						{/* <Route path="/signin" element={<SignIn />} /> */}
						{/* <Route path="/register" element={<Register />} /> */}

						{/* catch-all */}
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</AnimatePresence>
			</Suspense>
		</>
	)
}

export default App

const PageTransition = ({ children }) => (
	<motion.div
		initial={{ opacity: 0, y: 15 }}
		animate={{ opacity: 1, y: 0 }}
		exit={{ opacity: 0, y: -15 }}
		transition={{ duration: 0.35, ease: "easeInOut" }}
		className="min-h-screen">
		{children}
	</motion.div>
)
