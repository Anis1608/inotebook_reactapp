import React, { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri"
import { BiEdit } from "react-icons/bi"
import noteContext from "../context/notes/notecontext";
const NoteItem = (props) => {


    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const formateDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options)
    }

    return (
        <>

        <div className='item'>
            <div className="card text-center" >
                <div className="card-header">
                    NOTE
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <a href={note.images} target="_blank">
                    <img style={{ maxHeight: "250px", maxWidth: "150px" }} src={note.images} alt="Image Not Found" / >
                        </a>
                    <button className="btn btn-primary mx-2" onClick={() => { deleteNote(note._id) }}>DELETE</button>
                    <button className="btn btn-primary mx-2" onClick={() => { updateNote(note) }}>EDIT</button>
                </div>
                <div className="card-footer text-muted">
                    Created At : {formateDate(note.date)}
                </div>
            </div>
        </div>
    </>
    )

}
export default NoteItem;
