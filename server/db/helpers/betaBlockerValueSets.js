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
		const { rows } = await client.query(`
        SELECT value_set_name FROM beta_blocker_value_sets
        WHERE medications LIKE '%${medication_id}%'
        `);
		console.log("value sets in getBBVS by medication ID", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

// joining the two tables
const getBetaBlockerValueSetsBySimpleGenericName = async (
	simple_generic_name
) => {
	try {
		console.log("enter BBVS by simple generic name: ", simple_generic_name);
		const possibleIdsRaw = await client.query(`
        SELECT medication_id FROM medications WHERE simple_generic_name LIKE '${simple_generic_name}%'`);
		const possibleIdsClean = possibleIdsRaw.rows;
		const possibleIdsMap = possibleIdsClean.map((a) => a.medication_id);
		const possibleIds = "'" + possibleIdsMap.join("%','%") + "'";
		console.log("possibleIDs", possibleIds);
		const { rows } = await client.query(`
            SELECT value_set_name
        	FROM beta_blocker_value_sets
        	WHERE medications IN (${possibleIds})
		`);
		console.log("value sets in getBBVS by simple generic name", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

// SELECT value_set_name FROM beta_blocker_value_sets
//             INNER JOIN medications ON
//             medications.medication_id LIKE '${possibleIds}'

// SELECT value_set_name
// 		    FROM beta_blocker_value_sets
// 		    WHERE medications  (${possibleIds}')

// SELECT value_set_name
//             FROM beta_blocker_value_sets
//             WHERE medications LIKE '%(
//                 SELECT medication_id
//                 FROM medications
//                 WHERE simple_generic_name LIKE '${simple_generic_name}%'
//             )%'

// WHERE medications LIKE '%716%'

// SELECT value_set_name
//             FROM beta_blocker_value_sets
//             WHERE medications LIKE '%(SELECT medication_id
//             FROM medications
//             WHERE simple_generic_name LIKE '${simple_generic_name}%')%'

module.exports = {
	getAllBetaBlockerValueSets,
	getBetaBlockerValueSetsByValueSetId,
	getBetaBlockerValueSetsByValueSetName,
	getBetaBlockerValueSetsByMedicationId,
	getBetaBlockerValueSetsBySimpleGenericName,
};
