// This file links the API requests for the beta blocker value sets table

const express = require("express");
const router = express.Router();

const {
	getAllBetaBlockerValueSets,
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

module.exports = router;
