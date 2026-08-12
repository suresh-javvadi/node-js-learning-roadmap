import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { photoUrl, firstName, lastName, about, age, gender, _id } = user || {};
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
      <figure className="h-72 w-full">
        <img
          src={photoUrl}
          alt="User Photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body gap-2">
        <div className="flex items-center justify-between">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <span className="badge badge-outline capitalize">
              {age} &middot; {gender}
            </span>
          )}
        </div>

        <p className="text-sm text-base-content/70 line-clamp-3">
          {about || "No description available."}
        </p>

        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-outline btn-error flex-1"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary flex-1"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
