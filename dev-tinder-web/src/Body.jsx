import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
