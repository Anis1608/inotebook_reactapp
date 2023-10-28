import React, { useContext } from "react";
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


                        <a href={note.images} target="_blank" rel="noreferrer" >
                            {note.images ? (  
                                <img style={{ maxHeight: "250px", maxWidth: "150px" }} src={note.images} alt="Images not uploaded"  />
                            ) : (
                                    ""
                            )
                        }
                        </a>


                        <br />
                        <br />

                        <a href={note.pdf} target="_blank" rel="noreferrer" >
                            {note.pdf ? (
                                <img style={{ maxHeight: "100px", maxWidth: "100px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png" alt="PDF not uploaded" />
                            ) : (
                                ""
                            )}
                        </a>

                        <a href={note.video} target="_blank" rel="noreferrer" >
                            {note.pdf ? (
                                <video>
                                <source style={{ maxHeight: "400px", maxWidth: "400px" }} src={note.video} />
                                </video>
                            ) : (
                                ""
                            )}
                        </a>

                        <br />

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
