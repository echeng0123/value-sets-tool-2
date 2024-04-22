import "./App.css";
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";
import NavBar from "./components/NavBar";

function App() {
	return (
		<section id="app-container">
			<a href="/">
				<h1 id="site-header">Value Sets Tool</h1>
			</a>
			<NavBar />
			<MainSection />
			<Footer />
		</section>
	);
}

export default App;
