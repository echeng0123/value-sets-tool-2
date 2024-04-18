// This file handles routing for the API.

const express = require("express");
const router = express.Router();

// GET /api/health
router.get("/health", (req, res, next) => {
	res.send("OK");
});

// ROUTER: /api/beta_blocker_value_sets
router.use("/beta_blocker_value_sets", require("./betaBlockerValueSets"));

module.exports = router;
