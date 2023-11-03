import React, { useRef } from 'react'
import { useState  } from 'react';
import { useHistory  } from 'react-router-dom';


function Signup() {
  const [show, setShow] = useState(false)
  const [isloading, setIsloading] = useState(false)
  const [isloadingotp, setIsloadingotp] = useState(false)
  const [isloadingimg, setIsloadingimg] = useState(false)
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", profile: localStorage.getItem("profile"), otp: "" })
  let history  = useHistory();
  const handlesubmit = async (e) => {
    e.preventDefault();
    // api call
    setIsloading(true)
const response = await fetch(
  "http://localhost:5000/api/auth/createuser",
  {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      profile:localStorage.getItem("profile"),
      otp:credentials.otp 
    }), // body data type must match "Content-Type" header
  }
);
const json =  await response.json(); 
if(json.success){
    localStorage.setItem("token" , json.token)
  history.push('/')
  setIsloading(false)
  // closeotpmodal.current.click();
  window.location.reload();
    }
else {
  alert('Invalid OTP')
  setIsloading(false)

    }

  } 
  const handlechange = (e) => {
    setCredentials({...credentials , [e.target.name] : e.target.value})

  }
  const handleShow = () => {
    setShow(!show)
  
  }

  const openotpmodal = useRef()
  const closeotpmodal = useRef()
  const handleSendOTP = async () => {
    openotpmodal.current.click();
    setIsloadingotp(true)
    const response = await fetch("http://localhost:5000/api/auth/sendotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setIsloadingotp(false)
    } else {
      alert("Invaild Email ID");
      setIsloadingotp(false)
    }
  };


  // images upload for profile
  const postDetails = (pics) => {
    if (pics === undefined) {
      alert("end in first if condition");
      return;
    }
    setIsloadingimg(true)
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
          console.log(data.url.toString());
          localStorage.setItem("profile", data.url.toString())
          setIsloadingimg(false)
        })
        .catch((err) => {
          console.log(err);
          setIsloadingimg(false)
        });
    } else {
      setIsloadingimg(false)
      return;
    }
  };








  return (
   <>
    <div className='container my-3' >
            <form >
                <div className="mb-3">
                    <label htmlFor="exampleInputusername" className="form-label" >User Name</label>
                    <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" onChange={handlechange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlechange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type={show ? "text" : "password"} name='password' className="form-control" id="exampleInputPassword1" onChange={handlechange} />
          </div>
          <div className='mb-3'>
            <p className='btn' style={{ border: "2px solid" }} onClick={handleShow} >{show ? "Hide Password" : "Show Password"}</p>
          </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputprofile" className="form-label">Profile pic</label>
            <input type='file' name='file' accept='image/*' className="form-control" id="exampleInputprofile" onChange={(e) => {
              postDetails(e.target.files[0])
            }} />
          </div>

          {/* code */}
          <br />
            </form>
          <button 
            disabled={isloadingimg || credentials.email.length < 8 || credentials.password.length < 5 }
            className="btn btn-primary"
            onClick={handleSendOTP}    
          >{
              isloadingimg ? (<div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>): ("  Send OTP  ")
          }
           
          </button>
      </div>
      



      {/* modal for otp field */}

 
      <button type="button" ref={openotpmodal} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalotp">
        Launch demo modal
      </button>

      <div class="modal fade" id="exampleModalotp" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">OTP Verification</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div className="mb-3">
                
                {isloadingotp ? (<div style={{ display: 'flex', flexDirection:"column" ,justifyContent: 'center', alignItems: 'center' }}>
                  <p>Sending OTP to your GMAIL</p><div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div> ):( <div>
                  <p>OTP Send Successfully</p>
                </div>) }
                <label htmlFor="exampleInputusername" className="form-label" >Enter OTP</label>
              <input
                type="number"
                name="otp"
                placeholder="OTP"
                value={credentials.otp}
                onChange={handlechange}
                className="form-control" id="otp" aria-describedby="otphelp"
              />
              </div>


              {/* code for otp field */}
            </div>
            <div class="modal-footer">
              <button type="button" ref={closeotpmodal} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handlesubmit} type="submit" disabled={isloading} className="btn btn-primary">{isloading ? <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div> : "Register"}</button>
            </div>
          </div>
        </div>
      </div>



   </>
  )
}

export default Signup
