// This file links the API requests for the medication table

const express = require("express");
const router = express.Router();

const {
	getAllMedications,
	getMedicationsByMedicationId,
	getMedicationsBySimpleGenericName,
	getMedicationsByRoute,
} = require("../db/helpers/medications");

// GET - /api/medications - get all on the "medications" table
router.get("/", async (req, res, next) => {
	try {
		console.log("entering api/medications");
		const medications = await getAllMedications();
		res.send(medications);
	} catch (error) {
		console.log("error getting all medications data from router", error);
		res.send([]);
		next(error);
	}
});

// GET - /api/medications/:medication_id - get medications by medication_id
router.get("/:medication_id", async (req, res, next) => {
	try {
		console.log("entering api/medications/:medication_id router");
		const medication = await getMedicationsByMedicationId(
			req.params.medication_id
		);
		res.send(medication);
	} catch (error) {
		next(error);
	}
});

// GET - /api/medications/simple_generic_name/:simple_generic_name - get medications by simple_generic_name
router.get(
	"/simple_generic_name/:simple_generic_name",
	async (req, res, next) => {
		console.log("HELLO?");
		try {
			console.log(
				"entering api/medications/simple_generic_name/:simple_generic_name router"
			);
			const medications = await getMedicationsBySimpleGenericName(
				req.params.simple_generic_name
			);
			res.send(medications);
		} catch (error) {
			next(error);
		}
	}
);

// GET - /api/medications/route/:route - get medications by route
router.get("/route/:route", async (req, res, next) => {
	try {
		console.log("entering api/medications/route/:route router");
		const medications = await getMedicationsByRoute(req.params.route);
		res.send(medications);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
