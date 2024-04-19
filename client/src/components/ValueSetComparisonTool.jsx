/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import {
	fetchBetaBlockerValueSetsByMedicationId,
	fetchBetaBlockerValueSetsBySimpleGenericName,
	fetchBetaBlockerValueSetsByRoute,
} from "../../fetching/local";
import ResultsContainer from "./ResultsContainer";

export default function ValueSetComparisonTool() {
	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState([]);
	const [valueSets, setValueSets] = useState([]);
	const [currentButton, setCurrentButton] = useState("");

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

	// Getting value sets by medication ID
	useEffect(() => {
		async function getValueSetsByMedicationID() {
			const response = await fetchBetaBlockerValueSetsByMedicationId(
				searchInput
			);
			setValueSets(response);
			console.log("response from FBBVSBMI: ", response);
		}
		if (currentButton === "medication") {
			getValueSetsByMedicationID();
		}
	}, [searchInput, currentButton]);

	// Getting value sets by simple generic name of medication
	useEffect(() => {
		async function getValueSetsBySimpleGenericName() {
			const response = await fetchBetaBlockerValueSetsBySimpleGenericName(
				searchInput
			);
			setValueSets(response);
			console.log("response from FBBVSBSGN: ", response);
		}
		if (currentButton === "simple-generic-name") {
			getValueSetsBySimpleGenericName();
		}
	}, [searchInput, currentButton]);

	// Getting value sets by route
	useEffect(() => {
		async function getValueSetsByRoute() {
			const response = await fetchBetaBlockerValueSetsByRoute(
				searchInput
			);
			setValueSets(response);
			console.log("response from FBBVSBR: ", response);
		}
		if (currentButton === "route") {
			getValueSetsByRoute();
		}
	}, [searchInput, currentButton]);

	return (
		<section>
			<h1>VALUE SET COMPARISON TOOL</h1>
			<div>
				<div>
					<label htmlFor="simple-generic-name">
						Simple Generic Name
					</label>
					<input
						type="radio"
						id="simple-generic-name"
						name="radio"
						value="simple-generic-name"
					/>
					<label htmlFor="medication">Medication ID</label>
					<input
						type="radio"
						id="medication"
						name="radio"
						value="medication"
					/>
					<label htmlFor="route">Route</label>
					<input type="radio" id="route" name="radio" value="route" />
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
				<ResultsContainer
					currentButton={currentButton}
					valueSets={valueSets}
				/>
			) : (
				<></>
			)}
		</section>
	);
}

{
	/* <div id="medication-results-container">
				{searchInput.length > 0 &&
				currentButton === "medication" &&
				medicationValueSets ? (
					<div>
						{medicationValueSets.map((response) => {
							return (
								<div>
									<h2>{response}</h2>
								</div>
							);
						})}
					</div>
				) : (
					<>
						<h3>
							Corresponding value sets will appear here once the
							search term is entered.
						</h3>
					</>
				)}
			</div> */
}
