import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/notecontext';
import NoteItem from './NoteItem';
import './css/Notes.css'
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default function Notes() {
    const [isloading, setIsloading] = useState(false)
    const [pic, setPic] = useState();
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", eimages:""})
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes()
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
            eimages:currentNote.images,
        });


    }
    const ref = useRef(null)
    const refclose = useRef(null)

    const handleclick = (e) => {
        e.preventDefault();
         
            const userResponse = window.confirm("Note updated!  Please Reload Page to Reflect Updated Images ");
            if (userResponse) {
                window.location.reload(); // Reload the page
            }
        editNote(note.id, note.etitle, note.edescription, note.etag, note.eimages)
        refclose.current.click();
        // console.log("Updatding note" , note)
        // addNote(note.title , note.description , note.tag)

    }
    const handlechange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    const postDetails = (pics) => {
        if (pics === undefined) {
            alert("end in first if condition");
            return;
        }
        setIsloading(true)
        console.log(pics);
        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" || pics.type === "image/WebP") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "mydrive");
            data.append("cloud_name", "dgmkwv786");
            fetch("https://api.cloudinary.com/v1_1/dgmkwv786/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    localStorage.setItem("link", data.url.toString())
                    setIsloading(false)
                })
                .catch((err) => {
                    console.log(err);
                    setIsloading(false)
                });
        } else {
            setIsloading(false)
            return;
        }
    };

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
                                        placeholder="Title" onChange={handlechange} minLength={5} required /><br /><br />
                                    <textarea name="edescription" value={note.edescription} id="edescription" cols="30" rows="5" className="contact-background"
                                        placeholder="Description" onChange={handlechange} minLength={5} required></textarea><br /><br />
                                    <input type="text" value={note.etag} name="etag" id="etag" className="contact-background"
                                        placeholder="Tag" onChange={handlechange} /><br /><br />
                                    <input type="file" name="eimages" id="eimages" className="contact-background"
                                        onChange={(e) => {
                                            postDetails(e.target.files[0])
                                        }} /><br /><br />
                                    <br />
                                </div>
                            </form>
                        </div>
                        {isloading && <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                            </div>
                        </div>}
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5 || isloading} onClick={handleclick} className="btn btn-primary"> {isloading ? "Uploading Image" : "Update Note"}</button>
                            
                        </div>
                    </div>
                </div>
            </div>
            <h1 style={{ margin: "15px" }}>Your Notes</h1>
            <div style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}>
                {notes.length === 0 && "No Note To Display"}
                {notes.map((note) => {
                    return <NoteItem updateNote={updateNote} key={note._id} note={note} />
                })}
            </div>

        </>
    )
}
