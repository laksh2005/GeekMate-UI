import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Invitations = () => {
  const requests = useSelector((store)=> store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () =>{

    try{
      const res = await axios.get(BASE_URL + "/user/requests/recieved",{withCredentials:true});

      dispatch(addRequests(res?.data?.data));
      console.log(res?.data?.data);

    } catch(err){
      //error case
    }
  }

  
  useEffect(()=>{
    fetchRequests()
  }, [])

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Invitations 📩</h1>
      {Array.isArray(requests) && requests.map((request) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } = request.fromUserID;
        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-outline btn-error mx-2">Reject</button>
              <button className="btn btn-outline btn-success mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Invitations;