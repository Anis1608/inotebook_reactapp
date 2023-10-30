import React from "react";
import NoteContext from "./notecontext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "https://anis-drive-app.onrender.com/";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all notes
 
  const getNotes = async () => {
    // api call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json);
  };

  // fetch all video
  const getVideo = async () => {
    // api call
    const response = await fetch(`${host}api/notes/fetchallvideo`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  };
  // fetch all Images
  const getImages = async () => {
    // api call
    const response = await fetch(`${host}api/notes/fetchallimages`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json);
  };
  // fetch all pdf
  const getPDF = async () => {
    // api call
    const response = await fetch(`${host}api/notes/fetchallpdf`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json)
    setNotes(json);
  };

  // add note

  const addNote = async (title, description, tag , images , pdf  , video) => {
    // api call
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag, images:localStorage.getItem("link") , pdf:localStorage.getItem("pdf") , video:localStorage.getItem("video") }), 
      // body data type must match "Content-Type" header
    });
    const note = await response.json();
    console.log(note);
    setNotes(notes.concat(note));
    setTimeout(() => { 
      localStorage.removeItem("link")
    }, 3000);
    setTimeout(() => { 
      localStorage.removeItem("pdf")
    }, 3000);
    setTimeout(() => { 
      localStorage.removeItem("video")
    }, 3000);
  };

  // delete note

  const deleteNote = async (id) => {
    // api call

    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // edit note

  const editNote = async (id, title, description, tag, images , pdf ,  video) => {
    // api call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag , images:localStorage.getItem("link") , pdf:localStorage.getItem("pdf")  , video:localStorage.getItem("video") }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].images = images;
        newNotes[index].pdf = pdf;
        newNotes[index].video = video;
        break;
      } 
    }
    setNotes(newNotes);
     setTimeout(() => { 
      localStorage.removeItem("link")
    }, 300);
     setTimeout(() => { 
      localStorage.removeItem("pdf")
    }, 300);
     setTimeout(() => { 
      localStorage.removeItem("video")
    }, 300);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes , getVideo  , getImages , getPDF}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
