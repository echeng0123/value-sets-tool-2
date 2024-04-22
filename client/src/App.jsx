import "./App.css";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";

function App() {
	return (
		<section id="app-container">
			<h1 id="site-header">
				<a href="/" className="animate-character">
					Value Sets Tool
				</a>
			</h1>

			<NavBar />
			<MainSection />
			<Footer />
		</section>
	);
}

export default App;
