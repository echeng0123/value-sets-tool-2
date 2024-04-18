// This file links the API requests for the medication table

const express = require("express");
const router = express.Router();

const {
	getAllMedications,
	getMedicationsByMedicationId,
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

// GET - /api/medications/medname/:medname - get medications by medname

module.exports = router;
