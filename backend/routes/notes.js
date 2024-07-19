const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/notesController');
const auth = require('../middleware/auth');

router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.put('/', auth, updateNote);
router.delete('/', auth, deleteNote);

module.exports = router;
