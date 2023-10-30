import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";
const ImagesIteam = (props) => {


    const context = useContext(noteContext)
    const { note, updateNote } = props;
    const formateDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options)
    }

    return (
        <>

            <div className='item' style={{ height: "auto", maxWidth: "100%" }}>
                        <a href={note.images} target="_blank" rel="noreferrer" >
                            {note.images ? (
                                <img style={{ height: "auto", width: "100%" }} src={note.images} alt="Images not uploaded" />
                            ) : (
                                ""
                            )
                            }
                        </a>

                        <br />
                    <div className="card-footer text-muted">
                    Uploaded On : {formateDate(note.date)}
                    </div>
                    </div>
              
        </>
    )

}
export default ImagesIteam;
