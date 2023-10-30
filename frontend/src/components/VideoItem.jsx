import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";
const VideoItem = (props) => {


    const context = useContext(noteContext)
    const { note, updateNote } = props;
    const formateDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return new Date(date).toLocaleDateString(undefined, options)
    }

    return (
        <>

            <div className='item' style={{height:"auto" , maxWidth:"100%"}}>
                        <a href={note.video} target="_blank" rel="noreferrer" >
                            {note.video ? (
                                <video width="100%" height="auto" controls>
                            <source src={note.video} />
                        </video>
                     
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
export default VideoItem;
