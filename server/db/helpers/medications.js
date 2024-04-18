const client = require("../client");

const getAllMedications = async () => {
	try {
		console.log("entering get all medications in helpers");
		const { rows } = await client.query(
			`
            SELECT *
            FROM medications;
            `
		);
		console.log("medications in get all", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

const getMedicationsByMedicationId = async (medication_id) => {
	try {
		console.log("enter medications by value set ID");
		const {
			rows: [medications],
		} = await client.query(`
        SELECT * FROM medications
        WHERE medication_id = ${medication_id}`);
		console.log(
			"value sets in getMedications by medication id",
			medications
		);
		return medications;
	} catch (error) {
		throw error;
	}
};

const getMedicationsBySimpleGenericName = async (simple_generic_name) => {
	try {
		console.log(
			"enter medications by simple_generic_name: ",
			simple_generic_name
		);
		const {
			rows: [medications],
		} = await client.query(`
        SELECT * FROM medications
        WHERE simple_generic_name LIKE '${simple_generic_name}%' 
        `);
		console.log(
			"value sets in getMedications by SimpleGenericName",
			medications
		);
		return medications;
	} catch (error) {
		throw error;
	}
};

const getMedicationsByRoute = async (route) => {
	try {
		console.log("enter medications by route: ", route);
		const { rows } = await client.query(`
        SELECT * FROM medications
        WHERE route = '${route}'
        `);
		console.log("value sets in getMedications by route", rows);
		return rows;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllMedications,
	getMedicationsByMedicationId,
	getMedicationsBySimpleGenericName,
	getMedicationsByRoute,
};
