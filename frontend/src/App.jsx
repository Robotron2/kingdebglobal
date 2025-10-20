import "bootstrap-icons/font/bootstrap-icons.css"
import { Suspense, lazy, useEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Loading from "./components/ui/Loading"
import Layout from "./components/ui/Layout"

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}
const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const App = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Routes>
					{/* Layout used as root - shared header/footer */}
					<Route element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="contact-us" element={<Contact />} />

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
			</Suspense>
			<ScrollToTop />
		</>
	)
}

export default App
