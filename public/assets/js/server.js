const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//read notes
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    // Added closing parenthesis and arrow
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "error reading notes" });
    }
    res.json(JSON.parse(data));
  });
});

//add new note
const { v4: uuidv4 } = require("uuid");

app.post("/api/notes", (req, res) => {
  const newNote = { ...req.body, id: uuidv4() };

  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    // Added closing parenthesis and arrow
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "error saving note" }); // Corrected the quotation mark
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(
      path.join(__dirname, "db", "db.json"),
      JSON.stringify(notes),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "error saving the note" });
        }
        res.json(newNote);
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

const notesFilePath = path.join(__dirname, "/db/db.json");

app.get("/api/notes", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(notesFilePath, "utf8")));
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid4();

  let notes = JSON.parse(fs.readFile(notesFilePath, "utf8"));
  notes.push(newNote);

  fs.writeFileSync(notesFilePath, JSON.stringify(notes));
  res.json(newNote);
});

const { v4: uuidv4 } = require("uuid"); // use uuidv4() to generate unique IDs

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;

  fs.readFile(path.join(__dirname, "db", "db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "error reading notes" });
    }
    let notes = JSON.parse(data);
    notes = notes.filter((note) => note.id);
  });
});
