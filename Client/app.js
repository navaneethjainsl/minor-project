const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Replace the following connection string with your MongoDB connection string
// const mongoUri = 'mongodb+srv://druthigs2003:68KdK8ubdTu31uZl@cluster0.y8u9sgh.mongodb.net/studentsync?retryWrites=true&w=majority';
let mongoUri = "mongodb+srv://navaneethjainsl:navaneethjainsl@cluster0.7rkeunl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = mongoose.model('Note', noteSchema);

// GET route to fetch all notes
app.get('/quicknotes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add a new note
app.post('/quicknotes', async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a note
// Route to delete a note
app.delete('/quicknotes/:id', async (req, res) => {
  try {
    console.log(`Attempting to delete note with ID: ${req.params.id}`);
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      console.log('Note not found');
      return res.status(404).json({ message: 'Note not found' });
    }
    console.log('Note deleted successfully');
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: error.message });
  }
});


app.listen(3002, () => {
  console.log('Server started on port 3002');
});
