import "bootstrap-icons/font/bootstrap-icons.css"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./context/ThemeProvider"
import Footer from "./components/Footer"

const App = () => {
	return (
		<>
			<ThemeProvider>
				<Navbar />
				<div className="container">
					<h1 className="text-3xl font-bold underline">Hello world!</h1>
				</div>
				<Footer />
			</ThemeProvider>
		</>
	)
}

export default App
