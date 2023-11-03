import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext';
import './css/Notes.css'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import VideoItem from './VideoItem';


export default function Video() {
    const context = useContext(noteContext)
    const { notes, getVideo } = context;
    let history = useHistory();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getVideo()
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])
    return (
        <> 
                <h1 style={{ margin: "15px" }}>Your Videos</h1>
            <div style={{ display: "flex", flexWrap: "wrap", margin: "10px" }}>
                {notes.length === 0 && "No Video's To Display"}
                {notes.map((note) => {
                    return <VideoItem  key={note._id} note={note} />
                })}
            </div>

        </>
    )
}
