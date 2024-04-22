// File establishes connection to database

const { Client } = require("pg");

const database = "valuesets2";
const client = new Client(`postgres://localhost:5432/${database}`);
// const client = new Client(
// 	`postgres://valuesets2_user:krkRCJQaNRob45zh94TvxWy31rarKqJJ@dpg-coiv125jm4es739v4ce0-a/valuesets2`
// );

// export for use in other files
module.exports = client;
