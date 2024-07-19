const Note = require('../models/note');

const createNote = async (req, res) => {
    const { title, content, tags, backgroundColor } = req.body;
    try {
        const newNote = new Note({
            userId: req.user.id,
            title,
            content,
            tags,
            backgroundColor
        });
        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id, isDeleted: false });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateNote = async (req, res) => {
    const { id, title, content, tags, backgroundColor, isArchived } = req.body;
    try {
        let note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        note = await Note.findByIdAndUpdate(id, { title, content, tags, backgroundColor, isArchived }, { new: true });
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.body;
    try {
        let note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        note = await Note.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
