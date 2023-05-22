import TopBar from "../TopBar";
import Footer from "../Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userProfile, setUserProfile] = useState({});

  const [isBio, setIsBio] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isExperience, setIsExperience] = useState(false);
  const [isStrength, setIsStrength] = useState(false);
  const [isEducation, setIsEducation] = useState(false);
  const [isAchievements, setIsAchievements] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/userProfile",
          config
        );
        if (response.data.Bio) {
          setIsBio(true);
        }
        if (response.data.Result) {
          setIsResult(true);
        }
        if (response.data.Strength) {
          setIsStrength(true);
        }
        if (response.data.Experience) {
          setIsExperience(true);
        }
        if (response.data.Education) {
          setIsEducation(true);
        }
        if (response.data.Achievements) {
          setIsAchievements(true);
        }
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    axios
      .get("http://localhost:8080/api/user_info", config)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchUserProfile();
  }, []);

  return (
    <div className="bg-gray-100 h-full w-full flex-col px-10">
      <TopBar />

      <div className="max-w-3xl mx-auto min-h-screen mt-20 py-5">
        <div className="bg-gradient-to-r from-green-500 to-cyan-500 py-4 text-center text-black rounded-lg font-bold">
          <h1 className="text-xl px-6">
            Welcome to Your Profile Page <br />
            {userInfo.name}!
          </h1>
        </div>

        <div className="rounded-lg overflow-hidden mt-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-5 flex flex-col items-center mb-3">
            {userProfile.photo ? (
              <img
                src={`http://localhost:8080/api/images/${userProfile.photo}`}
                alt="avatar"
                className="w-32 h-32 rounded-full mb-5"
              />
            ) : (
              <img
                src={avatar}
                alt="default-avatar"
                className="w-32 h-32 rounded-full mb-5"
              />
            )}

            <h1 className="text-2xl font-medium mb-2">{userInfo.name}</h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-5 flex flex-col items-left mb-3">
            <p className="text-gray-800 font-semibold mb-1">Email: {userInfo.email}</p>
            <p className="text-gray-800 font-semibold mb-1">
              Department: {userInfo.department}
            </p>
            <p className="text-gray-800 font-semibold mb-1">Batch: {userInfo.batch}</p>

            {isBio && (
              <p className="text-gray-800 font-semibold mb-1">Bio: {userProfile.Bio}</p>
            )}

            {isResult && (
              <p className="text-gray-800 font-semibold mb-1">Result: {userProfile.Result}</p>
            )}

            {isStrength && (
              <p className="text-gray-800 font-semibold mb-1">
                Strength: {userProfile.Strength}
              </p>
            )}

            {isExperience && (
              <p className="text-gray-800 font-semibold mb-1">
                Experience: {userProfile.Experience}
              </p>
            )}

            {isEducation && (
              <p className="text-gray-800 font-semibold mb-1">
                Education: {userProfile.Education}
              </p>
            )}

            {isAchievements && (
              <p className="text-gray-800 font-semibold mb-1">
                Achievements: {userProfile.Achievements}
              </p>
            )}

            <Link
              to="/EditProfile"
              className="rounded-md bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 text-black text-center font-bold hover:bg-teal-700 focus:border-green-600 focus:outline-none focus:ring mt-4"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
