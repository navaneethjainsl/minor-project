import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CreateArea from './CreateArea';
import Note from './Note';
// import './QuickNotes.css';

function QuickNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3002/quicknotes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async (newNote) => {
    try {
      const response = await axios.post('http://localhost:3002/quicknotes', newNote);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/quicknotes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
        <h1 style={{color:"white"}}>Notes</h1>
        <CreateArea onAdd={addNote} />
        {notes.map((note) => (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}

    </div>
  );
}

export default QuickNotes;
