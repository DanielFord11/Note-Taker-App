const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '../db/db.json');

// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
  try {
    console.log('this ran');
    const db = fs.readFileSync(dbFilePath, 'utf8');
    const notes = JSON.parse(db);
    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST "/notes" handles creating a new note
router.post('/notes', (req, res) => {
    try {
      const { title, text } = req.body;
  
      // Read the existing notes from the database file
      const db = fs.readFileSync(dbFilePath, 'utf8');
      const notes = JSON.parse(db);
  
      // Create a new note object
      const newNote = {
        title,
        text,
      };
  
      // Add the new note to the existing notes array
      notes.push(newNote);
  
      // Write the updated notes back to the database file
      fs.writeFileSync(dbFilePath, JSON.stringify(notes));
  
      return res.status(200).json({ message: 'Note created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

// DELETE "/api/notes/:id" handles deleting a note by ID
router.delete('/notes/:id', (req, res) => {
    try {
      const { id } = req.params;
  
      // Read the existing notes from the database file
      const db = fs.readFileSync(dbFilePath, 'utf8');
      let notes = JSON.parse(db);
  
      // Find the index of the note with the provided ID
      const index = notes.findIndex((note) => note.id === id);
  
      // If the note is found, remove it from the notes array
      if (index !== -1) {
        notes.splice(index, 1);
  
        // Write the updated notes back to the database file
        fs.writeFileSync(dbFilePath, JSON.stringify(notes));
  
        return res.status(200).json({ message: 'Note deleted successfully' });
      }
  
      return res.status(404).json({ error: 'Note not found' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
