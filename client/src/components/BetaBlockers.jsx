/* eslint-disable react/jsx-key */
import { useState, useEffect, useMemo } from "react";
import {
	fetchAllBetaBlockerValueSets,
	fetchBetaBlockerValueSetsByValueSetId,
} from "../../fetching/local";
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
	const [valueSetsQuery, setValueSetsQuery] = useState([]);
	const [results, setResults] = useState([]);
	const [currentButton, setCurrentButton] = useState("all");
	const [selectedRowDataToDisplay, setSelectedRowDataToDisplay] = useState(
		[]
	);
	const [dataRows, setDataRows] = useState([]);
	const [dataRowsById, setDataRowsById] = useState([]);
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
			setValueSets(response);
		}
		if (currentButton === "all" && tab === 1) {
			getAllBetaBlockerValueSets();
		}
	}, [currentButton, tab]);

	// set data to render all value sets once obtained from API
	useEffect(() => {
		if (tab === 1 && currentButton === "all" && searchInput === "") {
			console.log("currentValueSets in UEEEEE", valueSets);
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
			// console.log("current search input", searchInput);
			const response = await fetchBetaBlockerValueSetsByValueSetId(
				searchInput
			);
			// console.log("response", response);
			setValueSetsQuery(response);
		}
		if (currentButton === "value-set-id") {
			getBetaBlockerValueSetsByValueSetId();
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

	useEffect(() => {
		// console.log("current value sets", valueSets);
		console.log("searchInput in UE", searchInput);
		console.log("CVS length", Object.keys(valueSetsQuery).length);

		// console.log("medications", valueSets.medications);

		if (Object.keys(valueSetsQuery).length === 3) {
			setDataRowsById(defineDataArray(valueSetsQuery));
		}

		function defineDataArray(valueSetsQuery) {
			let dataRowsArray = {
				id: 1,
				value_set_id: valueSetsQuery.value_set_id,
				value_set_name: valueSetsQuery.value_set_name,
				corresponding_number: valueSetsQuery.medications
					.replaceAll("|", ",")
					.split(",").length,
				medications: valueSetsQuery.medications,
			};
			console.log("dataRowsArray", dataRowsArray);
			return dataRowsArray;
		}
	}, [valueSetsQuery, currentButton, searchInput]);

	// console.log("dataRows", dataRows);

	const selectedRowData = [];
	function selectionModelChange(ids) {
		// console.log("ids in selection model change", ids);
		for (let i = 0; i < ids.length; i++) {
			selectedRowData.push(dataRows[ids[i]]);
		}
		// console.log("selected rows data", selectedRowData);
		setSelectedRowDataToDisplay(selectedRowData);
		return selectedRowData;
	}

	return (
		<section>
			<h1>Beta Blockers Value Sets</h1>
			<div>
				<button id="tab-1" onClick={() => tab1behavior()}>
					All Value Sets
				</button>
				<button id="tab2" onClick={() => setTab(2)}>
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

			{/* search value sets by query */}
			{tab === 2 && (
				<div>
					<div>
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
							onChange={(event) =>
								setSearchInput(event.target.value)
							}
						/>
					</form>
					<div>
						{/* show value sets by queried value set id */}
						{currentButton === "value-set-id" &&
						Object.keys(dataRowsById).length === 5 ? (
							<div>
								<h2>Value Set {dataRowsById.value_set_id}</h2>
								<h3>{dataRowsById.value_set_name}</h3>
								<h4>
									Total number of corresponding medications:{" "}
									{dataRowsById.corresponding_number}
								</h4>
								<h4>Medications</h4>
								<p>
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
				</div>
			)}
		</section>
	);
}

// code for keeping queried value set id data in same DataGrid format; keep for future
// {valueSets &&
//     Object.keys(valueSets).length === 3 &&
//     currentButton === "value-set-id" &&
//     Object.keys(dataRowsById).length === 5 ? (
//         <div style={{ height: "100%", width: "100%" }}>
//             <DataGrid
//                 getRowId={(row) => row.id}
//                 rows={dataRowsById}
//                 columns={headers}
//                 initialState={{
//                     pagination: {
//                         paginationModel: { page: 0, pageSize: 5 },
//                     },
//                 }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection
//                 sx={{
//                     boxShadow: 2,
//                     border: 2,
//                     backgroundColor: "rgba(255, 255, 255, 0.8)",
//                     color: "black",
//                     borderColor: "primary.light",
//                     "& .MuiDataGrid-cell:hover": {
//                         color: "primary.main",
//                     },
//                     width: "100%",
//                     // fontFamily: "Karla",
//                 }}
//             />
//         </div>
//     ) : (
//         <></>
//     )}

// generating datagrid for option "show all"
// useEffect(() => {
// 	console.log("valueSets on tab1", valueSets);
// 	console.log("currentTab", tab);
// 	console.log("currentButton", currentButton);
// 	console.log("searchInput", searchInput);
// 	// if (valueSets && currentButton === "all" && searchInput.length == 0) {
// 	// 	const dataRowsNew = valueSets.map((valueSet, index) => {
// 	// 		return {
// 	// 			id: index,
// 	// 			value_set_id: valueSet.value_set_id,
// 	// 			value_set_name: valueSet.value_set_name,
// 	// 			corresponding_number: valueSet.medications
// 	// 				.replaceAll("|", ",")
// 	// 				.split(",").length,
// 	// 			medications: valueSet.medications,
// 	// 		};
// 	// 	});
// 	// 	setDataRows(dataRowsNew);
// 	// }
// }, [valueSets, currentButton, searchInput, tab]);
