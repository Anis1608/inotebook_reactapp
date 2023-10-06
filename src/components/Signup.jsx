import React from 'react'
import { useState  } from 'react';
import { useHistory  } from 'react-router-dom';


function Signup() {
  const [credentials, setCredentials] = useState({name:"", email:"" , password:""})
  let history  = useHistory();
  const handlesubmit = async (e) => {
    e.preventDefault();
// api call
const response = await fetch("http://localhost:5000/api/auth/createuser", { 
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({name:credentials.name, email: credentials.email, password:credentials.password }), // body data type must match "Content-Type" header
});
const json =  await response.json(); 
if(json.success){
    localStorage.setItem("token" , json.token)
    history.push('/')
}

  } 



  const handlechange = (e) => {
    setCredentials({...credentials , [e.target.name] : e.target.value})

}
  return (
   <>
    <div className='container my-3' >
            <form onSubmit={handlesubmit}>
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
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handlechange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
   </>
  )
}

export default Signup
