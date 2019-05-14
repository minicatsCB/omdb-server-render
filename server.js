const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.listen(port, () => console.log("Listening on port " + port));
