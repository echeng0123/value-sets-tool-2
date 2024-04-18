const client = require("../client");

const getAllBetaBlockerValueSets = async () => {
	try {
		console.log("entering get all beta blocker value sets in helpers");
		const { rows } = await client.query(
			`
            SELECT *
            FROM beta_blocker_value_sets;
            `
		);
		console.log("beta_blocker_value_sets in get all", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

const getBetaBlockerValueSetsByValueSetId = async (value_set_id) => {
	try {
		console.log("enter BBVS by value set ID");
		const {
			rows: [bbvs],
		} = await client.query(`
        SELECT * FROM beta_blocker_value_sets
        WHERE value_set_id = ${value_set_id}`);
		console.log("value_set_id in getBBVS by VS id", bbvs);
		return bbvs;
	} catch (error) {
		throw error;
	}
};

// const getBetaBlockerValueSetsByValueSetName = async (value_set_name) => {

// }

module.exports = {
	getAllBetaBlockerValueSets,
	getBetaBlockerValueSetsByValueSetId,
};
