// This component handles routing for the entire app between the three "pages"

import { Routes, Route } from "react-router-dom";
import ValueSetComparisonTool from "./ValueSetComparisonTool";
import BetaBlockers from "./BetaBlockers";
import Medications from "./Medications";

export default function MainSection() {
	return (
		<section id="main-section-container">
			<Routes>
				<Route path="/" element={<ValueSetComparisonTool />}></Route>
				<Route path="/beta-blockers" element={<BetaBlockers />}></Route>
				<Route path="/medications" element={<Medications />}></Route>
			</Routes>
		</section>
	);
}
