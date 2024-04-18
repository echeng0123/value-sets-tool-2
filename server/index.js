const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
// const { COOKIE_SECRET } = require("./secrets.js");
// const { authRequired } = require("./api/utils");
const PORT = 8080;

const client = require("./db/client");

// connect to client
client.connect();

// init morgan
const morgan = require("morgan");
app.use(morgan("dev"));

// init body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// init cookie-parser
// app.use(cookieParser(COOKIE_SECRET));

// app.get("/test", authRequired, (req, res, next) => {
// 	res.send("You are authorized");
// });

// init cors
const cors = require("cors");
app.use(cors());

app._router.get("/", (req, res) => {
	res.send("Hello World!");
});

// router: /api
app.use("/api", require("./api"));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
