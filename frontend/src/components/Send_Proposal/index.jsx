import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaTimesCircle } from 'react-icons/fa';
const Send_Proposal = ({jobs, onClose}) =>{

    const [isJobHourly, setIsJobHourly] = useState(false);
    const [isJobFixed, setIsJobFixed] = useState(false);
    const [username, setUsername] = useState("");

    //const [data, setdata] = useState({ senderEmail: "", receiverEmail: "", jobId : "", proposedPrice: "", coverLetter: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [proposedPrice, setProposedPrice] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [isError, setIsError] = useState(false);



    const handleSubmit = async(e) =>{
        e.preventDefault();
        setIsLoading(true);
        
        const updatedData = ({
            proposedPrice: proposedPrice,
            coverLetter: coverLetter,
            jobId: jobs._id,
            receiverEmail: jobs.userEmail,
            senderEmail: currentUser,
        });
        console.log(updatedData);
        try{  
            const url = "http://localhost:8080/api/proposal";
            const { data: res } = await axios.post(url, updatedData);
            console.log(updatedData);
            
            setIsSuccessful(true);
            setIsError(false);
        }catch(error){
            if(
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                console.log(error);
            }
            setIsError(true);
            setIsSuccessful(false);
        }finally{
            setIsModalVisible(true);
            setIsLoading(false);
        }
    };

    const handleCoverLetter = (event) =>{
        setCoverLetter(event.target.value);
    }

    const handleProposedPrice = (event) =>{
        setProposedPrice(event.target.value);
    }

    const handleJobDuration = () =>{
        if(jobs.jobDuration === "Hourly"){
            setIsJobFixed(false);
            setIsJobHourly(true);
        }else if(jobs.jobDuration === "Fixed"){
            setIsJobFixed(true);
            setIsJobHourly(false);
        }
    }

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

    useEffect(() =>{
        handleJobDuration();
    }, []);


    useEffect(() => {
        const data = {
            email : jobs.userEmail,
        }
        axios.get('http://localhost:8080/api/getUsername/userposted', {params: data})
        .then(response => {
            const { name } = response.data;
            setUsername(name);
          })
          .catch(error => {
            console.log(error);
          });    
    }, []);

    return(
        <>
            <form onSubmit={handleSubmit}>
            <div className="fixed inset-0 bg-gray-100 bg-opacity-20 flex items-center justify-center ">
            <div className=" bg-stone-900  opacity-90 rounded-lg shadow-lg p-6 w-2/3">
                <h1 className="text-xl font-medium mb-4 text-white">Submit a proposal</h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="rounded-lg bg-transparent border-2 border-green-100 text-white justify-items-start pl-3 pb-2 pt-2 w-full my-2">
                        <h2 className="text-lg font-bold ">{jobs.jobName}</h2>
                    </div>

                    <div className="flex flex-row w-full">
                        <div className="rounded-lg bg-transparent text-white justify-items-start pt-1 pl-3 pb-2 w-5/12 my-2 mr-1">
                            <div className = "mb-2">
                                <h2 className="text-base font-bold">Posted By</h2>
                            </div>
                            <div className = "mb-1">
                                <p className="text-lg font-medium">{username}</p>
                            </div>
                            <div className = "mb-2">
                                <h2 className="text-base font-bold">Description</h2>
                            </div>
                            <div className = "">
                                <p className="text-base font-normal">{jobs.jobDescription}</p>
                            </div>

                            <div className="my-2">
                                <h2 className="text-base font-bold">Job Type</h2>
                            </div>

                            <div className="">
                                <p>{jobs.jobDuration}</p>
                            </div>

                            <div className="my-2">
                                <h2 className="text-base font-bold">{(isJobFixed)? "Price:" : "Hourly Rate: "}</h2>
                                <p className="text-base font-medium">{jobs.price}</p>
                            </div>
                        </div>

                        <div className="rounded-lg border border-green-200 bg-gray-200 justify-items-start pl-3 pb-5 w-full my-2 ml-1">
                            <div className="text-lg font-bold pt-2">Terms</div>
                            <div className = "mt-3 text-lg font-normal">How much would you like to get paid for this job?</div>
                            {isJobHourly && (
                                <div className="flex flex-row mt-3">
                                    <div className="mr-2">
                                        <h1 className="text-base font-medium">Hourly Rate:</h1>
                                    </div>

                                    <div className="">
                                        <input type="number"
                                        onChange={handleProposedPrice}
                                        value = {proposedPrice}
                                        name="proposedPrice" 
                                        required
                                        className="bg-gray-50 rounded border-2 pl-3 w-64 h-9 text-lg45 font-medium border-emerald-600 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="ml-3 font-bold">/hr</p>
                                    </div>
                                </div>
                            )}

                            {isJobFixed && (
                                <div className="flex flex-row mt-3">
                                    <div className="mr-2">
                                        <h1 className="text-base font-medium">Price:</h1>
                                    </div>

                                    <div className="">
                                        <input 
                                        onChange={handleProposedPrice}
                                        value = {proposedPrice}
                                        type="number"
                                        name="proposedPrice" 
                                        required
                                        className="bg-gray-50 rounded border-2 pl-3 w-64 h-9 text-lg45 font-medium border-emerald-600 focus:outline-none focus:ring-emerald-400 focus:border-emerald-400" />
                                    </div>

                                </div>
                            )}

                            <div className="mt-2 font-bold text-lg">Additional Details</div>

                            <div className="mt-2 font-medium text-base">Cover Letter</div>

                            <div className="mt-2 mr-2">
                                <textarea name="coverLetter" 
                                onChange={handleCoverLetter}
                                value = {coverLetter}
                                required
                                className="bg-gray-50 block py-2.5 border-2 rounded-lg px-0 w-full px-3 text-base font-normal text-gray-900 border-emerald-600 focus:outline-none focus:ring-emerald-400  focus:border-emerald-400  h-36  peer" 
                                 ></textarea>
                            </div>
                        </div> 

                    </div>

                </div>

                <div className="flex justify-end">
                    <button onClick={onClose} className="block mt-4 mx-3 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-green-500 to-teal-500 hover:bg-gradient-to-r hover:from-green-400 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm">
                        Cancel
                    </button>
                    <button type="submit"
                    className="block mt-4 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:bg-gradient-to-r hover:from-purple-400 hover:to-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-sm">
                    Submit
                    </button>

                </div>
                
            </div>
            
            </div>
            </form>

            {isModalVisible && (
                        <div
                            id="successModal"
                            className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50"
                        >
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                <button
                                type="button"
                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="successModal"
                                onClick={() => setIsModalVisible(false)}
                                >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                    ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                                </button>

                                {isSuccessful && (

                                <div> 
                                    <div className="w-12 h-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-3.5">
                                    <svg
                                        aria-hidden="true"
                                        className="w-8 h-8 text-green-500 dark:text-green-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                        ></path>
                                    </svg>                             

                                    
                                    <span className="sr-only">Success</span>
                                    </div>
                                    
                                        <p class="mb-4 text-lg font-semibold text-gray-900 ">Proposal Sent Successfully.</p> 
                                </div>
                                    )}

                                {isError && (

                                <div>                              
                                    <div className="w-12 h-12 rounded-full  p-2 flex items-center justify-center mx-auto mb-3.5">
                                    <FaTimesCircle size={40} color="red"/>
                                    <span className="sr-only">Error</span>
                                    </div>
                                    
                                        <p class="mb-4 text-lg font-semibold text-gray-900 ">Error Sending Proposal.</p> 
                                </div>
                                    )}  
                                    <button 
                                    data-modal-toggle="successModal" 
                                    type="button" 
                                    onClick={() =>{
                                        setIsModalVisible(false);
                                        
                                        onClose();
                                    } }
                                    class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-emerald-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 0">
                                        Continue
                                    </button>
                                </div>
                                </div>
                            
                        </div>)}
        </>
    );
    
}

export default Send_Proposal;