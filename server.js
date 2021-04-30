// Dependencies 
const express = require('express');
const path = require('path');
let db = require('./db/db.json');
const fs = require('fs');
const { nanoid } = require('nanoid');


// Sets up Express
const app = express();
const PORT = process.env.PORT || 8080; 

// Sets up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static file is like index.html, or script.js
app.use(express.static('public'));

// Returns the index.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Returns the notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// Read and return the db.json file
app.get('/api/notes', (req, res) => res.json(db))

// Receive and save note to db.json 
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = nanoid();
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(newNote);
})

// Delete the note 
app.delete('/api/notes/:id', (req, res) => {
    const deleted = req.params.id;
    db = db.filter(note => note.id !== deleted);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
} )

// Tells the server to begin listening 
app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));