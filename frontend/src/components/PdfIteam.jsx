import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";
const PdfIteam = (props) => {


    const context = useContext(noteContext)
    const { note, updateNote } = props;
    const formateDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options)
    }

    return (
        <>

            <div className='item' style={{ height: "auto", maxWidth: "100%" }}>
                <a href={note.pdf} target="_blank" rel="noreferrer" >
                    {note.pdf ? (
                        <img style={{ height: "auto", width: "100%" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png" alt="PDF not uploaded" />
                    ) : (
                        ""
                    )}
                </a>

                <br />
            <div className="card-footer text-muted">
                Uploaded On : {formateDate(note.date)}
            </div>
            </div>
        </>
    )

}
export default PdfIteam;
