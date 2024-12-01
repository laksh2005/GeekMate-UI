import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addconnections } from '../utils/connectionSlice';

const Network = () => {

  const connections= useSelector((store)=> store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () =>{
    try{
      const res = await axios.get(BASE_URL + "/user/requests/connections",{
        withCredentials: true,
      });
      dispatch(addconnections(res?.data?.data));
      console.log(res.data.data);
    }
    catch (err){
      //error case
    }
  }



  useEffect(()=>{
    fetchConnections();
  }, [])

  // if(!connections) return;
  // if(connections.length === 0) return <h1>No connections found</h1>;

  return (
          <div className="text-center my-10">
          <h1 className="text-bold text-white text-3xl mb-12">My Network 🌐</h1>
          {connections.map((connection, index) => {
            const { firstName, lastName, photoURL, age, gender, about } = connection;

            return (
              <div key={index} className=" flex m-4 p-4 rounded-lg bg-base-200 hover:bg-base-300 w-1/2 mx-auto my-5">
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
              </div>
            );
          })}
        </div>
  );
};

export default Network