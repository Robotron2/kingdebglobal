import "bootstrap-icons/font/bootstrap-icons.css"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./context/ThemeProvider"

const App = () => {
	return (
		<>
			<ThemeProvider>
				<Navbar />
				<h1 className="text-3xl font-bold underline">Hello world!</h1>
			</ThemeProvider>
		</>
	)
}

export default App
