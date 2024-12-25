import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { Home, Edit, Users, HelpCircle } from 'lucide-react';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'synthwave');
  const themes = ['corporate', 'synthwave', 'valentine', 'forest', 'luxury'];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-200/80 backdrop-blur-md shadow-lg transition-all duration-300 sticky top-0 z-50">
      
      <div className="navbar-start flex gap-1 pt-4 px-12">
      <Link 
        to="/" 
        className="btn btn-ghost btn-circle hover:bg-primary/20 transition-colors tooltip" 
        data-tip="Feed"
      >
        <Home className="h-5 w-5" />
      </Link>

      <Link 
        to="/profile" 
        className="btn btn-ghost btn-circle hover:bg-primary/20 transition-colors tooltip" 
        data-tip="Edit Profile"
      >
        <Edit className="h-5 w-5" />
      </Link>

      <Link 
        to="/network" 
        className="btn btn-ghost btn-circle hover:bg-primary/20 transition-colors tooltip" 
        data-tip="Network"
      >
        <Users className="h-5 w-5" />
      </Link>

      <Link 
        to="/faqs" 
        className="btn btn-ghost btn-circle hover:bg-primary/20 transition-colors tooltip" 
        data-tip="FAQs"
      >
        <HelpCircle className="h-5 w-5" />
      </Link>
      </div>
      

  
      <div className="navbar-center flex-grow justify-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold hover:scale-105 transition-transform">
          <span className="text-primary">Geek</span>Mate
        </Link>
      </div>
  
      <div className="navbar-end flex items-center gap-x-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {theme === 'light' ? '🌙' : '👁️'}
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-52 mt-4">
            {themes.map((t) => (
              <li key={t}>
                <button className={`capitalize ${theme === t ? 'active' : ''}`} onClick={() => setTheme(t)}>
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
  
        {user && (
          <div className="dropdown dropdown-end px-4">
            <div className="flex items-center gap-x-8">
              <span className="hidden md:inline-block text-sm font-medium">
                Welcome, {user.firstName}
              </span>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt={`${user.firstName}'s profile`} src={user.photoURL} className="object-cover" />
                </div>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-200 rounded-box w-52 animate-in slide-in-from-top-2">
              <li className="menu-title pt-2">
                <span className="text-primary">Account</span>
              </li>
              <li>
                <Link to="/profile" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/network">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  My Network
                </Link>
              </li>
              <li>
                <Link to="/invitations">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Invitations
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button onClick={handleLogout} className="text-error hover:bg-error/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Navbar;