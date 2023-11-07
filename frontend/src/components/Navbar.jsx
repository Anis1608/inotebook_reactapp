import React, { useContext, useEffect } from 'react'
import "./css/Navbar.css"
import { useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
import { useRef } from 'react'
import authContext from '../context/auth/authcontext'

export default function Navbar() {
    const [input, setInput] = useState({ newpassword: "", otp: "" })
    const handlechange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })

    }


    const [Isloadingpass, setIsloadingpass] = useState(false)
    const [sendotpbutton, setSendotpbutton ] = useState(false)
    const [show, setShow] = useState(false)

    const { credentials, getUser } = useContext(authContext);;
    
    useEffect(() => {
        getUser()
    }, [])
    

    const [navbar, setNavbar] = useState(true)
    let history = useHistory();
    const handlelogout =()=>{
        localStorage.removeItem("token")
        history.push("/login") 
        refclosemodal.current.click();
        window.location.reload()
    }

    // for show and hide password
    const handleshowpass = () => {
        setShow(!show)
    }


    // for modal opening
    const refopenmodal  = useRef()
    const refclosemodal  = useRef()
    const openmodal = () => {
        refopenmodal.current.click();
        
    } 

    // for navbar opening and closing in mobile devices
    const handlenavbar = () => {
        setNavbar(!navbar)  
    }
    const className = navbar
        ? "collapse navbar-collapse ".replace("show"  , "")
        : 'collapse navbar-collapse'.replace("show", "")
    
    
    
    // for setting active and disactive in my navbar


    const [active, setActive] = useState("home"); 

    const handleSetActivehome =  (home) => {
        setActive(home)
    }


    // for password changing purpose

    const handlechangepassword = async (e) => {
        e.preventDefault();
        setIsloadingpass(true)
        const response = await fetch(
            "https://anis-drive-app.onrender.com/api/auth/changepassword",
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token")
                },
                body: JSON.stringify({
                    newpassword: input.newpassword,
                    otp: input.otp,
                }), // body data type must match "Content-Type" header
            }
        ); 
        const json = await response.json();
        alert("Password Changed Successfully")
    }


    // sending otp

    const handleSendOTP = async () => {
        setSendotpbutton(true)
        const response = await fetch("https://anis-drive-app.onrender.com/api/auth/sendotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) { 
            setSendotpbutton(false)

        } else {
            alert("Invaild Email ID");
        }
    };

    const handleopeninput = () => {
        setIsloadingpass(true)
    }




    return (
        <>
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">INotebook</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target={navbar && "#navbarSupportedContent" } aria-controls="navbarSupportedContent" aria-expanded="" aria-label="">
                    <span className="navbar-toggler-icon" onClick={handlenavbar}></span>
                </button>
                    <div className={className} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" onClick={()=>{handleSetActivehome("home")}}>
                                <Link className="nav-link active" onClick={handlenavbar} aria-current="page" to="/home">Home</Link>
                        </li>
                            <li className="nav-item" onClick={() => { handleSetActivehome("video") }}>
                                <Link className="nav-link active" onClick={handlenavbar}  aria-current="page" to="/video">Videos</Link>
                        </li>
                            <li className="nav-item" onClick={() => { handleSetActivehome("images") }}>
                                <Link className="nav-link active" onClick={handlenavbar} aria-current="page" to="/images">Images</Link>
                        </li>
                            <li className="nav-item" onClick={() => { handleSetActivehome("pdf") }}>
                                <Link className="nav-link active" onClick={handlenavbar} aria-current="page" to="/pdf">PDF's</Link>
                        </li>
                            <li className="nav-item" onClick={() => { handleSetActivehome("about") }}>
                                <Link className="nav-link disable" onClick={handlenavbar} to="/about">About</Link>
                        </li>
                    </ul>
                   {!localStorage.getItem("token") ? <form className="d-flex">
                            <Link to="/login" className="btn btn-primary mx-2" onClick={handlenavbar} role="button" aria-disabled="true">Login</Link>
                            <Link to="/signup" className="btn btn-primary mx-2" onClick={handlenavbar}  role="button" aria-disabled="true">Signup</Link> 
                        </form> : <div>
                                
                                <img src={credentials.profile} className="rounded-circle" style={{ width: "50px" }}
                                    alt="Avatar" onClick={openmodal} />
                        </div>
                        }
                </div>
            </div>
            </nav>
            


            {/* modal for profile viewing */}



            <button type="button" ref={refopenmodal} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header d-flex flex-column" style={{ justifyContent: "center", alignItems: "center" }}>
                            <h5 className="modal-title" id="staticBackdropLabel">Profile</h5>

                        </div>
                        <div className="modal-body d-flex flex-column" style={{ justifyContent: "center", alignItems:"center"}}>
                            <img src={credentials.profile} className="rounded-circle" style={{ maxWidth: "150px", maxHeight: "150px" }}
                                alt="Avatar" />
                            <h5>{credentials.email}</h5>
                            <h5>{credentials.name}</h5>
                            <div class="input-group flex-nowrap">
                                <input type={show ? "text" : "password"} class="form-control" placeholder="New Password" id="newpassword" name='newpassword' aria-label="password input" onChange={handlechange} aria-describedby="password-input" />
                                <span class="input-group-text" id="password-input" onClick={handleshowpass}>{show ? "Hide" : "Show"}</span>
                            </div>
                            <br />
                            {
                                Isloadingpass ? (


                                    <div class="input-group">
                                        <input type="text" class="form-control d-none" value={credentials.email} id="email-input" aria-label="email input" aria-describedby="email-input" />
                                        <input type="number" class="form-control" placeholder="Enter OTP" id="otp" name='otp' aria-label="otp" aria-describedby="otp" onChange={handlechange} />
                                        <span class="input-group-text" id="otp" onClick={handleSendOTP}>{ sendotpbutton ? "Sending..." :"Send OTP"}</span>

                                        <div>
                                        </div>
                                    </div>



                                )
                                    : ("")}
                            <br />
                            {
                                Isloadingpass ? (<button type="button" disabled={input.newpassword.length < 5 || input.otp.length < 6} className="btn btn-primary" onClick={handlechangepassword}>Change Password</button>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleopeninput}>Change Password</button>
                                )
                            }
                            
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refclosemodal} data-bs-dismiss="modal">Close</button>
                            <button className="btn btn-primary mx-2" onClick={handlelogout} role="button" aria-disabled="true">Logout</button>
                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
