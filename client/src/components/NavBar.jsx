import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<section>
			<Link to="/">Value Set Comparison Tool</Link>
			<Link to="/beta-blockers">Beta Blockers</Link>
			<Link to="/medications">Medications</Link>
		</section>
	);
}
