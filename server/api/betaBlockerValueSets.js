// This file links the API requests for the beta blocker value sets table

const express = require("express");
const router = express.Router();

const {
	getAllBetaBlockerValueSets,
	getBetaBlockerValueSetsByValueSetId,
	getBetaBlockerValueSetsByValueSetName,
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

// GET - /api/beta_blocker_value_sets/:value_set_name - get BBVS by value set name
router.get("/value_set_name/:value_set_name", async (req, res, next) => {
	try {
		console.log(
			"entering api/beta_blocker_value_sets/name/:value_set_name router"
		);
		const bbvsID = await getBetaBlockerValueSetsByValueSetName(
			req.params.value_set_name
		);
		res.send(bbvsID);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
