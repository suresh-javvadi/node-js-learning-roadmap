import axios from "axios";
import React, { useEffect, useState } from "react";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections", {
        withCredentials: true,
      });
      setConnections(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex justify-center my-6 px-4">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Connections</h2>

        {connections.length === 0 ? (
          <p className="text-center text-base-content/60">
            No connections yet.
          </p>
        ) : (
          <ul className="list bg-base-300 rounded-box shadow-md divide-y divide-base-400">
            {connections.map((conn) => (
              <li
                className="list-row items-center hover:bg-base-200 transition-colors"
                key={conn?._id}
              >
                <img
                  className="size-20 rounded-full object-cover"
                  alt="Photo"
                  src={conn?.photoUrl}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">
                      {conn?.firstName} {conn?.lastName}
                    </span>
                    {conn?.age && conn?.gender && (
                      <span className="badge badge-outline badge-sm capitalize">
                        {conn.age} &middot; {conn.gender}
                      </span>
                    )}
                  </div>
                  <p className="text-sm opacity-70 line-clamp-2">
                    {conn?.about}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Connections;
