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
			<h1>Medications</h1>
			<div>
				<button id="tab-1" onClick={() => tab1behavior()}>
					All Medication Data
				</button>
				<button id="tab2" onClick={() => setTab(2)}>
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
							slots={{ toolbar: GridToolbar }}
						/>
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
					<div>
						<label htmlFor="medication-id">Medication ID</label>
						<input
							type="radio"
							id="medication-id"
							name="radio"
							value="medication-id"
						/>
						<label htmlFor="simple-generic-name">
							Simple Generic Name
						</label>
						<input
							type="radio"
							id="simple-generic-name"
							name="radio"
							value="simple-generic-name"
						/>
						<label htmlFor="route">Route</label>
						<input
							type="radio"
							id="route"
							name="radio"
							value="route"
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
							onChange={(event) =>
								setSearchInput(event.target.value)
							}
						/>
					</form>
					{/* filter medication by queried medication ID */}
					{currentButton === "medication-id" &&
						Object.keys(medicationToDisplay).length > 0 &&
						searchInput.length != 0 && (
							<div>
								<h3>
									Medication #{" "}
									{medicationToDisplay.medication_id}
								</h3>
								<table>
									<tr>
										<th>Medication ID</th>
										<th>
											{medicationToDisplay.medication_id}
										</th>
									</tr>
									<tr>
										<th>Medname</th>
										<th>{medicationToDisplay.medname}</th>
									</tr>
									<tr>
										<th>Simple Generic Name</th>
										<th>
											{
												medicationToDisplay.simple_generic_name
											}
										</th>
									</tr>
									<tr>
										<th>Route</th>
										<th>{medicationToDisplay.route}</th>
									</tr>
								</table>
								<br />
								<br />
								<table>
									<tr>
										<th>Outpatients</th>
										<th>
											{medicationToDisplay.outpatients}
										</th>
									</tr>
									<tr>
										<th>Inpatients</th>
										<th>
											{medicationToDisplay.inpatients}
										</th>
									</tr>
									<tr>
										<th>Patients</th>
										<th>{medicationToDisplay.patients}</th>
									</tr>
								</table>
							</div>
						)}
					{/* filter medication by simple generic name */}
					{currentButton === "simple-generic-name" &&
						medicationToDisplay.length > 0 &&
						searchInput.length != 0 && (
							<div>
								<h3>
									Medication
									{medicationToDisplay.simple_generic_name}
								</h3>

								{medicationToDisplay.map((medication) => {
									return (
										<div>
											<table>
												<tr>
													<th>Medication ID</th>
													<th>
														{
															medication.medication_id
														}
													</th>
												</tr>
												<tr>
													<th>Medname</th>
													<th>
														{medication.medname}
													</th>
												</tr>
												<tr>
													<th>Simple Generic Name</th>
													<th>
														{
															medication.simple_generic_name
														}
													</th>
												</tr>
												<tr>
													<th>Route</th>
													<th>{medication.route}</th>
												</tr>
												<tr>
													<th>Outpatients</th>
													<th>
														{medication.outpatients}
													</th>
												</tr>
												<tr>
													<th>Inpatients</th>
													<th>
														{medication.inpatients}
													</th>
												</tr>
												<tr>
													<th>Patients</th>
													<th>
														{medication.patients}
													</th>
												</tr>
											</table>
											<br />
											<br />
										</div>
									);
								})}
							</div>
						)}
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
							<h3>Selected data appears below</h3>
							{selectedRowDataToDisplay != [] &&
							selectedRowDataToDisplay.length > 0 ? (
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
										backgroundColor:
											"rgba(255, 255, 255, 0.8)",
										color: "black",
										borderColor: "primary.light",
										"& .MuiDataGrid-cell:hover": {
											color: "primary.main",
										},
										// fontFamily: "Karla",
									}}
									slots={{ toolbar: GridToolbar }}
								/>
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
