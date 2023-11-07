import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/notecontext';
import NoteItem from './NoteItem';
import './css/Notes.css'
import AddNote from './AddNote';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


export default function Notes() {
    const [isloading, setIsloading] = useState(false)
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "", eimages:""  ,  epdf:""  ,evideo:""})
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
            epdf:currentNote.pdf,
            evideo:currentNote.video,
        });


    }
    const ref = useRef(null)
    const refclose = useRef(null)

    const handleclick = (e) => {
        e.preventDefault();
       window.confirm("Note updated!  Please Reload Page to Reflect Changes ");
        editNote(note.id, note.etitle, note.edescription, note.etag, note.eimages , note.epdf , note.evideo)
        refclose.current.click();
        // console.log("Updatding note" , note)
        // addNote(note.title , note.description , note.tag)

    }
    const handlechange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }


    // images upload 
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



    // pdf upload
    const postPDF = (pdfFile) => {
        if (pdfFile === undefined) {
            alert("PDF file not selected.");
            return;
        }

        if (pdfFile.type === "application/pdf") {
            setIsloading(true);
            const data = new FormData();
            data.append("file", pdfFile);
            data.append("upload_preset", "mydrive");
            data.append("cloud_name", "dgmkwv786");

            fetch("https://api.cloudinary.com/v1_1/dgmkwv786/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString());
                    localStorage.setItem("pdf", data.url.toString());
                    setIsloading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsloading(false);
                });
        } else {
            alert("Please select a PDF file.");
        }
    };



    // Video upload
    const postVideo = (video) => {
        if (video === undefined) {
            alert("Video file not selected.");
            return;
        }

        if (video.type === "video/mp4") {
            setIsloading(true);
            const data = new FormData();
            data.append("file", video);
            data.append("upload_preset", "mydrive");
            data.append("cloud_name", "dgmkwv786");

            fetch("https://api.cloudinary.com/v1_1/dgmkwv786/video/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url.toString());
                    localStorage.setItem("video", data.url.toString());
                    setIsloading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsloading(false);
                });
        } else {
            alert("Please select a video file.");
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
                                        placeholder="Tag" onChange={handlechange} /><br />
                                    <label style={{ marginLeft: "20px", color: "red", marginTop: "5px" }} htmlFor="video">Update Image</label><br />

                                    <input type="file" accept='image/*' name="eimages" id="eimages" className="contact-background"
                                        onChange={(e) => {
                                            postDetails(e.target.files[0])
                                        }} />
                                    <br />
                                    <label style={{ marginLeft: "20px", color: "red", marginTop: "5px" }} htmlFor="video">Update PDF</label><br />

                                    <input type="file" accept='application/pdf' name="epdf" id="epdf" className="contact-background"
                                        onChange={(e) => {
                                            postPDF(e.target.files[0])
                                        }} />
                                    <br />
                                    <label style={{ marginLeft: "20px", color: "red", marginTop: "5px" }} htmlFor="video">Update Video</label><br />

                                    <input type="file" accept='video/*' name="evideo" id="evideo" className="contact-background"
                                        onChange={(e) => {
                                            postVideo(e.target.files[0])
                                        }} />
                                    <br /><br />
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
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5 || isloading} onClick={handleclick} className="btn btn-primary"> {isloading ? "Uploading Changes" : "Update Note "}</button>
                            
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
