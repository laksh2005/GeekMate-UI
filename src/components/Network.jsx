import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addconnections } from '../utils/connectionSlice';
import gsap from 'gsap';

const Network = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const connectionRefs = useRef([]); 

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/connections', {
        withCredentials: true,
      });
      dispatch(addconnections(res?.data?.data));
      console.log(res.data.data);
    } catch (err) {
      // Error case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (connectionRefs.current) {
      connectionRefs.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: -20 }, 
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.2, 
              ease: 'power2.out',
            }
          );
        }
      });
    }
  }, [connections]);

  return (
    <div className="text-center my-10">
      <h1 className="text-extrabold text-3xl mb-12">My Network 🌐</h1>
      {Array.isArray(connections) &&
        connections.map((connection, index) => {
          const { firstName, lastName, photoURL, age, gender, about } = connection;

          return (
            <div
              key={index}
              ref={(el) => (connectionRefs.current[index] = el)} 
              className="flex m-4 p-4 rounded-lg bg-base-200 hover:bg-base-300 w-1/2 mx-auto my-5"
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
                  {firstName + ' ' + lastName}
                </h2>
                {age && gender && <p>{age + ', ' + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Network;
