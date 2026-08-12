import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "../components/UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState((user?.skills || []).join(", "));

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!error && !success) return;

    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, success]);

  if (!user) {
    return null;
  }

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.patch(
        "http://localhost:3000/profile/edit",
        {
          firstName,
          lastName,
          age: age === "" ? undefined : Number(age),
          gender,
          photoUrl,
          about,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 my-10 px-4">
      <div className="card bg-base-300 w-full max-w-2xl shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Profile</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <label className="mb-1 block text-sm">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input w-full focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Last Name</label>
              <input
                type="text"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                className="input w-full focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Email ID</label>
              <input
                type="text"
                value={user.emailId}
                disabled
                className="input w-full focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input w-full focus:outline-none"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select w-full focus:outline-none"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm">Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input w-full focus:outline-none"
                placeholder="Enter photo URL"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea w-full focus:outline-none"
                placeholder="Tell us about yourself"
                maxLength={150}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm">Skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input w-full focus:outline-none"
                placeholder="Comma separated, e.g. React, Node.js"
              />
            </div>
          </div>

          <div className="card-actions mt-6 justify-center">
            <button className="btn btn-primary" onClick={handleSave}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />

      <div className="toast toast-top toast-center">
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
