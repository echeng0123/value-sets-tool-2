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
		console.log("value sets in getBBVS by VS id", bbvs);
		return bbvs;
	} catch (error) {
		throw error;
	}
};

const getBetaBlockerValueSetsByValueSetName = async (value_set_name) => {
	try {
		console.log("enter BBVS by value set name: ", value_set_name);
		const newInput = value_set_name.replaceAll("_", " ");
		console.log("newInput is ", newInput, newInput.length, typeof newInput);
		const {
			rows: [bbvs],
		} = await client.query(`
        SELECT * FROM beta_blocker_value_sets
        WHERE value_set_name = '${newInput}' 
        `);
		console.log("value sets in getBBVS by VS name", bbvs);
		return bbvs;
	} catch (error) {
		throw error;
	}
};

const getBetaBlockerValueSetsByMedicationId = async (medication_id) => {
	try {
		console.log("enter BBVS by medication id: ", medication_id);
		const {
			rows: [bbvs],
		} = await client.query(`
        SELECT value_set_name FROM beta_blocker_value_sets
        WHERE medications LIKE '%${medication_id}%'
        `);
		console.log("value sets in getBBVS by medication ID", bbvs);
		return bbvs;
	} catch (error) {}
};
// HAVING CONTAINS(medications, '%${medication_id}%')
// WHERE CONTAINS(medications, '%${medication_id}|%')

module.exports = {
	getAllBetaBlockerValueSets,
	getBetaBlockerValueSetsByValueSetId,
	getBetaBlockerValueSetsByValueSetName,
	getBetaBlockerValueSetsByMedicationId,
};
