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
		const { rows } = await client.query(`
        SELECT * FROM beta_blocker_value_sets
        WHERE LOWER(value_set_name) LIKE '%${value_set_name}%' 
        `);
		console.log("value sets in getBBVS by VS name", rows);
		return rows;
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
		const cleanData = rows.map((row) => row.value_set_name);
		console.log("value sets in getBBVS by medication ID", cleanData);
		return cleanData;
	} catch (error) {
		throw error;
	}
};

// joining the two tables to be able to search the beta blocker value sets by an inputted simple generic name
const getBetaBlockerValueSetsBySimpleGenericName = async (
	simple_generic_name
) => {
	try {
		console.log("enter BBVS by simple generic name: ", simple_generic_name);
		const possibleIdsRaw = await client.query(`
        SELECT medication_id FROM medications WHERE simple_generic_name LIKE '${simple_generic_name}%'`);
		const possibleIdsClean = possibleIdsRaw.rows;
		const possibleIdsMap = possibleIdsClean.map((a) => a.medication_id);
		const possibleIds = "'" + possibleIdsMap.join("','") + "'";
		const maxLength = possibleIds.length;
		let rows = [];
		for (let i = 0; i <= maxLength; i++) {
			let currentIdToSearch = possibleIdsMap[i];
			// console.log("currentIdToSearch", currentIdToSearch);
			const row = await client.query(
				`
                SELECT value_set_name
                FROM beta_blocker_value_sets
                WHERE medications LIKE '%${currentIdToSearch}%'
                `
			);
			rows.push(row);
		}
		const cleanData = rows[0].rows.map((row) => row.value_set_name);
		console.log("value sets in getBBVS by simple generic name", cleanData);
		return cleanData;
	} catch (error) {
		throw error;
	}
};

// joining the two tables to be able to search the beta blocker value sets by route
const getBetaBlockerValueSetsByRoute = async (route) => {
	try {
		console.log("enter BBVS by route: ", route);
		const possibleIdsRaw = await client.query(`
        SELECT medication_id FROM medications WHERE LOWER(route) LIKE '${route}%'`);
		const possibleIdsClean = possibleIdsRaw.rows;
		const possibleIdsMap = possibleIdsClean.map((a) => a.medication_id);
		const possibleIds = "'" + possibleIdsMap.join("','") + "'";
		const maxLength = possibleIds.length;
		let rows = [];
		for (let i = 0; i <= maxLength; i++) {
			let currentIdToSearch = possibleIdsMap[i];
			console.log("currentIdToSearch", currentIdToSearch);
			const row = await client.query(
				`
                SELECT value_set_name
                FROM beta_blocker_value_sets
                WHERE medications LIKE '%${currentIdToSearch}%'
                `
			);
			rows.push(row);
		}
		const cleanData = rows[0].rows.map((row) => row.value_set_name);
		console.log("value sets in getBBVS by simple generic name", cleanData);
		return cleanData;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllBetaBlockerValueSets,
	getBetaBlockerValueSetsByValueSetId,
	getBetaBlockerValueSetsByValueSetName,
	getBetaBlockerValueSetsByMedicationId,
	getBetaBlockerValueSetsBySimpleGenericName,
	getBetaBlockerValueSetsByRoute,
};
