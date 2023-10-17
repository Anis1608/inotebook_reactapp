import React from 'react'
import { useState  } from 'react';
import { useHistory  } from 'react-router-dom';

function Login(){

    const [credentials, setCredentials] = useState({email:"" , password:""})
    let history = useHistory();
    const [isloading, setIsloading] = useState(false)
     

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
    console.log(json)
    if(json.success){
        localStorage.setItem("token" , json.token)
        history.push('/')
        setIsloading(false)
       
    }
    else{
        alert("Enter Valid Credentails")
        setIsloading(false)
    }
    }
    const handlechange = (e) => {
        setCredentials({...credentials , [e.target.name] : e.target.value})

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
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handlechange} />
                </div>
                    <button type="submit" disabled={isloading} className="btn btn-primary">{isloading ? <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> : "Login" }</button>
            </form>
            </div>
        </>
    )

}

export default Login
