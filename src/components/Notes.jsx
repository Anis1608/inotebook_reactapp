import React, { useContext, useRef  , useState } from 'react'
import noteContext from '../context/notes/notecontext';
import NoteItem from './NoteItem';
import './css/Notes.css'
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default function Notes() {


    const context = useContext(noteContext)
    const { notes, getNotes , editNote } = context;
    const [note, setNote] = useState({ id:"" , etitle: "", edescription: "", etag: "" })
    let history  = useHistory();
    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes()
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id , etitle: currentNote.title , edescription: currentNote.description , etag: currentNote.tag})
        
    }
    const ref = useRef(null)
    const refclose = useRef(null)
    
    const handleclick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle , note.edescription , note.etag)
         refclose.current.click();
        // console.log("Updatding note" , note)
        // addNote(note.title , note.description , note.tag)

    }
    const handlechange = (e) => {
        setNote({...note , [e.target.name] : e.target.value})

    }

    return (
        <>
            <AddNote />
        
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form action="" method="post" name="myForm" id="myForm">
                    <div className="contact-secoundrow">
                        <input type="text" value={note.etitle} name="etitle" id="etitle" className="contact-background"
                            placeholder="Title" onChange={handlechange}  minLength={5} required /><br /><br />
                        <textarea name="edescription" value={note.edescription} id="edescription" cols="30" rows="5" className="contact-background"
                            placeholder="Description" onChange={handlechange}  minLength={5} required></textarea><br /><br />
                        <input type="text"  value={note.etag} name="etag" id="etag" className="contact-background"
                            placeholder="Tag" onChange={handlechange}  /><br /><br />
                        <br />
                    </div>
                </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleclick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 style={{ margin: "15px" }}>Your Notes</h1>
            <div className='noteitem'>
                <div>
                    <div style={{padding:"20px"}}>
                    {notes.length === 0 && "No Note To Display"}
                    </div>
                    {notes.map((note) => {
                        return <NoteItem updateNote={updateNote} key={note._id} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}
