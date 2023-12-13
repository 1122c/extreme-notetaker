const express = require("express");
const path = require("path");
//const api = require("./routes/index.js");
let database = require("./db/db.json")
const fs = require("fs")
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

// api/controller routes
app.get("/api/notes", (req, res)=>{
    res.json(database)
})

app.post("/api/notes", (req, res)=>{
    let newNote ={
        title: req.body.title,
        text: req.body.text,
        id: Math.random()
    }
    //updates database with newNote values
    database.push(newNote)
    
    //re writes database to include newNote
    fs.writeFileSync("./db/db.json", JSON.stringify(database))

    //send new response version of db to front end
    res.json(database)

})

// base url = http://localhost:3001
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
