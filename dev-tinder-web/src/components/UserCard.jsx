import React from "react";

const UserCard = ({ user }) => {
  console.log(user);
  const { photoUrl, firstName, lastName, about, age, gender } = user || {};
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="User Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about || "No description available."}</p>
        {age && gender && (
          <p>
            {age} years old, {gender}
          </p>
        )}{" "}
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
