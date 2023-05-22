import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import TopBar from "../TopBar";
import Cool_card from "../Cool_card";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Send_Proposal from "../Send_Proposal";
const Search_Results = () => {
  const [jobs, setJobs] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const [jobType, setJobType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [freqKeywords, setFreqKeywords] = useState([]);
  const freqKeywordsNames = freqKeywords.map((key) => key._id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thisJob, setThisJob] = useState("");

    const handleModalOpen = (job) =>{
        setThisJob(job);
        setIsModalOpen(true);
    }

    const handleCloseModal = () =>{
        setIsModalOpen(false);
    }

  useEffect(() => {
    const getKeywords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/jobs/getKeywords"
        );
        setFreqKeywords(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getKeywords();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = {
          keywords: keywords,
          jobType: jobType,
          minPrice: minPrice,
          maxPrice: maxPrice,
        };
        const response = await axios.get(
          `http://localhost:8080/api/jobs/search`,
          { params: data }
        );
        setJobs(response.data);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [keywords, jobType, minPrice, maxPrice]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://localhost:8080/api/getcurrentuser", config)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const newKeywords = query.split(" ").filter((keyword) => keyword !== "");
    setKeywords(newKeywords);
  };

  const handleKeywordClick = (event) => {
    setKeywords(event.target.value);
    console.log(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  return (
    <>
      <TopBar />
      <main className="pt-20 min-h-screen min-w-screen bg-gray-50">
        <div className="flex flex-col">
          <div className="w-full flex items-center justify-center">
            <div>
              <Cool_card />
            </div>
          </div>

          <div className="flex flex-row w-full">
            <div className="w-1/4 flex items-start justify-center pr-3 ml-3">
              <div className="bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg shadow p-4">
                <h2 className="font-bold mb-4 text-xl text-center">
                  Filter Jobs
                </h2>
                <label className="block font-semibold text-black mb-2">
                  Job Type :
                </label>
                <select
                  onChange={handleJobTypeChange}
                  className="block w-full border-gray-400 border rounded-md py-2 px-3 mb-3"
                >
                  <option value="">All</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Fixed">Fixed</option>
                </select>
                <label className="block font-semibold text-black mb-2">
                  Price Range :
                </label>
                <div className="flex">
                  <input
                    type="number"
                    onChange={handleMinPriceChange}
                    placeholder="Min"
                    className="w-1/2 mr-2 border-gray-400 border rounded-md py-2 px-3"
                  />
                  <input
                    type="number"
                    onChange={handleMaxPriceChange}
                    placeholder="Max"
                    className="w-1/2 border-gray-400 border rounded-md py-2 px-3"
                  />
                </div>
              </div>
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center px-3">
              <div className="mt-8 p-10 w-full rounded-lg shadow-lg bg-gradient-to-r from-green-500 to-cyan-500">
                <div className="flex flex-col">
                  <div className="flex flex-wrap mb-5 justify-center">
                    <FaSearch className="text-3xl text-black mx-2" />
                    <h1 className="text-black font-bold text-2xl">
                      Search By Keywords
                    </h1>
                  </div>

                  <div className="flex items-center justify-center">
                    <input
                      type="text"
                      onChange={handleSearch}
                      placeholder="Type here to start searching"
                      className="w-4/5 rounded-md border border-gray-400 px-4 py-2 focus:border-black focus:outline-none focus:ring"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-10 min-w-full items-center justify-center">
                {isLoading ? (
                  <div
                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <div className=" flex-wrap w-full items-center justify-center">
                    <div className="w-full px-4">
                      {jobs.map((job) => (
                        <div
                          className="bg-white rounded-lg shadow p-4 mb-4"
                          key={job._id}
                        >
                          <h2 className="font-bold text-lg mb-2">
                            {job.jobName}
                          </h2>
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

                          <div className="flex items-center justify-center  mt-4">
                            <button
                              type="submit"
                              className="block mt-4 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm"
                              disabled={job.userEmail === currentUser}
                            onClick={() =>handleModalOpen(job)}
                            >
                              {job.userEmail === currentUser
                                ? "Posted by You"
                                : "Apply Now"}
                            </button>
                            {isModalOpen && (
                            <Send_Proposal jobs = {thisJob} onClose = {handleCloseModal} />
                        )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-1/4 flex items-start justify-center pl-3 mr-3">
              <div className="w-full max-w-md mx-auto rounded-md shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-cyan-500">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-xl text-black mb-4">
                      Trending Keywords
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center -mx-2 mt-4">
                    {freqKeywordsNames.map((keyword) => (
                      <div
                        key={keyword}
                        className="px-2 py-1 mb-2 mr-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700"
                      >
                        <button
                          onClick={handleKeywordClick}
                          value={keyword}
                          className="text-sm font-medium"
                        >
                          {keyword}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Search_Results;
