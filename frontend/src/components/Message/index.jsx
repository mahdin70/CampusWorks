import axios from "axios";
import { useEffect, useState } from "react";
import "./Message.css";
import React from "react";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message pl-3"}>
      <div className="messageTop"></div>
      <p className="messageText">{message.text}</p>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;