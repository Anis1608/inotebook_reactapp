import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const formateDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

     const openPDFLink = () => {
        if (note.pdf) {
            const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                window.location.href = note.pdf; // Directly open PDF link on mobile devices
            } else {
                window.open(note.pdf, '_blank'); // Open in a new window on non-mobile devices
            }
        }
    }


    const handleDownloadPDF = () => {
        // Replace 'your_pdf_file.pdf' with the actual path to your PDF file.
        const pdfFile = note.pdf;

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = pdfFile;
        link.download = pdfFile.split('/').pop(); // Sets the default download filename

        // Trigger a click event on the link to start the download
        link.click();
    };

    return (
        <div className='item'>
            <div className="card text-center">
                <div className="card-header">
                    NOTE
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>

                    <a href={note.images} target="_blank">
                        {note.images ? (
                            <img style={{ maxHeight: "250px", maxWidth: "150px" }} src={note.images} alt="Images not uploaded" />
                        ) : (
                            ""
                        )}
                    </a> 

                    <br />
                    <br />


                    {note.pdf ? (
                        <button onClick={handleDownloadPDF}>Download PDF</button>
                    ) : (
                        ""
                    )}

                    <br />
                    <br />

                    <a href={note.video} target="_blank">
                        {note.video ? (
                            <video width="100%" height="auto" controls>
                                <source src={note.video} type="video/mp4" />
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
                    Created At: {formateDate(note.date)}
                </div>
            </div>
        </div>
    );
}

export default NoteItem;
