import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      navigate("/feed");
    } catch (error) {
      setError(error.response?.data);
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="mb-1 block text-sm">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input w-full focus:outline-none"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input w-full focus:outline-none"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          )}

          <div className="mt-2">
            <label className="mb-1 block text-sm">Email ID</label>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input w-full focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-2">
            <label className="mb-1 block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <p className="text-error">{error}</p>

          <div className="card-actions mt-6 justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
          <p
            className="text-center text-sm mt-4 text-primary cursor-pointer hover:underline"
            onClick={() => {
              setIsLoginForm((value) => !value);
            }}
          >
            {isLoginForm ? "New user? Sign Up" : "Existing user? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
