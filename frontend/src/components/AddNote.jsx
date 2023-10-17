import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notecontext";

const AddNote = () => {
  const context = useContext(noteContext);
  const [isloading, setIsloading] = useState(false)
  // const [pic, setPic] = useState();
  const { addNote } = context;


  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
    images: localStorage.getItem("link"),
  });

  const postDetails = (pics) => {
    if (pics === undefined) {
      alert("end in first if condition");
      return;
    }
    setIsloading(true)
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" || pics.type === "image/WebP") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mydrive");
      data.append("cloud_name", "dgmkwv786");
      fetch("https://api.cloudinary.com/v1_1/dgmkwv786/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          (data.url.toString());
          console.log(data.url.toString());
          localStorage.setItem("link", data.url.toString())
          setIsloading(false)
        })
        .catch((err) => {
          console.log(err);
          setIsloading(false)
        });
      } else {
      setIsloading(false)
      return;
    }
  };

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag, note.images);
    setNote({ title: "", description: "", tag: "", images: "" });

  };
 

  const handlechange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-left">
      <div className="contact-messageme">
        <h1>Add Your Notes With Images</h1>
      </div>
      <div className="contact-formcontainer">
        <form action="" method="post" name="myForm" id="myForm">
          <div className="contact-secoundrow">
            <input
              type="text"
              name="title"
              id="title"
              className="contact-background"
              placeholder="title"
              onChange={handlechange}
              minLength={5}
              required
              value={note.title}
            />
            <br />
            <br />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              className="contact-background"
              placeholder="Description"
              onChange={handlechange}
              minLength={5}
              required
              value={note.description}
            ></textarea>
            <br />
            <br />
            <input
              type="text"
              name="tag"
              id="tag"
              className="contact-background"
              placeholder="Tag"
              onChange={handlechange}
              value={note.tag}
            />
            <br />
            <br />
            <input
              type="file"
              name="images"
              id="images"
              className="contact-background"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            /> {isloading && <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
              </div>
            </div>}


            {/* <input
              type="file"
              name="images"
              id="images"
              className="contact-background"
              accept="image/*"
              value={note.images}
              onChange={(e) => postDetails(e.target.files[0])}
            /> */}
            <br />
            <br />
            <br />
            <button
              type="submit"
              id="sendmessage"
              className="btn btn-primary"
              disabled={note.title.length < 5 || note.description.length < 5 || isloading}
              
              onClick={handleclick}
            >
              {isloading ? "Uploading Image" : " Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
