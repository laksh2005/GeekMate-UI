import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import gsap from 'gsap';

const Invitations = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const requestRefs = useRef([]);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", { withCredentials: true });
      dispatch(addRequests(res?.data?.data));
      console.log(res?.data?.data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    if (requestRefs.current) {
      requestRefs.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, delay: index * 0.2, ease: 'power2.out' }
          );
        }
      });
    }
  }, [requests]);

  return (
    <div className="text-center my-10">
      <h1 className="text-extrabold text-3xl mb-12">Invitations 📩</h1>
      {Array.isArray(requests) && requests.map((request, index) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } = request.fromUserID;
        return (
          <div
            key={_id}
            ref={(el) => (requestRefs.current[index] = el)}
            className="flex m-4 p-4 rounded-lg bg-base-200 hover:bg-base-300 w-1/2 mx-auto my-5"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="btn btn-outline btn-error"
                onClick={() => reviewRequest("rejected", request._id)}>
                Reject</button>

              <button
                className="btn btn-outline btn-success"
                onClick={() => reviewRequest("accepted", request._id)}>
                Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Invitations;
