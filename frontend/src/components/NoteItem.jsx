import React, { useContext } from "react";
import { RiDeleteBinLine } from "react-icons/ri"
import { BiEdit } from "react-icons/bi"
import noteContext from "../context/notes/notecontext";
const NoteItem = (props) => {

    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note  , updateNote} = props;

    return (
        <div className="notebox">
            <h3>{note.title}</h3>
            <p>
                {note.description}
            </p>
            <p>
                {note.images}
            </p>
            <div>
                <RiDeleteBinLine style={{ fontSize: "25px", marginLeft: "2px", marginTop: "15px" }} onClick={()=>{deleteNote(note._id)}} />
                <BiEdit style={{ fontSize: "25px", marginLeft: "15px", marginTop: "15px"}}  onClick={()=>{updateNote(note)}}/>

            </div>
        </div>
    )

}
export default NoteItem;
