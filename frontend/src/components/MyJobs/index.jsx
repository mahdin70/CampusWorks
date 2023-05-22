import TopBar from "../TopBar";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";

import {
  FaEye,
  FaComment,
  FaCheckCircle,
  FaClock,
  FaTrash,
} from "react-icons/fa";
const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isCard, setIsCard] = useState(false);
  const [Index, setindex] = useState([]);
  const [username, setUsername] = useState("");
  const [proposals, setProposals] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [userinfo, setUserInfo] = useState({});
  const [userprofile, setUserProfile] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [thisProposal, setThisProposal] = useState({});

  


  const handleDecline = async (proposalId) => {
    const data = {
      id: proposalId,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/proposal/delete`,
        data
      );
      window.location.reload();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = async ({ jobId, proposalId }) => {
    const data = {
      jobId: jobId,
      proposalId: proposalId,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/proposal/accept`,
        data
      );
      window.location.reload();

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProposal = async ({ email, proposalId }) => {
    setIsLoading(true);

    const data = {
      email: email,
    };

    try {
      // Fetching username
      const usernameResponse = await axios.get(
        "http://localhost:8080/api/getUsername/userposted",
        { params: data }
      );
      const { name } = usernameResponse.data;
      setUsername(name);
      console.log(name);

      // Fetching user profile
      const userProfileResponse = await axios.get(
        "http://localhost:8080/api/userprofile/find",
        { params: data }
      );
      setUserProfile(userProfileResponse.data);
      console.log(userprofile);

      // Fetching user info
      const userInfoResponse = await axios.get(
        "http://localhost:8080/api/user_info/find",
        { params: data }
      );
      setUserInfo(userInfoResponse.data);
      console.log(userinfo);

      //set proposal by index
      const proposal = proposals.find(
        (proposal) => proposal._id === proposalId
      );
      setThisProposal(proposal);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsModalVisible(true);
    }
  };

  const handleOpenChat = async ({ user_email, receiver_email }) => {
    setIsLoading(true);
  
    try {
      // Get the user ID for the sender
      const res = await axios.get("http://localhost:8080/api/getuser/email", {
        params: {
          user_email: user_email,
        },
      });
  
      const userID = res.data.userId;
      console.log(res);
  
      // Get the user ID for the receiver
      const res1 = await axios.get("http://localhost:8080/api/getuser/email", {
        params: {
          user_email: receiver_email,
        },
      });
  
      const receiverID = res1.data.userId;
      console.log(res1);
  
      // Check if a conversation already exists between sender and receiver
      const conversationRes = await axios.get("http://localhost:8080/api/chat", {
        params: {
          senderId: userID,
          receiverId: receiverID,
        },
      });
  
      let conversationID;
      if (conversationRes.data.length > 0) {
        // Conversation already exists, retrieve the conversation ID
        conversationID = conversationRes.data[0]._id;
        console.log("Conversation already exists. Conversation ID:", conversationID);
      } else {
        // Create a new conversation
        const data = {
          senderId: userID,
          receiverId: receiverID,
        };
  
        const url = "http://localhost:8080/api/chat";
        const response = await axios.post(url, data);
        conversationID = response.data._id;
        console.log("New conversation created. Conversation ID:", conversationID);
      }
      window.location.href = `http://localhost:3000/chat/${conversationID}`;
      
   } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const data = {
        id: jobId,
      };

      const response = await axios.post(
        "http://localhost:8080/api/jobs/delete",
        data
      );
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBtnClick = async ({ job, index }) => {
    setIsCard(true);
    setindex(index);

    //setIsLoading(true);
    try {
      const data = {
        jobId: job._id,
      };
      const response = await axios.post(
        `http://localhost:8080/api/proposal/getproposals`,
        data
      );
      setProposals(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://localhost:8080/api/myjobs", config)
      .then((response) => {
        setJobs(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <TopBar />

      <main className="pt-20 bg-gray-100 min-h-screen">
        <div class="flex flex-col">
          <div className="flex min-w-screen items-center justify-center bg-gradient-to-r from-green-500 to-cyan-500 h-36">
            <h1 className="font-poppins text-black text-4xl font-bold animate-pulse">
              You Have Posted {jobs.length} {jobs.length > 1 ? "Jobs" : "Job"}
              <span className="animate-bounce ml-2">💼</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center">
            <div className="w-full md:w-1/2 px-4 py-3">
              {jobs.map((job, index) => (
                <div
                  className="bg-white rounded-lg shadow p-4 mb-4"
                  key={job._id}
                >
                  <h2 className="font-bold text-lg mb-2">{job.jobName}</h2>
                  <p className="text-gray-600">{job.jobDescription}</p>
                  <div className="flex flex-wrap justify-between mt-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-bold">Job Type:</span>{" "}
                        {job.jobDuration}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-bold">Rate/Price:</span>{" "}
                        {job.price}
                      </p>
                    </div>
                    {job.keywords.length > 0 && (
                      <div className="py-1">
                        <span className="font-bold text-gray-700">
                          Keywords:
                        </span>
                        <div className="flex flex-wrap mt-1">
                          {job.keywords.map((keyword, index) => (
                            <span
                              className="mr-2 mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-800 font-medium text-sm"
                              key={index}
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <button
                      onClick={() => handleBtnClick({ job, index })}
                      className="block mt-4 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-green-500 hover:bg-gradient-to-r hover:from-blue-400 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm"
                    >
                      View Proposals
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="block mt-4 mx-2 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <FaTrash className="mr-2" />
                      Delete this job
                    </button>
                  </div>
                  <div>
                    <Transition
                      show={isCard && Index === index}
                      enter="transition-all duration-500 ease-out transform"
                      enterFrom="-translate-y-8 opacity-0"
                      enterTo="translate-y-0 opacity-100"
                      leave="transition-all duration-500 ease-in transform"
                      leaveFrom="translate-y-0 opacity-100"
                      leaveTo="-translate-y-8 opacity-0"
                    >
                      <div className="mt-2 w-full items-center justify-center ">
                        <div className="flex flex-col">
                          <div className="w-full">
                            <h2 className="text-lg font-bold">
                              {proposals.length > 0
                                ? "Proposals"
                                : "No proposals received for this job"}
                            </h2>
                            {/* List of people who have sent proposals */}
                            {proposals.map((proposal, index) => (
                              <div className="flex items-center justify-between my-4 p-4 bg-gradient-to-r from-neutral-900 to-zinc-700 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold text-emerald-300">
                                  {proposal.status === true ? (
                                    <FaCheckCircle color="green" />
                                  ) : (
                                    <FaClock color="green" />
                                  )}{" "}
                                  {index + 1}{" "}
                                </h3>
                                <p className="text-lg text-teal-200 font-medium">
                                  {proposal.senderEmail}
                                </p>
                                <div className="flex flex-row">
                                  {isLoading ? (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleViewProposal({
                                            email: proposal.senderEmail,
                                            proposalId: proposal._id,
                                          })
                                        }
                                        className="mx-1 flex items-center justify-center px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      >
                                        <div
                                          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                          role="status"
                                        >
                                          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-[rect(0,0,0,0)]">
                                            Loading...
                                          </span>
                                        </div>
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleViewProposal({
                                            email: proposal.senderEmail,
                                            proposalId: proposal._id,
                                          })
                                        }
                                        className="mx-1 flex items-center justify-center px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      >
                                        <FaEye className="mr-2" />
                                        View Proposal
                                      </button>
                                    </>
                                  )}

                                  <button
                                    onClick={() => handleOpenChat(
                                      {
                                        user_email: proposal.senderEmail,
                                        receiver_email: proposal.receiverEmail,
                                      }
                                    )}
                                    className="mx-1 flex items-center justify-center px-4 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                  >
                                    <FaComment className="mr-2" />
                                    Message
                                  </button>
                                </div>

                                <div>
                                  {isModalVisible && (
                                    <div className="fixed inset-0 bg-gray-100 bg-opacity-20 flex items-center justify-center ">
                                      <div className="bg-stone-900  rounded-lg shadow-lg p-6 w-full">
                                        <div className="flex flex-col w-full">
                                          <div className="rounded-lg border-2 border-white pl-3 py-1">
                                            <h1 className="text-lg font-medium text-white">
                                              Job: {job.jobName}
                                            </h1>
                                          </div>

                                          <div className="mt-3 flex flex-row w-full">
                                            <div className="rounded-lg border-2 border-white w-2/5 mr-1">
                                              <div className=" bg-white pl-3 py-1">
                                                <h1 className="text-lg font-bold">
                                                  Profile
                                                </h1>
                                              </div>

                                              <div className="py-2 pl-3 pr-2">
                                                <h1 className="text-base font-medium text-white">
                                                  Name: {username}
                                                </h1>
                                                <h2 className="text-base font-normal text-white">
                                                  Email: {userinfo.email}
                                                </h2>
                                                <h2 className="text-base font-normal text-white">
                                                  Category:{" "}
                                                  {userinfo.usercategory}
                                                </h2>
                                                <h2 className="text-base font-normal text-white">
                                                  Department:{" "}
                                                  {userinfo.department}
                                                </h2>

                                                <div className="mt-2 ">
                                                  <h3 className="text-lg font-medium text-white">
                                                    Achievements:
                                                  </h3>
                                                  <p className="text-base text-white">
                                                    {userprofile &&
                                                    userprofile.Achievements
                                                      ? userprofile.Achievements
                                                      : "Profile not completed"}
                                                  </p>
                                                  <h3 className="text-lg font-medium text-white">
                                                    Education:
                                                  </h3>
                                                  <p className="text-base text-white">
                                                    {userprofile &&
                                                    userprofile.Education
                                                      ? userprofile.Education
                                                      : "Profile not completed"}
                                                  </p>
                                                  <h3 className="text-lg font-medium text-white">
                                                    Strength:
                                                  </h3>
                                                  <p className="text-base text-white">
                                                    {userprofile &&
                                                    userprofile.Strength
                                                      ? userprofile.Strength
                                                      : "Profile not completed"}
                                                  </p>
                                                  <h3 className="text-lg font-medium text-white">
                                                    Experience:
                                                  </h3>
                                                  <p className="text-base text-white">
                                                    {userprofile &&
                                                    userprofile.Experience
                                                      ? userprofile.Experience
                                                      : "Profile not completed"}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="rounded-lg border-2 border-white w-3/5 ml-1 flex flex-col">
                                              <div className="bg-stone-900 py-1 pl-3 rounded-lg">
                                                <h1 className="text-lg font-medium text-white">
                                                  Proposal
                                                </h1>
                                              </div>
                                              <div className="bg-gray-100 flex-grow  ">
                                                <div className="pl-2 pt-2">
                                                  {job.jobDuration ===
                                                  "Hourly" ? (
                                                    <h1 className="text-normal font-bold">
                                                      Proposed rate:{" "}
                                                      {
                                                        thisProposal.proposedPrice
                                                      }{" "}
                                                      \hr
                                                    </h1>
                                                  ) : (
                                                    <h1 className="text-normal font-bold">
                                                      Proposed price:{" "}
                                                      {
                                                        thisProposal.proposedPrice
                                                      }
                                                    </h1>
                                                  )}
                                                </div>
                                                <div className="pl-2 pt-2">
                                                  <h2 className="font-bold text-lg mb-2">
                                                    Cover Letter
                                                  </h2>
                                                  <div className="overflow-auto max-h-96">
                                                    <pre className="whitespace-pre-wrap">
                                                      <p className="">
                                                        {
                                                          thisProposal.coverLetter
                                                        }
                                                      </p>
                                                    </pre>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex justify-end">
                                          <button
                                            onClick={() =>
                                              setIsModalVisible(false)
                                            }
                                            className="block mt-4 mx-3 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-teal-500 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
                                          >
                                            Go back
                                          </button>
                                          <button
                                            onClick={() => {
                                              handleDecline(thisProposal._id);
                                            }}
                                            className="block mt-4 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium mr-2 rounded-md text-white bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-r hover:from-red-400 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm"
                                          >
                                            Decline
                                          </button>

                                          <button
                                            onClick={() => {
                                              handleAccept({
                                                jobId: job._id,
                                                proposalId: thisProposal._id,
                                              });
                                            }}
                                            className="block mt-4 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:bg-gradient-to-r hover:from-purple-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm"
                                          >
                                            Accept
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default MyJobs;
