// For connections to local database

const client = require("./client");

// Drop tables for cleanliness; note: only doing this for the purposes of developing & testing this data; would not do this on a formal production database

// Drop tables
const dropTables = async () => {
	try {
		console.log("Starting to drop tables");
		await client.query(`
        DROP TABLE IF EXISTS medications cascade;
        DROP TABLE IF EXISTS beta_blocker_value_sets cascade;
        DROP TABLE IF EXISTS junction_value_sets cascade;
        `);
		console.log("Tables dropped");
	} catch (error) {
		console.log("Error dropping tables");
		throw error;
	}
};

// Create tables
const createTables = async () => {
	console.log("Building tables...");
	await client.query(
		`CREATE TABLE medications (
            medication_id BIGINT PRIMARY KEY,
            medname TEXT,
            simple_generic_name VARCHAR(255),
            route VARCHAR (255),
            outpatients INTEGER,
            inpatients INTEGER,
            patients INTEGER
        );
        CREATE TABLE beta_blocker_value_sets (
            value_set_id BIGINT PRIMARY KEY,
            value_set_name TEXT,
            medications TEXT
        );
        
        `
	);
	console.log("Tables built");
};

// Copy data to database
// const copyData = async () => {
// 	console.log("Copying data...");
// 	console.log("Current directory: " + process.cwd());
// 	await client.query(
// 		`
//         COPY beta_blocker_value_sets FROM './beta_blocker_value_sets.csv' delimiter ',' CSV HEADER;
//         COPY medications FROM './medications.csv' delimiter ',' CSV HEADER;
//         `
// 	);
// 	console.log("data copied");
// };

// Call all functions and build database
const rebuildDb = async () => {
	try {
		// connect to local database
		console.log("entering rebuildDB function");
		client.connect();

		// run functions
		await dropTables();
		await createTables();
		// await copyData();
	} catch (error) {
		console.error("Can't build DB", error);
	} finally {
		// close connection
		client.end();
	}
};

rebuildDb();
