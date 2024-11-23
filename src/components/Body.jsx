import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from './Footer'
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import axios from "axios"

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store)=> store.user);

  //we are making with fetchUser so that the user doesn't log out after we refresh the page
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (

    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body