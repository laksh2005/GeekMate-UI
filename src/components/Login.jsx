import React, { useState } from 'react'
import axios from "axios";

const Login = () => {

  const [emailId, setEmailId] = useState("lewa@gmail.com");
  const [password, setPassword] = useState("Barca!404");

//HERE WE ARE CONNECTING OUR FUNCTION TO THE /login API which we created in backend
  const handleLogin = async () =>{
    try{
      const res = await axios.post("http://localhost:1000/login",
      {
        emailId,
        password,
      },
      {withCredentials: true},
      );
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className='card bg-base-300 w-96 shadow-xl'>
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input 
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full max-w-xs"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)} />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input 
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </label>
            </div>
            <div className="card-actions justify-center">
              <button 
              className="btn btn-primary"
              onClick={handleLogin}>
                Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login