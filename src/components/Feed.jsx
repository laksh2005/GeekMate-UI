import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import {BASE_URL} from '../utils/constants'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return; 
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      console.log("Feed API Response:", res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("Error Fetching Feed:", err?.response?.data);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length <= 0) {
    return <h1 className='flex justify-center text-red-600'>No New Users available!</h1>;
  }
  
  return (
    feed && feed[0] ? ( 
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    ) : (
      <div className='text-red-700 justify-center flex'>No feed data available...</div>
    )
  );
};

export default Feed;
