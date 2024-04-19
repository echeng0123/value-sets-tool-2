/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { fetchAllBetaBlockerValueSets } from "../../fetching/local";
import ResultsContainer from "./ResultsContainer";

export default function BetaBlockers() {
	const [searchInput, setSearchInput] = useState("");
	const [valueSets, setValueSets] = useState([]);
	const [results, setResults] = useState([]);
	const [currentButton, setCurrentButton] = useState("all");

	// sets state for results showing up when search is entered
	const handleSubmit = async (event) => {
		event.preventDefault();
		let currentRadioValue = document.querySelector(
			'input[name="radio"]:checked'
		).value;
		console.log("currentRadioValue: ", currentRadioValue);
		if (searchInput) {
			setResults(!results);
			setCurrentButton(currentRadioValue);
		} else {
			console.log("can't get results");
		}
	};

	useEffect(() => {
		async function getAllBetaBlockerValueSets() {
			const response = await fetchAllBetaBlockerValueSets();
			console.log("response from FABBVS", response);
			setValueSets(response);
		}
		if (currentButton === "all") {
			getAllBetaBlockerValueSets();
		}
	}, [currentButton]);

	return (
		<section>
			<h1>Beta Blockers Value Sets</h1>
			<div>
				<div>
					<label htmlFor="all">Show all data</label>
					<input
						type="radio"
						id="all"
						name="radio"
						value="all"
						defaultChecked
					/>
					<label htmlFor="value-set-id">Value Set ID</label>
					<input
						type="radio"
						id="value-set-id"
						name="radio"
						value="value-set-id"
					/>
					<label htmlFor="value-set-name">Value Set Name</label>
					<input
						type="radio"
						id="value-set-name"
						name="radio"
						value="value-set-name"
					/>
					<label htmlFor="medication">Medication ID</label>
					<input
						type="radio"
						id="medication"
						name="radio"
						value="medication"
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="Search">
						Select field, then search by pressing enter
					</label>
					<br />
					<input
						id="search-form"
						type="text"
						name="search"
						placeholder="Search field to get value sets"
						onChange={(event) => setSearchInput(event.target.value)}
					/>
				</form>
			</div>
			{currentButton && valueSets ? (
				<div>
					<h3>hi</h3>
					<table>
						<tr>
							<th>Value Set ID</th>
							<th>Value Set Name</th>
							<th>Total # Corresponding Medications</th>
							<th>Medications</th>
						</tr>
						{valueSets.map((valueSet) => {
							return (
								<tr>
									<th>{valueSet.value_set_id}</th>
									<th>{valueSet.value_set_name}</th>
									<th>
										{
											valueSet.medications
												.replaceAll("|", ",")
												.split(",").length
										}
									</th>
									<th>
										{valueSet.medications.replaceAll(
											"|",
											" - "
										)}
									</th>
								</tr>
							);
						})}
					</table>
				</div>
			) : (
				<></>
			)}
		</section>
	);
}
