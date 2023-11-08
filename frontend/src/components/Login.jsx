import React, { useRef } from 'react'
import { useState  } from 'react';
import { useHistory  } from 'react-router-dom';

function Login() {
    const [show, setShow] = useState(false)

    const [credentials, setCredentials] = useState({ email: "", password: "", forgotemail: "", newpassword :"" , otp:""})
    let history = useHistory();
    const [isloading, setIsloading] = useState(false)
    const [sendotpbuttonloading, setSendotpbuttonloading] = useState(false)
    const [forgotsubmitbuttonloadig, setforgotsubmitbuttonloadig] = useState(false)
    const [openpasswordfield, setopenpasswordfield] = useState(false)

     

    const handlesubmit = async (e) => {
        e.preventDefault();
        // api call
        setIsloading(true)
    const response = await fetch(
      "https://anis-drive-app.onrender.com/api/auth/login",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: credentials.email,
          password: credentials.password,
        }), // body data type must match "Content-Type" header
      }
    );
    const json =  await response.json(); 
    // console.log(json)
    if(json.success){
        localStorage.setItem("token" , json.token)
        history.push('/')
        setIsloading(false)
       
    }
    else{
        alert("Enter Valid Credentails")
        setIsloading(false)
        }
        window.location.reload();
    }
    const handlechange = (e) => {
        setCredentials({...credentials , [e.target.name] : e.target.value})

    }
    const handleShow = () => {
        setShow(!show)
    }

    // forgot password api
    const forgotpasswordmodal = useRef()
    const refclosemodal = useRef()

    const handleopenmodal = () => {
        forgotpasswordmodal.current.click()
    }


    const handleotpsend = async () => {
        setopenpasswordfield(true)
        setSendotpbuttonloading(true)
        const response = await fetch("https://anis-drive-app.onrender.com/api/auth/sendotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.forgotemail }),
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
            setSendotpbuttonloading(false)
        } else {
            alert("Invaild Email ID");
            setSendotpbuttonloading(false)

        }
    };

    const handleforgotpassword = async () => {
        setforgotsubmitbuttonloadig(true)
        const response = await fetch("https://anis-drive-app.onrender.com/api/auth/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.forgotemail,
                newpassword: credentials.newpassword,
                otp: credentials.otp
            }),
        });
        await response.json();
        setforgotsubmitbuttonloadig(false) 
        refclosemodal.current.click()
        alert("Password Reset Successfully Please Login...")
    }



    return (
        <>
        <div className='container'>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handlechange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>


                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <div class="input-group flex-nowrap">
                        <input type={show ? "text" : "password"} class="form-control" id="exampleInputPassword1" name='password' aria-label="password input" onChange={handlechange} aria-describedby="password-input" />
                        <span class="input-group-text" id="password-input" onClick={handleShow}>{show ? "Hide" : "Show"}</span>
                    </div>
                        <div id="passwordHelp" style={{color:"blue", marginLeft:"3px" , cursor:"pointer"  , fontSize:"15px"}} onClick={handleopenmodal} className="form-text">Forgot Password Reset</div>
                    
                    <button type="submit" disabled={isloading} className="btn btn-primary mt-3">{isloading ? <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : "Login" }</button>
                </form>
                
            </div>


            {/* for password forgot purpose */}

    
            <button type="button" ref={forgotpasswordmodal} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Password Reset </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* modal body */}

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label" >Email address</label>
                                <input type="forgotemail" name="forgotemail"  className="form-control" id="forgotemail" aria-describedby="emailHelp" onChange={handlechange} />
                                <br />
                                <button className='btn btn-primary' disabled={credentials.forgotemail.length < 6} onClick={handleotpsend}>{sendotpbuttonloading ? "Sending OTP..." : " Send OTP "}</button>
                                {openpasswordfield ? (
                                    <div>
                                    <br />
                                        <input type="otp" name="otp" placeholder='Enter OTP' className="form-control" id="otp" aria-describedby="emailHelp" onChange={handlechange} />
                                        
                                    <br />
                                    <div class="input-group flex-nowrap">
                                            <input type={show ? "text" : "password"} class="form-control" placeholder="New Password" id="newpassword" name='newpassword' aria-label="password input" onChange={handlechange} aria-describedby="password-input" />
                                            <span class="input-group-text" id="password-input" onClick={handleShow}>{show ? "Hide" : "Show"}</span>
                                    </div>
                                    </div>
                              ):("")}
                            </div>
                            </div>
                        <div class="modal-footer">
                            <button type="button" ref={refclosemodal} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={credentials.newpassword.length <8 || credentials.otp.length < 6} onClick={handleforgotpassword} class="btn btn-primary">{forgotsubmitbuttonloadig ? (<div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>) :" Submit "}</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )

}

export default Login
