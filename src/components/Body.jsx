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

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) return;
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
        console.error(err);
      }
    };
    fetchUser();
  }, [dispatch, navigate, userData]);

  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>
        <Footer />
    </div>
  )
}

export default Body