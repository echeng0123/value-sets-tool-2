/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import {
	fetchAllMedications,
	fetchMedicationsByMedicationId,
	fetchMedicationsBySimpleGenericName,
	fetchMedicationsByRoute,
} from "../../fetching/local";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
			console.log("searchInput in medID", searchInput);
			const response = await fetchMedicationsByMedicationId(searchInput);
			setMedicationDataById(response);
			console.log("medid response", response);
		}
		if (currentButton === "medication-id") {
			getMedicationsByMedicationId();
		}
	}, [currentButton, tab, searchInput]);

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
						<label htmlFor="medname">Medname</label>
						<input
							type="radio"
							id="medname"
							name="radio"
							value="medname"
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
						Object.keys(medicationDataById).length > 0 && (
							<div>
								<h3>
									Medication #{" "}
									{medicationDataById.medication_id}
								</h3>
								<table>
									<tr>
										<th>Medication ID</th>
										<th>
											{medicationDataById.medication_id}
										</th>
									</tr>
									<tr>
										<th>Medname</th>
										<th>{medicationDataById.medname}</th>
									</tr>
									<tr>
										<th>Simple Generic Name</th>
										<th>
											{
												medicationDataById.simple_generic_name
											}
										</th>
									</tr>
									<tr>
										<th>Route</th>
										<th>{medicationDataById.route}</th>
									</tr>
								</table>
								<br />
								<br />
								<table>
									<tr>
										<th>Outpatients</th>
										<th>
											{medicationDataById.outpatients}
										</th>
									</tr>
									<tr>
										<th>Inpatients</th>
										<th>{medicationDataById.inpatients}</th>
									</tr>
									<tr>
										<th>Patients</th>
										<th>{medicationDataById.patients}</th>
									</tr>
								</table>
							</div>
						)}
					{/* filter medication by queried medname */}
					{currentButton === "medname" && (
						<div>
							<h4>medname</h4>
						</div>
					)}
					{/* filter medication by simple generic name */}
					{currentButton === "simple-generic-name" && (
						<div>
							<h4>simple-generic-name</h4>
						</div>
					)}
					{/* filter medication by route */}
					{currentButton === "route" && (
						<div>
							<h4>route</h4>
						</div>
					)}
				</div>
			)}
		</section>
	);
}
