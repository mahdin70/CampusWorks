import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";


const Conversation = ({conversation,currentUser}) => { {
  const[user,setUser]=useState([]);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);
    console.log(friendId);
    const getUser = async () => {
      try {
        const res = await axios("http://localhost:8080/api/getuser/userID?userId=" + friendId);
        setUser(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <span className="conversationName">{user.name}</span>
    </div>
  );
};
};
export default Conversation;