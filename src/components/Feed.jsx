import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import gsap from 'gsap';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const dragAreaRef = useRef(null);
  const userCardRef = useRef(null); 

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      console.log('Feed API Response:', res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log('Error Fetching Feed:', err?.response?.data);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (userCardRef.current) {
      gsap.fromTo(
        userCardRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1, 
          y:0 ,
          delay: 1,
          duration: 2, 
          ease: 'power2.out', 
        }
      );
    }
  }, [feed]);

  if (!feed || feed.length <= 0) {
    return <h1 className="flex justify-center text-red-600">No New Users available!</h1>;
  }

  return (
    feed && feed[0] ? (
      <div
        ref={dragAreaRef}
        className="usercard flex justify-center my-7 relative min-h-[600px] pt-12"
      >
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full" id="ignore-zone"></div>
          <div className="w-1/2 h-full" id="add-zone"></div>
        </div>
        <div ref={userCardRef}>
          <UserCard user={feed[0]} dragAreaRef={dragAreaRef} />
        </div>
      </div>
    ) : (
      <div className="text-red-700 justify-center flex">No feed data available...</div>
    )
  );
};

export default Feed;
