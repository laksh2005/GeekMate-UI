import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { useDispatch } from "react-redux";
import {removeUserFromFeed} from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
    const { _id, firstName, lastName, age, gender, about, skills } = user;

    const handleSendRequest = async (status, userId) =>{
      try{
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true});
        dispatch(removeUserFromFeed(userId));
      }
      catch(err){}
    }

    return (
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img src={user.photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{`${age}, ${gender}`}</p>
          <p>{skills.join(" , ")}</p>
          <p>{about}</p>

          <div className="card-actions justify-center my-4">
            <button className="btn btn-outline btn-success" onClick={() => handleSendRequest("interested", _id)}>Add</button>
            <button className="btn btn-outline btn-error" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
           </div>
        </div>
       </div>
  )
}

export default UserCard