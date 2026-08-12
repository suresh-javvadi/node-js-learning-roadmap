import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.patch(
        `http://localhost:3000/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex justify-center my-6 px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Connection Requests
        </h2>

        {requests?.length === 0 ? (
          <p className="text-center text-base-content/60">
            No Connection Requests yet.
          </p>
        ) : (
          <ul className="list bg-base-300 rounded-box shadow-md divide-y divide-base-400">
            {requests?.map((req) => (
              <li
                className="list-row items-center hover:bg-base-200 transition-colors"
                key={req?._id}
              >
                <img
                  className="size-20 rounded-full object-cover"
                  alt="Photo"
                  src={req?.fromUserId?.photoUrl}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {req?.fromUserId?.firstName} {req?.fromUserId?.lastName}
                    </span>
                    {req?.fromUserId?.age && req?.fromUserId?.gender && (
                      <span className="badge badge-outline badge-sm capitalize">
                        {req.fromUserId?.age} &middot; {req.fromUserId?.gender}
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-70 line-clamp-2">
                    {req?.fromUserId?.about}
                  </p>
                </div>
                <button
                  className="btn btn-square btn-ghost text-error"
                  onClick={() => reviewRequest("rejected", req?._id)}
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6 6l12 12M18 6l-12 12"></path>
                    </g>
                  </svg>
                </button>
                <button
                  className="btn btn-square btn-ghost text-success"
                  onClick={() => reviewRequest("accepted", req?._id)}
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </g>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Requests;
