// This file links the API requests for the beta blocker value sets table

const express = require("express");
const router = express.Router();

const {
	getAllBetaBlockerValueSets,
	getBetaBlockerValueSetsByValueSetId,
	getBetaBlockerValueSetsByValueSetName,
	getBetaBlockerValueSetsByMedicationId,
	getBetaBlockerValueSetsBySimpleGenericName,
	getBetaBlockerValueSetsByRoute,
} = require("../db/helpers/betaBlockerValueSets");

// GET - /api/beta_blocker_value_sets - get all on the "beta blocker value sets" table
router.get("/", async (req, res, next) => {
	try {
		console.log("entering api/beta_blocker_value_sets");
		const beta_blockers = await getAllBetaBlockerValueSets();
		res.send(beta_blockers);
	} catch (error) {
		console.log("error getting all beta blockers data from router", error);
		res.send([]);
		next(error);
	}
});

// GET - /api/beta_blocker_value_sets/:value_set_id - get beta blocker value sets (BBVS) by value set id
router.get("/:value_set_id", async (req, res, next) => {
	try {
		console.log(
			"entering api/beta_blocker_value_sets/:value_set_id router"
		);
		const bbvsID = await getBetaBlockerValueSetsByValueSetId(
			req.params.value_set_id
		);
		res.send(bbvsID);
	} catch (error) {
		next(error);
	}
});

// GET - /api/beta_blocker_value_sets/value_set_name/:value_set_name - get BBVS by value set name
router.get("/value_set_name/:value_set_name", async (req, res, next) => {
	try {
		console.log(
			"entering api/beta_blocker_value_sets/value_set_name/:value_set_name router"
		);
		const bbvsID = await getBetaBlockerValueSetsByValueSetName(
			req.params.value_set_name
		);
		res.send(bbvsID);
	} catch (error) {
		next(error);
	}
});

// GET - /api/beta_blocker_value_sets/medication_id/:medication_id - get BBVS by medication ID
router.get("/medication_id/:medication_id", async (req, res, next) => {
	try {
		console.log(
			"entering api/beta_blocker_value_sets/medication_id/:medication_id router"
		);
		const bbvsID = await getBetaBlockerValueSetsByMedicationId(
			req.params.medication_id
		);
		res.send(bbvsID);
	} catch (error) {
		next(error);
	}
});

// GET - /api/beta_blocker_value_sets/simple_generic_name/:simple_generic_name - get BBVS by simple generic name
router.get(
	"/simple_generic_name/:simple_generic_name",
	async (req, res, next) => {
		try {
			console.log(
				"entering api/beta_blocker_value_sets/simple_generic_name/:simple_generic_name router"
			);
			const bbvsName = await getBetaBlockerValueSetsBySimpleGenericName(
				req.params.simple_generic_name
			);
			res.send(bbvsName);
		} catch (error) {
			next(error);
		}
	}
);

// GET - /api/beta_blocker_value_sets/route/:route - get BBVS by route
router.get("/route/:route", async (req, res, next) => {
	try {
		console.log("entering api/beta_blocker_value_sets/route/:route router");
		const bbvsRoute = await getBetaBlockerValueSetsByRoute(
			req.params.route
		);
		res.send(bbvsRoute);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
