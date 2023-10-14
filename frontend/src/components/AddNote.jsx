import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/notecontext';

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })


    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title , note.description , note.tag)
        setNote({ title: "", description: "", tag: "" })

    }
    const handlechange = (e) => {
        setNote({...note , [e.target.name] : e.target.value})

    }
    return (
        <div className="contact-left">
            <div className="contact-messageme">
                <h1>Message me</h1>
            </div>
            <div className="contact-formcontainer">
                <form action="" method="post" name="myForm" id="myForm">
                    <div className="contact-secoundrow">
                        <input type="text" name="title" id="title" className="contact-background"
                            placeholder="Title" onChange={handlechange} minLength={5} required value={note.title} /><br /><br />
                        <textarea name="description" id="description" cols="30" rows="5" className="contact-background"
                            placeholder="Description" onChange={handlechange}   minLength={5} required value={note.description}></textarea><br /><br />
                        <input type="text" name="tag" id="tag" className="contact-background"
                            placeholder="Tag" onChange={handlechange} value={note.tag} /><br /><br />
                        <br />
                        <button disabled={note.title.length<5 || note.description.length<5}type="submit" id="sendmessage" onClick={handleclick}>Add Note</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNote
