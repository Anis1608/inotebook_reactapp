import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext';
import './css/Notes.css'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PdfIteam from './PdfIteam';


export default function Images() {
    const context = useContext(noteContext)
    const { notes, getPDF } = context;
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getPDF()
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <h1 style={{ margin: "15px" }}>Your PDF'S</h1>
            <div style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}>
                {notes.length === 0 && "No PDF's To Display"}
                {notes.map((note) => {
                    return <PdfIteam key={note._id} note={note} />
                })}
            </div>

        </>
    )
}
