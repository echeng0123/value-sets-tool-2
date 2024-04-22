/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import {
	fetchAllMedications,
	fetchMedicationsByMedicationId,
	fetchMedicationsBySimpleGenericName,
	fetchMedicationsByRoute,
} from "../../fetching/local";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Medications() {
	const [tab, setTab] = useState(1);
	const [searchInput, setSearchInput] = useState("");
	const [currentButton, setCurrentButton] = useState("all");
	const [results, setResults] = useState([]);
	const [dataRows, setDataRows] = useState([]);
	const [selectedRowDataToDisplay, setSelectedRowDataToDisplay] = useState(
		[]
	);
	const [medicationData, setMedicationData] = useState([]);
	const [medicationDataById, setMedicationDataById] = useState([]);
	const [
		medicationDataBySimpleGenericName,
		setMedicationDataBySimpleGenericName,
	] = useState([]);
	const [medicationDataByRoute, setMedicationDataByRoute] = useState([]);
	const [medicationToDisplay, setMedicationToDisplay] = useState([]);
	const [medicationToDisplayRoute, setMedicationToDisplayRoute] = useState(
		[]
	);

	function tab1behavior() {
		setTab(1);
		setSearchInput("");
		setCurrentButton("all");
	}

	// snackbar (alert) for if no radio button is selected
	function radioSnackbar() {
		var x = document.getElementById("snackbar");
		x.className = "show";
		setTimeout(function () {
			x.className = x.className.replace("show", "");
		}, 3000);
	}

	// sets state for results showing up when search is entered
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!document.querySelector('input[name="radio"]:checked')) {
			radioSnackbar();
		}

		let currentRadioValue = document.querySelector(
			'input[name="radio"]:checked'
		).value;

		if (searchInput) {
			setResults(!results);
			setCurrentButton(currentRadioValue);
		} else {
			console.log("can't get results");
		}
	};

	// Get all data from the medications table
	useEffect(() => {
		async function getAllMedications() {
			const response = await fetchAllMedications();
			setMedicationData(response);
		}
		if (currentButton === "all" && tab === 1) {
			getAllMedications();
		}
	}, [currentButton, tab]);

	// set data to render all value sets once obtained from API
	useEffect(() => {
		if (tab === 1 && currentButton === "all" && searchInput === "") {
			// console.log("medicationData here", medicationData);
			const dataAll = medicationData.map((medication, index) => {
				return {
					id: index,
					medication_id: medication.medication_id,
					medname: medication.medname,
					simple_generic_name: medication.simple_generic_name,
					route: medication.route,
					outpatients: medication.outpatients,
					inpatients: medication.inpatients,
					patients: medication.patients,
				};
			});
			setDataRows(dataAll);
		}
	}, [medicationData, currentButton, searchInput, tab]);

	// Get data from the medications table queried by medication ID
	useEffect(() => {
		async function getMedicationsByMedicationId() {
			const response = await fetchMedicationsByMedicationId(searchInput);
			setMedicationDataById(response);
		}
		if (currentButton === "medication-id" && searchInput.length != 0) {
			getMedicationsByMedicationId();
		}
	}, [currentButton, tab, searchInput]);

	// Get data from the medications table queried by simple generic name
	useEffect(() => {
		async function getMedicationsBySimpleGenericName() {
			const response = await fetchMedicationsBySimpleGenericName(
				searchInput
			);
			setMedicationDataBySimpleGenericName(response);
		}
		if (
			currentButton === "simple-generic-name" &&
			searchInput.length != 0
		) {
			getMedicationsBySimpleGenericName();
		}
	}, [currentButton, tab, searchInput]);

	// Get data from the medications table queried by route
	useEffect(() => {
		async function getMedicationsByRoute() {
			const response = await fetchMedicationsByRoute(searchInput);
			// console.log("med by SGN", response);
			setMedicationDataByRoute(response);
		}
		if (currentButton === "route" && searchInput.length != 0) {
			getMedicationsByRoute();
		}
	}, [currentButton, tab, searchInput]);

	// Set data to render from queries
	useEffect(() => {
		// console.log("medicationDataById", medicationDataById);
		if (
			medicationDataById &&
			Object.keys(medicationDataById).length > 0 &&
			currentButton === "medication-id" &&
			searchInput != 0
		) {
			setMedicationToDisplay(medicationDataById);
		} else if (
			medicationDataBySimpleGenericName &&
			Object.keys(medicationDataBySimpleGenericName).length > 0 &&
			currentButton === "simple-generic-name" &&
			searchInput != 0
		) {
			setMedicationToDisplay(medicationDataBySimpleGenericName);
		}
	}, [
		medicationDataById,
		medicationDataBySimpleGenericName,
		currentButton,
		searchInput,
	]);

	// set data to render data set by route query
	useEffect(() => {
		// console.log("medicationDataByRoute here", medicationDataByRoute);
		if (
			medicationDataByRoute &&
			currentButton === "route" &&
			searchInput != "" &&
			medicationDataByRoute.length > 0
		) {
			const dataAll = medicationDataByRoute.map((medication, index) => {
				return {
					id: index,
					medication_id: medication.medication_id,
					medname: medication.medname,
					simple_generic_name: medication.simple_generic_name,
					route: medication.route,
					outpatients: medication.outpatients,
					inpatients: medication.inpatients,
					patients: medication.patients,
				};
			});
			// console.log("dataAll", dataAll);
			setMedicationToDisplayRoute(dataAll);
		} else if (
			!medicationDataByRoute &&
			currentButton === "route" &&
			searchInput === "" &&
			medicationDataByRoute.length === 0
		) {
			const dataAll = {
				id: 1,
				medication_id: "",
				medname: "",
				simple_generic_name: "",
				route: "",
				outpatients: "",
				inpatients: "",
				patients: "",
			};
			setMedicationToDisplayRoute(dataAll);
		}
	}, [medicationDataByRoute, currentButton, searchInput]);

	// headers for datagrid
	const headers = [
		{
			field: "medication_id",
			headerName: "Medication Id",
			minWidth: 100,
		},
		{
			field: "medname",
			headerName: "Medname",
			minWidth: 100,
		},
		{
			field: "simple_generic_name",
			headerName: "Simple Generic Name",
			minWidth: 100,
		},
		{
			field: "route",
			headerName: "route",
			minWidth: 100,
		},
		{
			field: "outpatients",
			headerName: "outpatients",
			minWidth: 100,
		},
		{
			field: "inpatients",
			headerName: "inpatients",
			minWidth: 100,
		},
		{
			field: "patients",
			headerName: "patients",
			minWidth: 100,
		},
	];

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
			<div id="snackbar">
				<h3>Please select a field button</h3>
			</div>
			<h1 className="page-header">Medications</h1>
			<div className="tab-container">
				<button
					id="tab-1"
					className="button-tab"
					onClick={() => tab1behavior()}
				>
					All Medication Data
				</button>
				<button
					id="tab2"
					className="button-tab"
					onClick={() => setTab(2)}
				>
					Search Medication Data By Query
				</button>
			</div>
			<br />
			{/* filter all medication data */}
			{tab === 1 &&
			medicationData &&
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
								paginationModel: { page: 0, pageSize: 10 },
							},
						}}
						pageSizeOptions={[5, 10, 20, 50]}
						checkboxSelection
						onRowSelectionModelChange={(ids) => {
							selectionModelChange(ids);
						}}
						sx={{
							boxShadow: "2px 2px 5px 3px rgba(0,0,0,0.5)",
							border: "2px solid white",
							backgroundColor: "rgba(255, 255, 255, 0.8)",
							color: "black",
							borderColor: "primary.light",
							"& .MuiDataGrid-cell:hover": {
								color: "primary.main",
							},
							borderRadius: "10px",
							width: "100%",
							fontFamily: "Karla",
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
									boxShadow:
										"2px 2px 5px 3px rgba(0,0,0,0.5)",
									border: "2px solid white",
									backgroundColor: "rgba(255, 255, 255, 0.8)",
									color: "black",
									borderColor: "primary.light",
									"& .MuiDataGrid-cell:hover": {
										color: "primary.main",
									},
									borderRadius: "10px",
									width: "100%",
									fontFamily: "Karla",
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
			{/* filter medication by queries */}
			{tab === 2 && (
				<div>
					<div className="radio-buttons-container">
						<label htmlFor="medication-id">Medication ID</label>
						<input
							type="radio"
							id="medication-id"
							name="radio"
							value="medication-id"
							className="radio-button"
						/>
						<label htmlFor="simple-generic-name">
							Simple Generic Name
						</label>
						<input
							type="radio"
							id="simple-generic-name"
							name="radio"
							value="simple-generic-name"
							className="radio-button"
						/>
						<label htmlFor="route">Route</label>
						<input
							type="radio"
							id="route"
							name="radio"
							value="route"
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
					{/* filter medication by queried medication ID */}
					{currentButton === "medication-id" &&
						Object.keys(medicationToDisplay).length > 0 &&
						searchInput.length != 0 && (
							<div className="single-card-container">
								<h2 className="single-card-title">
									Medication #{" "}
									{medicationToDisplay.medication_id}
								</h2>
								<div className="medication-table">
									<table>
										<tr>
											<th className="medication-table-cell">
												<i>Medication ID</i>
											</th>
											<th className="medication-table-cell">
												{
													medicationToDisplay.medication_id
												}
											</th>
										</tr>
										<tr>
											<th className="medication-table-cell">
												<i>Medname</i>
											</th>
											<th className="medication-table-cell">
												{medicationToDisplay.medname}
											</th>
										</tr>
										<tr>
											<th className="medication-table-cell">
												<i>Simple Generic Name</i>
											</th>
											<th className="medication-table-cell">
												{
													medicationToDisplay.simple_generic_name
												}
											</th>
										</tr>
										<tr>
											<th className="medication-table-cell">
												<i>Route</i>
											</th>
											<th className="medication-table-cell">
												{medicationToDisplay.route}
											</th>
										</tr>
									</table>
									<table>
										<tr>
											<th className="medication-table-cell">
												<i>Outpatients</i>
											</th>
											<th className="medication-table-cell">
												{
													medicationToDisplay.outpatients
												}
											</th>
										</tr>
										<tr>
											<th className="medication-table-cell">
												<i>Inpatients</i>
											</th>
											<th className="medication-table-cell">
												{medicationToDisplay.inpatients}
											</th>
										</tr>
										<tr>
											<th className="medication-table-cell">
												<i>Patients</i>
											</th>
											<th className="medication-table-cell">
												{medicationToDisplay.patients}
											</th>
										</tr>
									</table>
								</div>
							</div>
						)}
					{/* filter medication by simple generic name */}
					{currentButton === "simple-generic-name" &&
						medicationToDisplay.length > 0 &&
						searchInput.length != 0 && (
							<div>
								<h2 className="single-card-title">
									Corresponding Medication Searched:{" "}
									{medicationToDisplay[0].simple_generic_name}
								</h2>
								<div className="multiple-card-grid">
									{medicationToDisplay.map((medication) => {
										return (
											<div className="single-card-container">
												<table>
													<tr>
														<th>
															<i>Medname</i>
														</th>
														<th
															style={{
																color: "#ffd43e",
																textShadow:
																	"1px 1px 2px black",
																fontWeight: 800,
																fontSize:
																	"1.1rem",
															}}
														>
															{medication.medname}
														</th>
													</tr>
													<tr>
														<th>
															<i>Medication ID</i>
														</th>
														<th>
															{
																medication.medication_id
															}
														</th>
													</tr>
													<tr>
														<th>
															<i>
																Simple Generic
																Name
															</i>
														</th>
														<th>
															{
																medication.simple_generic_name
															}
														</th>
													</tr>
													<tr>
														<th>
															<i>Route</i>
														</th>
														<th>
															{medication.route}
														</th>
													</tr>
													<tr>
														<th>
															<i>Outpatients</i>
														</th>
														<th>
															{
																medication.outpatients
															}
														</th>
													</tr>
													<tr>
														<th>
															<i>Inpatients</i>
														</th>
														<th>
															{
																medication.inpatients
															}
														</th>
													</tr>
													<tr>
														<th>
															<i>Patients</i>
														</th>
														<th>
															{
																medication.patients
															}
														</th>
													</tr>
												</table>
											</div>
										);
									})}
								</div>
							</div>
						)}
					<br />
					{/* filter medication by route */}
					{medicationToDisplayRoute &&
					currentButton === "route" &&
					medicationToDisplayRoute.length > 0 &&
					searchInput.length != 0 ? (
						<div style={{ height: "100%", width: "100%" }}>
							<DataGrid
								// getRowId={(row) => row.id}
								rows={medicationToDisplayRoute}
								columns={headers}
								initialState={{
									pagination: {
										paginationModel: {
											page: 0,
											pageSize: 10,
										},
									},
								}}
								pageSizeOptions={[5, 10, 20, 50]}
								checkboxSelection
								onRowSelectionModelChange={(ids) => {
									selectionModelChange(ids);
								}}
								sx={{
									boxShadow:
										"2px 2px 5px 3px rgba(0,0,0,0.5)",
									border: "2px solid white",
									backgroundColor: "rgba(255, 255, 255, 0.8)",
									color: "black",
									borderColor: "primary.light",
									"& .MuiDataGrid-cell:hover": {
										color: "primary.main",
									},
									borderRadius: "10px",
									width: "100%",
									fontFamily: "Karla",
								}}
								slots={{ toolbar: GridToolbar }}
							/>
							{selectedRowDataToDisplay != [] &&
							selectedRowDataToDisplay.length > 0 ? (
								<div>
									<h3 className="single-card-title">
										Selected data appears below
									</h3>
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
											boxShadow:
												"2px 2px 5px 3px rgba(0,0,0,0.5)",
											border: "2px solid white",
											backgroundColor:
												"rgba(255, 255, 255, 0.8)",
											color: "black",
											borderColor: "primary.light",
											"& .MuiDataGrid-cell:hover": {
												color: "primary.main",
											},
											borderRadius: "10px",
											width: "100%",
											fontFamily: "Karla",
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
				</div>
			)}
		</section>
	);
}
