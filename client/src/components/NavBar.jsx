import { NavLink } from "react-router-dom";

export default function NavBar() {
	return (
		<section id="navbar-container">
			<NavLink to="/" className="navbar-link">
				Value Set Comparison Tool
			</NavLink>
			<NavLink to="/beta-blockers" className="navbar-link">
				Beta Blockers
			</NavLink>
			<NavLink to="/medications" className="navbar-link">
				Medications
			</NavLink>
		</section>
	);
}
