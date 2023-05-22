import React from 'react'
import TopBar from "../TopBar";
import Conversation from "../Conversation";
import Message from "../Message";
import { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';
import Footer from '../Footer';


const Chat = () => {
  const { conversationID } = useParams();
  const [currentChat, setCurrentChat] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  useEffect(() => {
    if (conversationID) {
      const currentConversation = conversations.find((c) => c._id === conversationID);
      if (currentConversation) {
        setCurrentChat(currentConversation);
      }
    }
  }, [conversationID, conversations]);

  useEffect(() => {
    socket.current =io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  
  useEffect(() => {
    socket.current.emit("addUser", currentUser);
    socket.current.on("getUsers", users => {
      console.log(users)
    });
  }, [currentUser]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
    axios.get('http://localhost:8080/api/getcurrentuserID', config)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      const getConversations = async () => {
        try {
          const res = await axios.get('http://localhost:8080/api/chat/' + currentUser);
          setConversations(res.data);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }
  }, [currentUser]);



  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser
    );
      console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: currentUser,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8080/api/message/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  return (
    <>
  
      <TopBar />
      <div className="messenger mt-20 ">

        <div className='flex flex-row w-full'>


          <div className='flex w-1/4'>

          
              <div className="chatMenu w-full h-screen  bg-gray-200">
              <div className="chatMenuWrapper ">
              <div className='pl-3 py-1 pt-3 h-14 bg-gradient-to-r from-emerald-700 to-cyan-600 '>
                <h1 className='text-white font-bold text-lg'>Open Conversation</h1>
              </div>
              {conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)} className='hover:bg-emerald-700 hover:text-white'>
                      <Conversation conversation={c} currentUser={currentUser} />
                      </div>
                  ))}
                  </div>
              </div>
          </div>


          <div className='flex w-2/4'>     
          <div className="chatBox w-full">
          <div className="chatBoxWrapper max-h-screen">
            {currentChat?
            <>
            <div className=' pl-3 pt-3 py-1 bg-emerald-600 '>
              <h1 className='text-white font-bold text-lg'><Conversation conversation={currentChat} currentUser={currentUser} /></h1>
            </div>
          <div className="chatBoxTop overflow-auto ">
          {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.senderId === currentUser} />
                      </div>
                    ))}
          </div>
          <div className="chatBoxBottom">
          <textarea
                      className="chatMessageInput bg-gray-200 p-3 h-20 m-3 w-80 border-2 border-emerald-700 rounded-lg focus:ring-2 focus:ring-cyan-600"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
          </div></> :(<span className='noConversationText'>Open a conversation to start a chat.</span>)}
        
          </div>
          </div>
        </div>
        
            <div className='flex w-1/4'> </div>


        </div> 
        </div>

        <Footer />
    </>
  );
}

export default Chat
