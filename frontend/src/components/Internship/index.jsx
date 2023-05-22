import TopBar from "../TopBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../Footer";

const Internship = () => {
  const [internship, setInternship] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [filteredInternship, setFilteredInternship] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [internshipResponse, currentUserResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/internships", config),
          axios.get("http://localhost:8080/api/getcurrentuser", config),
        ]);

        setInternship(internshipResponse.data);
        setFilteredInternship(internshipResponse.data);
        setCurrentUser(currentUserResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (lastDateToApply) => {
  const currentDate = new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const dateDifference = Math.floor(
    (new Date(lastDateToApply) - currentDate) / (1000 * 60 * 60 * 24)
  );
  const hoursDifference = Math.floor(
    (new Date(lastDateToApply) - currentDate) / (1000 * 60 * 60)
  );

  let daysRemaining;
  if (hoursDifference <= 0) {
    daysRemaining = "Last Date Passed";
  } else {
    const remainingDays = Math.floor(hoursDifference / 24);
    const remainingHours = hoursDifference % 24;
    daysRemaining = `Time Remaining To Apply | ${remainingDays} Day(s) ${remainingHours} Hour(s)`;
  }

  return {
    formattedDate: `${new Date(lastDateToApply).toLocaleString("en-GB", options)}`,
    daysRemaining,
  };
};


  const formatDate1 = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(date).toLocaleString("en-GB", options);
  };

  const [showMore, setShowMore] = useState({});

  const handleShowMoreToggle = (internshipId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [internshipId]: !prevState[internshipId],
    }));
  };

  const handleDomainFilterChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  const handleSearch = () => {
    if (selectedDomain !== "") {
      const filtered = internship.filter(
        (internship) => internship.internshipDomain === selectedDomain
      );
      setFilteredInternship(filtered);
    } else {
      setFilteredInternship(internship);
    }
  };

  return (
    <>
      <TopBar />
      <main className="pt-20 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row">

          <div className="md:w-1/4 px-4 py-4 rounded-md ml-5 mt-4">
            <div className="mb-4">
              <label
                htmlFor="domainFilter"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Filter by Domain :
              </label>
              <select
                id="domainFilter"
                name="domainFilter"
                value={selectedDomain}
                onChange={handleDomainFilterChange}
                className="block w-full py-2.5 px-4 text-sm font-semibold text-gray-900 bg-white border-2 border-cyan-700 rounded-md focus:outline-none focus:border-cyan-700"
              >
                <option value="">All Domains</option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Electrical and Electronics Engineering">
                  Electrical and Electronics Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Business and Management">
                  Business and Management
                </option>
                <option value="Others">Others</option>
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="w-full py-2.5 px-4 text-md font-semibold text-black bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-md focus:outline-none"
            >
              Search
            </button>
          </div>



          <div className="w-full md:w-3/4 px-4 py-4 mr-6">
            <div className="flex-col items-center justify-center">
              {filteredInternship.length > 0 ? (
                filteredInternship.map((internship) => (
                  <div
                    className="bg-white rounded-lg border-2 border-cyan-700 shadow p-6 mb-4 flex items-start resource-container hover:shadow-md hover:border-teal-500 hover:border-3"
                    key={internship._id}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <p className="font-semibold text-blue-600 text-lg mr-2">
                          {internship.userName}
                        </p>
                        <p className="text-gray-800 font-semibold text-md">
                          Posted at {formatDate1(internship.datePosted)}
                        </p>
                      </div>
                      <h2 className="font-bold text-2xl mb-2">
                        {internship.positionName}
                      </h2>

                      <div className="inline-block mb-2 flex">
                        <div className="rounded bg-gradient-to-r from-green-500 to-cyan-500 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            {internship.companyName}
                          </span>
                        </div>

                        <div className="rounded bg-cyan-900 text-white px-2 py-1 text-md inline-flex items-center">
                          <span className="whitespace-no-wrap font-semibold">
                            Apply at | {internship.applyMedium}
                          </span>
                        </div>
                      </div>

                      <div className="inline-block mb-2 flex">
                        <div className="rounded bg-violet-400 text-black px-2 py-1 text-md inline-flex items-center mr-2">
                          <span className="whitespace-no-wrap font-semibold">
                            Last Date to Apply |{" "}
                            {
                              formatDate(internship.lastDateToApply)
                                .formattedDate
                            }
                          </span>
                        </div>

                        <div className="rounded bg-red-500 text-white px-2 py-1 text-md inline-flex items-center">
                          <span className="whitespace-no-wrap font-semibold">
                            {
                              formatDate(internship.lastDateToApply)
                                .daysRemaining
                            }
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-gray-700 font-semibold text-md whitespace-pre-line ${
                          showMore[internship._id]
                            ? ""
                            : "max-h-20 overflow-hidden"
                        }`}
                      >
                        {internship.description}
                      </p>

                      {internship.description.length > 120 && (
                        <button
                          className="font-bold text-cyan-700 text-lg"
                          onClick={() => handleShowMoreToggle(internship._id)}
                        >
                          {showMore[internship._id] ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg border-2 border-red-500 shadow p-6 mb-4 mt-10 flex items-center justify-center">
                  <p className="text-gray-700 font-bold">
                    No Internship Opportunity Available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Internship;
