const express = require("express");
const path = require("path");
//const api = require("./routes/index.js");

const PORT = process.env.port || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/api", api);

app.use(express.static("public"));

// GET Route for homepage
// view routes direct what is seen on screen
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for feedback page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// base url = http://localhost:3001
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
