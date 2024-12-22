import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

//HERE WE ARE CONNECTING OUR FUNCTION TO THE /login API which we created in backend
const handleLogin = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId,
        password,

      },
      { withCredentials: true }
    );
      //this add the data of the login to the store
      dispatch(addUser(res.data));

      return navigate("/");

    } catch(err){
      setError(err.message);
      console.log(err?.response?.data || "Something went wrong");
    }
  }

const handleSignUp = async () => {
  try {
    const res = await axios.post(
      BASE_URL + "/signup",
      {
        firstName,
        lastName,
        emailId,
        password,
      },
      { withCredentials: true }
    );
      //this add the data of the signup to the store & navigating the user to profile page
      dispatch(addUser(res.data));
      return navigate("/profile");

    } catch(err){
      setError(err.message);
      console.log(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div>
      <div className="flex justify-center my-10">
        <div className='card bg-base-300 w-96 shadow-xl'>
          <div className="card-body">
            <h2 className="card-title justify-center font-bold">{isLoginForm ? "Login" : "Sign Up"}</h2>
            <div>
            {!isLoginForm && <>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input 
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full max-w-xs"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input 
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full max-w-xs"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} />
            </label>
            </>}
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
              type="password" 
              placeholder="Type here" 
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </label>

            <p className='cursor-pointer my-4 justify-center flex text-gray-400 hover:text-white' onClick={() => setIsLoginForm((value)=> !value)}>
                  {isLoginForm ? "New on GeekMate? Sign Up here" : "Already a GeekMate user? Login here"}
                </p>
            </div>
            <div className="card-actions justify-center">
              <button 
              className="btn btn-outline btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}>
                {isLoginForm ? "Login" : "Sign Up"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login