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
	const [selectedRowDataToDisplay, setSelectedRowDataToDisplay] = useState(
		[]
	);

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
			minWidth: 100,
		},
		{
			field: "value_set_name",
			headerName: "Value Set Name",
			minWidth: 100,
		},
		{
			field: "corresponding_number",
			headerName: "Total # Corresponding Medications",
			type: "number",
			minWidth: 100,
		},
		{
			field: "medications",
			headerName: "Medications",
			minWidth: 400,
		},
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
	// console.log("dataRows", dataRows);

	const selectedRowData = [];
	function selectionModelChange(ids) {
		console.log("ids in selection model change", ids);
		for (let i = 0; i < ids.length; i++) {
			console.log("hey");
			selectedRowData.push(dataRows[ids[i]]);
		}
		console.log("selected rows data", selectedRowData);
		setSelectedRowDataToDisplay(selectedRowData);
		return selectedRowData;
	}

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
			<div style={{ height: "100%", width: "100%" }}>
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
					onRowSelectionModelChange={(ids) => {
						selectionModelChange(ids);
					}}
					autoHeight={"true"}
					sx={{
						boxShadow: 2,
						border: 2,
						backgroundColor: "rgba(255, 255, 255, 0.8)",
						color: "black",
						borderColor: "primary.light",
						"& .MuiDataGrid-cell:hover": {
							color: "primary.main",
						},
						width: "100%",
						// fontFamily: "Karla",
					}}
				/>
				<h3>Selected data appears below</h3>
				{selectedRowDataToDisplay != [] &&
				selectedRowDataToDisplay.length > 0 ? (
					<DataGrid
						getRowId={(row) => row.id}
						rows={selectedRowDataToDisplay}
						columns={headers}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10]}
						checkboxSelection
						sx={{
							boxShadow: 2,
							border: 2,
							backgroundColor: "rgba(255, 255, 255, 0.8)",
							color: "black",
							borderColor: "primary.light",
							"& .MuiDataGrid-cell:hover": {
								color: "primary.main",
							},
							// fontFamily: "Karla",
						}}
					/>
				) : (
					<></>
				)}
			</div>
			<div>
				<h1></h1>
			</div>
		</section>
	);
}

{
	/* {currentButton && valueSets ? (
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
			)} */
}
