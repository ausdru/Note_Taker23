const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readNote, writeNote, read_Save } = require('../utils/fsUtils')

// GET Request 
router.get('/notes', (req, res) => {
    readNote('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => res.status(500).json({err: error.message}))
});

// POST Request
router.post('/notes', (req, res) => {
    const {title, text} = req.body
    if(!title || !text) {
        return res
        .status(500)
        .json({error: 'Please fill out both sections!'})
    }

    const newNote = {
        title,
        text,
        id: uuidv4()
    }

    read_Save(newNote, './db/db.json')
    .then(() => res.json({status: 'Successful!', body: newNote}))
    .catch((error) =>
    res.status(500).json({error: 'Error saving note to file!'})
    )
});

// Need to add 'DELETE' & 'writeNote'!


module.exports =  router;