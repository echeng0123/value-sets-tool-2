import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<section id="navbar-container">
			<Link to="/" className="navbar-link">
				Value Set Comparison Tool
			</Link>
			<Link to="/beta-blockers" className="navbar-link">
				Beta Blockers
			</Link>
			<Link to="/medications" className="navbar-link">
				Medications
			</Link>
		</section>
	);
}
