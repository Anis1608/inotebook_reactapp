import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notecontext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [pic, setPic] = useState();


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
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
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
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
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
        <h1>Message me</h1>
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
              name={pic}
              id={pic}
              className="contact-background"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />

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
              disabled={note.title.length < 5 || note.description.length < 5}
              type="submit"
              id="sendmessage"
              onClick={handleclick}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
