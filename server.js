const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Menyajikan file statis dari folder public

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/note-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Model untuk catatan
const Note = mongoose.model('Note', new mongoose.Schema({
    content: String
}));

// Rute untuk mendapatkan semua catatan
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// Rute untuk menambahkan catatan
app.post('/notes', async (req, res) => {
    const note = new Note({
        content: req.body.content
    });
    await note.save();
    res.json(note);
});

// Rute untuk menghapus catatan
app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

// Rute untuk menghapus semua catatan
app.delete('/notes', async (req, res) => {
    await Note.deleteMany({});
    res.sendStatus(204);
});

// Menjalankan server
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
