import TopBar from "../TopBar";
import axios from 'axios';
import { useState, useEffect } from "react";
import Footer from "../Footer";
import Send_Proposal from "../Send_Proposal";

const Jobs = () =>{

    const [jobs, setJobs] = useState([]);
    const [currentUser, setCurrentUser] = useState("");
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
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:8080/api/jobs', config)
          .then(response => {
            setJobs(response.data);
            //console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }, []);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('http://localhost:8080/api/getcurrentuser', config)
        .then(response => {
            setCurrentUser(response.data);
          })
          .catch(error => {
            console.log(error);
          });
    }, []);
      
    return(
        <>
            <TopBar />
            <main className="pt-20 bg-gray-100 min-h-screen">

            <div class = "flex flex-col">

                <div className="flex min-w-screen items-center justify-center bg-gradient-to-r from-green-500 to-cyan-500 h-36">
                    <h1 className="font-poppins text-black text-4xl font-bold animate-pulse">
                        {jobs.length} Jobs and Counting!
                        <span className="animate-bounce ml-2">🚀</span>
                    </h1>
                </div>

                <div className="flex flex-wrap items-center justify-center"> 
                <div className="w-full md:w-1/2 px-4">
                    {jobs.map(job => (
                    <div className="bg-white rounded-lg shadow p-4 mb-4" key={job._id}>
                        <h2 className="font-bold text-lg mb-2">{job.jobName}</h2>
                        <p className="text-gray-600">{job.jobDescription}</p>
                        <div className="flex flex-wrap justify-between mt-4">
                        <div>
                            <p className="text-gray-600"><span className="font-bold">Job Type:</span> {job.jobDuration}</p>
                            <p className="text-gray-600"><span className="font-bold">Rate/Price:</span> {job.price}</p>
                        </div>
                        {job.keywords.length > 0 && (
                            <div className="py-1">
                            <span className="font-bold text-gray-700">Keywords:</span>
                            <div className="flex flex-wrap mt-1">
                                {job.keywords.map((keyword, index) => (
                                <span className="mr-2 mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-800 font-medium text-sm" key={index}>
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
                            {job.userEmail === currentUser ? "Job Posted by You" : "Apply Now"}
                            </button>
                        </div>
                        {isModalOpen && (
                            <Send_Proposal jobs = {thisJob} onClose = {handleCloseModal} />
                        )}
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

export default Jobs;