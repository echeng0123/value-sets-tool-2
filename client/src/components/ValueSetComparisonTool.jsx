import { useState, useEffect } from "react";
import { fetchBetaBlockerValueSetsBySimpleGenericName } from "../../fetching/local";

export default function ValueSetComparisonTool() {
	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState([]);
	const [valueSets, setValueSets] = useState([]);

	// sets state for results showing up when search is entered
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (searchInput) {
			setResults(!results);
			// console.log("album is", albumInput);
		} else {
			console.log("can't get results");
		}
	};

	useEffect(() => {
		async function getValueSetsBySimpleGenericName() {
			const response = await fetchBetaBlockerValueSetsBySimpleGenericName(
				searchInput
			);
			setValueSets(response);
			console.log("response from FBBVSBSGN: ", response);
		}
		getValueSetsBySimpleGenericName();
	}, [searchInput]);

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
						checked
					/>
					<label htmlFor="medication">Medication ID</label>
					<input
						type="radio"
						id="medication"
						name="radio"
						value="medication"
						checked
					/>
					<label htmlFor="route">Route</label>
					<input
						type="radio"
						id="route"
						name="radio"
						value="route"
						checked
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="Search">Select field, then search</label>
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
			<div>
				{searchInput.length > 0 && results && valueSets ? (
					<div>
						{valueSets.map((response) => {
							return (
								<div key={response.index}>
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
			</div>
		</section>
	);
}
