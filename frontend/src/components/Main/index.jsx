import TopBar from "../TopBar";
import Footer from "../Footer";
import avatar from "../../assets/avatar.png";
import job_search from "../../assets/job_search.png";
import write from "../../assets/write.png";
import { Link } from "react-router-dom";
import { FaEnvelope, FaInbox, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserFriends, FaBriefcase, FaSearch } from "react-icons/fa";
const Main = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          "http://localhost:8080/api/userProfile",
          config
        );
        setUserProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://localhost:8080/api/user_info", config)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-gray-100 h-full w-full ">
      <div className="fixed w-full z-10 top-0">
        <TopBar />
      </div>

      <div className="flex flex-col">
        <div className="mt-20">
          <div className="flex flex-wrap items-center justify-center bg-gradient-to-r from-green-500 to-cyan-500 h-80">
            <div className="mx-20 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="my-1 mb-10 flex items-center justify-center">
                  <h1 className="font-poppins text-black text-6xl font-bold">
                    CampusWorks
                  </h1>
                </div>
                <div className="flex items-center justify-center">
                  <p className="font-poppins text-gray-700 font-poppins text-3xl font-bold text-center">
                    Connecting IUT Students with Opportunities
                    <br />
                    Find Freelance Jobs and Internships from Your Peers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center flex-wrap py-1 -mt-9">
        <div className="flex-1 m-2 py-1">
            <div class="rounded-xl bg-white shadow-lg">
              <div class="flex flex-wrap items-center justify-center w-full px-3 pt-3 bg-gradient-to-r from-green-500 to-cyan-500">
                <h2 class="font-poppins mb-4 text-lg font-bold text-black">Your Profile</h2>
              </div>

              <div class="flex flex-wrap items-center justify-center">
                <div class="flex flex-col">
                  <div class="flex flex-wrap items-center justify-center px-5 py-5">
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
                  </div>

                  <div class="flex flex-wrap items-center justify-center px-5 py-1">
                    <a href="" className="font-medium">
                      {userInfo.name}
                    </a>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap">
                <div class="flex flex-col py-5">
                  <div class="flex flex-row">
                    <div className="flex-wrap pl-5">
                      <h1 class="font-medium">Email:</h1>
                    </div>
                    <div className="flex-wrap pl-6">
                      <h1 className="font-normal">{userInfo.email}</h1>
                    </div>
                  </div>

                  <div class="flex flex-row">
                    <div className="flex-wrap pl-5">
                      <h1 class="font-medium">Department:</h1>
                    </div>
                    <div className="flex-wrap pl-6">
                      <h1 className="font-normal">{userInfo.department}</h1>
                    </div>
                  </div>

                  <div class="flex flex-row">
                    <div className="flex-wrap pl-5">
                      <h1 class="font-medium">Batch:</h1>
                    </div>
                    <div className="flex-wrap pl-6">
                      <h1 className="font-normal">{userInfo.batch}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-auto m-2">
            <div className="flex flex-col items-center justify-center ">
              <div className="bg-gradient-to-r from-emerald-50 to-cyan-100 p-8 rounded-lg shadow-md flex flex-col items-center w-4/5">
                <div className="flex items-center justify-center rounded-full w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 text-black mb-6">
                  <FaUserFriends className="text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Find Your Freelance Job</h2>
                <p className="text-gray-600 text-center mb-6">
                  Looking for an opportunity? Browse our Freelance Job/Internships listings
                  and find your's one today!
                </p>

                <div class="flex flex-row">
                  <Link
                    to="/Jobs"
                    className="flex items-center mr-2 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold rounded-lg px-8 py-4 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500"
                  >
                    <FaBriefcase className="mr-2" />
                    Browse all Jobs
                  </Link>

                  <Link
                    to="/search_results"
                    className="flex items-center mr-2 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold rounded-lg px-8 py-4 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500"
                  >
                    <FaSearch className="mr-2" />
                    Search for Jobs
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-10">
              <div className="bg-gradient-to-r from-emerald-50 to-cyan-100 p-8 rounded-lg shadow-md flex flex-col items-center w-4/5">
                <div className="flex items-center justify-center rounded-full w-16 h-16 bg-gradient-to-r from-green-500 to-cyan-500 text-black mb-6">
                  <FaPlus className="text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Post New Job</h2>
                <p className="text-gray-600 text-center mb-6">
                  Share your latest Jobs that you want to get done by your peers <br/>
                  Have Impact on them and help them to grow.
                </p>
                <Link
                  to="/postjob"
                  className="flex items-center mr-2 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold rounded-lg px-8 py-4 hover:bg-green-600 focus:outline-none focus:ring focus:border-green-500"
                >
                  <FaPlus className="mr-2" />
                  Post Job
                </Link>
              </div>
            </div>
          </div>

           <div className="flex-1 m-2 mx-2">
            <div class="rounded-xl bg-white shadow-lg">
              <div class="flex flex-wrap w-full px-3 pt-3 bg-gradient-to-r from-green-500 to-cyan-500 justify-center">
                <h2 class="mb-4 text-lg font-bold text-black text-center">Inbox</h2>
              </div>

              <div class="flex flex-wrap ">
                  <div className="bg-white p-6 max-w-sm mx-auto flex items-center justify-center rounded-lg">
                    <div className="flex flex-col items-center justify-center ">
                      <div className="mb-2"><FaEnvelope size="42" color="green" /></div>
                      <div> 
                        <div className="flex justify-end">

                    <Link to="/chat">

                      <button className="bg-gradient-to-r from-green-500 to-cyan-500 p-8 text-black hover:bg-green-600  font-semibold py-2 px-4 rounded">
                        Click here to view your inbox
                      </button>
                    </Link>
                  </div>
                  </div>
                    </div>
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Main;
