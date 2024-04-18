// File establishes connection to database

const { Client } = require("pg");

const database = "valuesets2";
const client = new Client(`postgres://localhost:5432/${database}`);
// const client = new Client(
// 	`postgres://audiofile_user:YdUwC3IFfc2err9WFoatdE42STHUwhu4@dpg-cmrvn10cmk4c73840t4g-a/audiofile`
// );

// export for use in other files
module.exports = client;
