import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios';
import {BASE_URL} from '../utils/constants'
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"

const EditProfile = ({user}) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoURL, setPhotoURL] = useState(user.photoURL || "");
    const [skills, setSkills] = useState(user.skills || "");
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        try {
        const res = await axios.put(
            BASE_URL + "/profile/edit",
            {
              firstName,
              lastName,
              photoURL,
              age,
              gender,
              about
            },
            {
              withCredentials: true, 
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        } catch (err) {
        setError(err.data);
        }
    };

    return (
        <>
        <div className='flex justify-center mx-10 gap-x-10'>
          <div className="flex justify-center my-10">
            <div className='card bg-base-300 w-96 shadow-xl h-full border hover:border-gray-600'>
              <div className="card-body">
                <h2 className="card-title">Edit Profile</h2>
                <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name: </span>
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
                    <span className="label-text">Last Name: </span>
                  </div>
                  <input 
                  type="text" 
                  placeholder="Type here" 
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Profile Image: </span>
                  </div>
                  <input 
                  type="text" 
                  placeholder="Enter the image link here" 
                  className="input input-bordered w-full max-w-xs"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">About: </span>
                  </div>
                  <input 
                  type="text" 
                  placeholder="Type in your bio" 
                  className="input input-bordered w-full max-w-xs"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age: </span>
                  </div>
                  <input 
                  type="text" 
                  placeholder="Enter your age" 
                  className="input input-bordered w-full max-w-xs"
                  value={age}
                  onChange={(e) => setAge(e.target.value)} />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Gender: </span>
                  </div>
                  <input 
                  type="text" 
                  placeholder="Enter your gender" 
                  className="input input-bordered w-full max-w-xs"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)} />
                </label>
                </div>
                <div className="card-actions justify-center">
                  <button 
                  className="btn btn-outline btn-primary"
                  onClick={saveProfile}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-300 w-96 shadow-xl border hover:border-gray-700 my-32">
            <UserCard user={{firstName, lastName, photoURL, age, gender, skills, about}}/>
          </div>
          </div>
          {showToast && 
          <div className="toast toast-center toast-top">
            <div className="alert alert-success">
              <span>Changes saved successfully.</span>
            </div>
          </div>
          }
        </>
      )
}

export default EditProfile