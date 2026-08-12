import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (feed?.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 px-4 text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="text-2xl font-bold">No new users found</h1>
        <p className="text-base-content/60 max-w-sm">
          You've seen everyone for now. Check back later for new profiles.
        </p>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <UserCard user={feed?.[0]} />
      </div>
    )
  );
};

export default Feed;
