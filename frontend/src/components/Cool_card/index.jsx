import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Cool_card = () => {
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");    

    useEffect(() => {
        setShow(true);
    }, []);

    useEffect(() =>{
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('http://localhost:8080/api/getUsername', config)
        .then(response => {
            setUsername(response.data.name);
          })
          .catch(error => {
            console.log(error);
          });
    }, []);

    return (
        <div className="mt-5 max-w-6xl mx-auto bg-green-600 rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
            <div className="absolute -top-16 -left-16 bg-green-400 h-60 w-60 rounded-full animate-bounce-slow"></div>
            <div className="absolute top-16 left-16 bg-green-400 h-40 w-40 rounded-full animate-bounce-fast"></div>
            <div className="absolute -bottom-20 -right-20 bg-green-400 h-72 w-72 rounded-full animate-bounce"></div>
            <div className="absolute top-24 right-24 bg-green-400 h-32 w-32 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-24 left-24 bg-green-400 h-48 w-48 rounded-full animate-pulse"></div>
        </div>
        
        <Transition
            show={show}
            enter="transition duration-1000 ease-in-out transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
        >
            <div className="px-9 py-7">
            <div className="flex flex-col items-center justify-between p-5">
                <div className="text-4xl font-bold text-black">
                Welcome, {username} ! 
                </div>
                <div className="text-3xl font-bold text-gray-800">
                {new Date().toLocaleDateString()}
                </div>
            </div>
            </div>
        </Transition>

        <div className="absolute right-0 bottom-0 p-8">
            <FaSearch className="w-12 h-12 text-white" />
        </div>
        </div>
    );
};

export default Cool_card;
