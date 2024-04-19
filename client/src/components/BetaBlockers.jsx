/* eslint-disable react/jsx-key */
import { useState, useEffect, Fragment } from "react";
import { fetchAllBetaBlockerValueSets } from "../../fetching/local";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
		// console.log("currentRadioValue: ", currentRadioValue);
		if (searchInput) {
			setResults(!results);
			setCurrentButton(currentRadioValue);
		} else {
			console.log("can't get results");
		}
	};

	// Get all data from the beta blocker value sets table
	useEffect(() => {
		async function getAllBetaBlockerValueSets() {
			const response = await fetchAllBetaBlockerValueSets();
			// console.log("response from FABBVS", response);
			setValueSets(response);
		}
		if (currentButton === "all") {
			getAllBetaBlockerValueSets();
		}
	}, [currentButton]);

	const headers = [
		{
			field: "value_set_id",
			headerName: "Value Set Id",
			width: 100,
		},
		{
			field: "value_set_name",
			headerName: "Value Set Name",
			width: 100,
		},
		{
			field: "corresponding_number",
			headerName: "Total # Corresponding Medications",
			type: "number",
			width: 100,
		},
		{ field: "medications", headerName: "Medications", width: 400 },
	];

	const dataRows = valueSets.map((valueSet, index) => {
		return {
			id: index,
			value_set_id: valueSet.value_set_id,
			value_set_name: valueSet.value_set_name,
			corresponding_number: valueSet.medications
				.replaceAll("|", ",")
				.split(",").length,
			medications: valueSet.medications,
		};
	});
	console.log("dataRows", dataRows);

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
			<DataGrid
				getRowId={(row) => row.id}
				rows={dataRows}
				columns={headers}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
				checkboxSelection
			/>
			{/* <Fragment>
				<DataGrid>
					<TableHead>
						<TableRow>
						<TableCell>Value Set ID</TableCell>
						<TableCell>Value Set Name</TableCell>
						<TableCell>Total # Corresponding Medications</TableCell>
						<TableCell>Medications</TableCell>
						</TableRow>
					</TableHead>
					{valueSets.map((valueSet) => {
						return (
							<TableBody>
								<TableCell>{valueSet.value_set_id}</TableCell>
								<TableCell>{valueSet.value_set_name}</TableCell>
								<TableCell>
									{
										valueSet.medications
											.replaceAll("|", ",")
											.split(",").length
									}
								</TableCell>
								<TableCell>
									{valueSet.medications.replaceAll(
										"|",
										" - "
									)}
								</TableCell>
							</TableBody>
						);
					})}
				</DataGrid>
			</Fragment> */}

			{/* {currentButton && valueSets ? (
				<div>
					<table className="data-table">
						<tr>
							<th>Value Set ID</th>
							<th>Value Set Name</th>
							<th>Total # Corresponding Medications</th>
							<th>Medications</th>
						</tr>
						{valueSets.map((valueSet) => {
							return (
								<tr className="table-row">
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
			)} */}
		</section>
	);
}
