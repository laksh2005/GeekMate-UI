import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import gsap from "gsap";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    );
  }, [isLoginForm]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      console.log(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-300">
      <div
        className="w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-[1.02]"
        ref={formRef}
      >
        <div className="card bg-base-100 shadow-xl border border-primary/20 backdrop-blur-sm">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold justify-center">
              {isLoginForm ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-sm text-center text-base-content/70">
              {isLoginForm
                ? "Enter your credentials to continue"
                : "Fill in your details to get started"}
            </p>

            <div className="space-y-4 mt-4">
              {!isLoginForm && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="input input-bordered transition-all duration-200 focus:input-primary"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="input input-bordered transition-all duration-200 focus:input-primary"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered transition-all duration-200 focus:input-primary"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered transition-all duration-200 focus:input-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 card-actions justify-center">
              <button
                className="btn btn-primary w-full font-semibold tracking-wide 
                          transition-all duration-200 hover:shadow-lg 
                          disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={isLoginForm ? handleLogin : handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Please wait...</span>
                  </div>
                ) : (
                  <span>{isLoginForm ? "Sign In" : "Create Account"}</span>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsLoginForm((prev) => !prev)}
              className="btn btn-link btn-sm w-full text-base-content/70 hover:text-primary 
                         transition-colors duration-200 no-underline"
            >
              {isLoginForm
                ? "New to GeekMate? Create an account"
                : "Already have an account? Sign in"}
            </button>

            {error && (
              <div className="alert alert-error mt-4 animate-in fade-in slide-in-from-top-1">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
