/* eslint-disable react/jsx-key */
import { useState, useEffect, useMemo } from "react";
import {
	fetchAllBetaBlockerValueSets,
	fetchBetaBlockerValueSetsByValueSetId,
	fetchBetaBlockerValueSetsByValueSetName,
	fetchBetaBlockerValueSetsByMedicationId,
} from "../../fetching/local";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function BetaBlockers() {
	const [searchInput, setSearchInput] = useState("");
	const [valueSets, setValueSets] = useState([]);
	const [valueSetsQuery, setValueSetsQuery] = useState([]);
	const [results, setResults] = useState([]);
	const [currentButton, setCurrentButton] = useState("all");
	const [selectedRowDataToDisplay, setSelectedRowDataToDisplay] = useState(
		[]
	);
	const [dataRows, setDataRows] = useState([]);
	const [dataRowsById, setDataRowsById] = useState([]);
	const [dataRowsByName, setDataRowsByName] = useState([]);
	const [dataRowsByMedication, setDataRowsByMedication] = useState([]);

	const [tab, setTab] = useState(1);

	function tab1behavior() {
		setTab(1);
		setSearchInput("");
		setCurrentButton("all");
	}

	// sets state for results showing up when search is entered
	const handleSubmit = async (event) => {
		event.preventDefault();
		let currentRadioValue = document.querySelector(
			'input[name="radio"]:checked'
		).value;
		if (searchInput) {
			// console.log("currentRadioValue in handlesubmit", currentRadioValue);
			// console.log("searchInput in handleSubmit", searchInput);
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
			setValueSets(response);
		}
		if (currentButton === "all" && tab === 1) {
			getAllBetaBlockerValueSets();
		}
	}, [currentButton, tab]);

	// set data to render all value sets once obtained from API
	useEffect(() => {
		if (tab === 1 && currentButton === "all" && searchInput === "") {
			const dataAll = valueSets.map((valueSet, index) => {
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
			setDataRows(dataAll);
		}
	}, [valueSets, currentButton, searchInput, tab]);

	// Get value sets by value set ID
	useEffect(() => {
		async function getBetaBlockerValueSetsByValueSetId() {
			const response = await fetchBetaBlockerValueSetsByValueSetId(
				searchInput
			);
			setValueSetsQuery(response);
		}
		if (currentButton === "value-set-id") {
			getBetaBlockerValueSetsByValueSetId();
		}
	}, [currentButton, searchInput]);

	// Get value sets by value set name
	useEffect(() => {
		async function getBetaBlockerValueSetsByValueSetName() {
			const response = await fetchBetaBlockerValueSetsByValueSetName(
				searchInput
			);
			setValueSetsQuery(response);
		}
		if (currentButton === "value-set-name") {
			getBetaBlockerValueSetsByValueSetName();
		}
	}, [currentButton, searchInput]);

	// Get value sets by medication ID
	useEffect(() => {
		async function getBetaBlockerValueSetsByMedicationId() {
			const response = await fetchBetaBlockerValueSetsByMedicationId(
				searchInput
			);
			// console.log("response from FETCH", response);
			setValueSetsQuery(response);
		}
		if (currentButton === "medication") {
			getBetaBlockerValueSetsByMedicationId();
		}
	}, [currentButton, searchInput]);

	// headers for datagrid
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

	// allows for rendering of value sets searched by a query
	useEffect(() => {
		// console.log("currentButton in UE", currentButton);
		// console.log("valueSetsQuery", valueSetsQuery);
		if (
			valueSetsQuery &&
			Object.keys(valueSetsQuery).length > 0 &&
			Object.keys(valueSetsQuery).length < 12 &&
			currentButton === "value-set-id" &&
			searchInput != 0
		) {
			setDataRowsById(defineDataArrayId(valueSetsQuery));
		} else if (
			valueSetsQuery &&
			Object.keys(valueSetsQuery).length > 0 &&
			Object.keys(valueSetsQuery).length < 12 &&
			currentButton === "value-set-name" &&
			searchInput != 0
		) {
			setDataRowsByName(valueSetsQuery);
		} else if (
			valueSetsQuery &&
			Object.keys(valueSetsQuery).length > 0 &&
			Object.keys(valueSetsQuery).length < 12 &&
			currentButton === "medication" &&
			searchInput != 0
		) {
			setDataRowsByMedication(valueSetsQuery);
		}

		function defineDataArrayId(valueSetsQuery) {
			console.log("valueSetsQuery", valueSetsQuery);
			let dataRowsArray = {
				id: 1,
				value_set_id: valueSetsQuery.value_set_id,
				value_set_name: valueSetsQuery.value_set_name,
				corresponding_number: valueSetsQuery.medications
					.replaceAll("|", ",")
					.split(",").length,
				medications: valueSetsQuery.medications,
			};
			// console.log("dataRowsArray", dataRowsArray);
			return dataRowsArray;
		}
	}, [valueSetsQuery, currentButton, searchInput]);

	// allows for rendering of selected rows
	const selectedRowData = [];
	function selectionModelChange(ids) {
		for (let i = 0; i < ids.length; i++) {
			selectedRowData.push(dataRows[ids[i]]);
		}
		setSelectedRowDataToDisplay(selectedRowData);
		return selectedRowData;
	}

	return (
		<section>
			<h1 className="page-header">Beta Blockers Value Sets</h1>
			<div className="tab-container">
				<button
					id="tab-1"
					className="button-tab"
					onClick={() => tab1behavior()}
				>
					All Value Sets
				</button>
				<button
					id="tab2"
					className="button-tab"
					onClick={() => setTab(2)}
				>
					Search Value Sets By Query
				</button>
			</div>
			<br />

			{/* filter all betablockers data */}
			{tab === 1 &&
			valueSets &&
			currentButton === "all" &&
			dataRows.length > 0 &&
			searchInput.length === 0 ? (
				<div style={{ height: "100%", width: "100%" }}>
					<div style={{ visibility: "hidden" }}>
						<label htmlFor="all">Show all data</label>
						<input
							type="radio"
							id="all"
							name="radio"
							value="all"
							defaultChecked
						/>
					</div>
					<DataGrid
						// getRowId={(row) => row.id}
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
						slots={{ toolbar: GridToolbar }}
					/>
					{selectedRowDataToDisplay != [] &&
					selectedRowDataToDisplay.length > 0 ? (
						<div>
							<h3>Selected data appears below</h3>
							<DataGrid
								getRowId={(row) => row.id}
								rows={selectedRowDataToDisplay}
								columns={headers}
								initialState={{
									pagination: {
										paginationModel: {
											page: 0,
											pageSize: 5,
										},
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
								slots={{ toolbar: GridToolbar }}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}

			{/* search value sets by query */}
			{tab === 2 && (
				<div>
					<div className="radio-buttons-container">
						<label htmlFor="value-set-id">Value Set ID</label>
						<input
							type="radio"
							id="value-set-id"
							name="radio"
							value="value-set-id"
							className="radio-button"
						/>
						<label htmlFor="value-set-name">Value Set Name</label>
						<input
							type="radio"
							id="value-set-name"
							name="radio"
							value="value-set-name"
							className="radio-button"
						/>
						<label htmlFor="medication">Medication ID</label>
						<input
							type="radio"
							id="medication"
							name="radio"
							value="medication"
							className="radio-button"
						/>
					</div>
					<form
						onSubmit={handleSubmit}
						className="search-form-container"
					>
						<label htmlFor="Search" className="search-label">
							Select field, then search by pressing enter
						</label>
						<br />
						<input
							id="search-form"
							type="text"
							name="search"
							className="search-bar"
							placeholder="Search field to get value sets"
							onChange={(event) =>
								setSearchInput(event.target.value)
							}
						/>
					</form>
					{/* show value sets by queried value set id */}
					<div>
						{currentButton === "value-set-id" &&
						Object.keys(dataRowsById).length > 0 &&
						searchInput.length != 0 ? (
							<div className="single-card-container">
								<h2 className="single-card-title">
									Value Set {dataRowsById.value_set_id}
								</h2>
								<h3>Name: {dataRowsById.value_set_name}</h3>
								<h3>
									Total number of corresponding medications:{" "}
									{dataRowsById.corresponding_number}
								</h3>
								<h3>
									<u>Medications</u>
								</h3>
								<p className="medications-list">
									{dataRowsById.medications.replaceAll(
										"|",
										" - "
									)}
								</p>
							</div>
						) : (
							<></>
						)}
					</div>
					{/* show value sets by queried value set name */}
					<div>
						{currentButton === "value-set-name" &&
						searchInput.length != 0 ? (
							<div className="multiple-card-grid">
								{dataRowsByName.map((dataRowByName) => {
									return (
										<div className="single-card-container">
											<h2 className="single-card-title">
												Value Set{" "}
												{dataRowByName.value_set_id}
											</h2>
											<h3>
												{dataRowByName.value_set_name}
											</h3>
											<h4>
												Total number of corresponding
												medications:{" "}
												{
													dataRowByName.corresponding_number
												}
											</h4>
											<h4>Medications</h4>
											<p>
												{dataRowByName.medications.replaceAll(
													"|",
													" - "
												)}
											</p>
										</div>
									);
								})}
							</div>
						) : (
							<></>
						)}
					</div>
					{/* show value sets by queried medication ID */}
					<div>
						{currentButton === "medication" &&
						searchInput.length != 0 ? (
							<div className="single-card-container">
								<h2 className="single-card-title">
									Corresponding Value Sets
								</h2>
								{dataRowsByMedication.map(
									(dataRowByMedication) => {
										return (
											<div>
												<h2>{dataRowByMedication}</h2>
											</div>
										);
									}
								)}
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			)}
		</section>
	);
}
