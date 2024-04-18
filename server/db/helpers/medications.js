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
		console.log("value sets in getMedications by VS id", medications);
		return medications;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllMedications,
	getMedicationsByMedicationId,
};
