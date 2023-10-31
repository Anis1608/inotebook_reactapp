import React from 'react'
import "./css/Navbar.css"
import { useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
import { useRef } from 'react'

export default function Navbar() {
    const [Hidden, setHidden] = useState(true)
    const burger = () => {
        setHidden(!Hidden)
    }
    let history = useHistory();
    const handlelogout =()=>{
        localStorage.removeItem("token")
        history.push("/login")     
    }


    // // for modal opening
    // const refopenmodal  = useRef()
    // const openmodal = () => {
    //     refopenmodal.current.click();
        
    // } 
    return (
        <>
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">INotebook</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/video">Videos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/images">Images</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/pdf">PDF's</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                   {!localStorage.getItem("token") ? <form className="d-flex">
                        <Link to="/login" className="btn btn-primary mx-2" role="button" aria-disabled="true">Login</Link>
                        <Link to="/signup" className="btn btn-primary mx-2"  role="button" aria-disabled="true">Signup</Link> 
                        </form> : <div>
                                
                            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" style={{ width: "50px"}}
                                    alt="Avatar"  />
                                <button className="btn btn-primary mx-2" onClick={handlelogout} role="button" aria-disabled="true">Logout</button>
                        </div>
                        }
                </div>
            </div>
            </nav>
            


            {/* modal for profile viewing */}


            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
