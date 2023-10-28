const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const routes = express.Router();
const { body, validationResult } = require('express-validator')

// fetchallnotes   get

routes.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(5000).send("Some Error occured")
    }
})


// addnote  [post]


routes.post('/addnote', fetchuser, [
    body('title', 'title Must have atleast 3 charecter').isLength({ min: 3 }),
    body('description', 'Description  should be Atleast 5 Character').isLength({ min: 5 }),
], async (req, res) => {
    try {

        const { title, description, tag , images ,pdf , video } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, images, pdf , video ,user: req.user.id

        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.log(error.message)
        res.status(5000).send("Some Error occured")

    }
})

// update the notes put


routes.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag , images , pdf   ,video} = req.body;
    const newNote = {}

    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };
    if (images) { newNote.images = images };
    if (pdf) { newNote.pdf = pdf };
    if (video) { newNote.video = video };

    let note = await Notes.findById(req.params.id)
    if (!note) {
        return res.status(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Authorized")
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.send({ note })
})


// delete the notes put


routes.delete('/deletenote/:id', fetchuser, async (req, res) => {
    let note = await Notes.findById(req.params.id)

    if (!note) {
        return res.status(404).send("Not Found")
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("UnAuthorized Access")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.send({ "Success": "Note Has been deleted Succesfully", note: note })
})
module.exports = routes 