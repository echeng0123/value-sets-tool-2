import "./App.css";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";

function App() {
	return (
		<section id="app-container">
			<h1>Value Sets Tool</h1>
			<NavBar />
			<MainSection />
			<Footer />
		</section>
	);
}

export default App;
