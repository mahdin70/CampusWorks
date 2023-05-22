import TopBar from "../TopBar";
import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../Footer";
import avatar from "../../assets/avatar.png";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");

  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("http://localhost:8080/api/resources", config)
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const resourcesResponse = await axios.get(
          "http://localhost:8080/api/resources",
          config
        );

        const currentUserResponse = await axios.get(
          "http://localhost:8080/api/getcurrentuser",
          config
        );

        if (isMounted) {
          setResources(resourcesResponse.data);
          setFilteredResources(resourcesResponse.data);
          setCurrentUser(currentUserResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to cancel any pending fetch requests
      isMounted = false;
    };
  }, []);

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    return new Date(date).toLocaleString("en-GB", options);
  };

  const [showMore, setShowMore] = useState([]);

  const handleShowMoreToggle = (resourceId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [resourceId]: !prevState[resourceId],
    }));
  };

  const handleDomainFilterChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  const handleSearch = () => {
    if (selectedDomain !== "") {
      const filtered = resources.filter(
        (resource) => resource.resourceDomain === selectedDomain
      );
      setFilteredResources(filtered);
    } else {
      setFilteredResources(resources);
    }
  };

  return (
    <>
      <TopBar />
      <main className="pt-20 bg-gray-100 min-h-screen">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 px-4 py-4">
            <div className="mb-4">
              <label
                htmlFor="domainFilter"
                className="block mb-2 text-md font-semibold text-gray-900"
              >
                Filter by Domain:
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
          <div className="w-full md:w-3/4 px-4 py-4">
            <div className="flex-col items-center justify-center">
              {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                  <div
                    className="bg-white rounded-lg border-2 border-cyan-700 shadow p-6 mb-4 flex items-start resource-container hover:shadow-md hover:border-teal-500 hover:border-3"
                    key={resource._id}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <p className="font-bold text-xl text-blue-600 mr-2">
                          {resource.userName}
                        </p>
                        <p className="text-gray-600 font-semibold">
                          Posted at {formatDate(resource.datePosted)}
                        </p>
                      </div>
                      <h2 className="font-bold text-xl mb-2">
                        {resource.resourceName}
                      </h2>
                      <div className="inline-block mb-2">
                        <div className="rounded bg-cyan-900 text-white px-2 py-1 text-sm inline-flex items-center">
                          <span className="whitespace-no-wrap">
                            {resource.resourceDomain}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-gray-700 font-semibold whitespace-pre-line ${
                          showMore[resource._id]
                            ? ""
                            : "max-h-20 overflow-hidden"
                        }`}
                      >
                        {resource.resourceDescription}
                      </p>
                      {resource.resourceDescription.length > 120 && (
                        <button
                          className="font-bold text-cyan-700"
                          onClick={() => handleShowMoreToggle(resource._id)}
                        >
                          {showMore[resource._id] ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg border-2 border-red-500 shadow p-6 mb-4 mt-10 flex items-center justify-center">
                  <p className="text-gray-700 font-bold">
                    No Resources Available
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

export default Resources;
