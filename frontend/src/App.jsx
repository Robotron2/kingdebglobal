import "bootstrap-icons/font/bootstrap-icons.css"
import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"

const ScrollToTop = () => {
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

const App = () => {
	return (
		<>
			{/* <ScrollToTop /> */}
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	)
}

export default App
