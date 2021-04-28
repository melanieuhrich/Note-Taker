// Dependencies 
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const { nanoid } = require('nanoid');

const id = nanoid(10);

// Sets up Express
const app = express();
const PORT = process.env.PORT || 8080; 

// Sets up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static file is like index.html, or script.js
app.use(express.static('public'));

// Retursn the index.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// Returns the notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));


// Read and return the db.json file
app.get('/api/notes', (req, res) => res.json(db))

// Receive and save note to db.json 
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    db.push(newNote);
    // console.log(db);
    res.json(newNote)
})

// Then return new note to client 
app.get('/api/notes', (req, res) => res.json(db+id));
console.log(id);

// Tells the server to begin listening 
app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));