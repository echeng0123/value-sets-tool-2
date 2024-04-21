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
	const [medicationData, setMedicationData] = useState([]);
	const [dataRows, setDataRows] = useState([]);
	const [selectedRowDataToDisplay, setSelectedRowDataToDisplay] = useState(
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

	// Get all data from the beta blocker value sets table
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
		</section>
	);
}
