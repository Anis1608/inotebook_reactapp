import React from 'react'
import "./css/Navbar.css"
import { useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
import { useRef } from 'react'

export default function Navbar() {
    const [navbar, setNavbar] = useState(true)
    let history = useHistory();
    const handlelogout =()=>{
        localStorage.removeItem("token")
        history.push("/login") 
        refclosemodal.current.click();
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
                        <Link to="/login" className="btn btn-primary mx-2" role="button" aria-disabled="true">Login</Link>
                        <Link to="/signup" className="btn btn-primary mx-2"  role="button" aria-disabled="true">Signup</Link> 
                        </form> : <div>
                                
                            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" style={{ width: "50px"}}
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
                            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" style={{ width: "150px" }}
                                alt="Avatar" />
                            <h3>hello</h3>
                            
                            <h3>hello</h3>
                            <button type="button" className="btn btn-primary" >Change Password</button>
                            
                            
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
