import React, { useState, useEffect } from "react";
import { Message } from "./Message";
import { getAllMessages, getMessagesByLobbyId } from "../../apimanagers/MessageManager";
import { useParams } from "react-router-dom";



const MessageList = ({}) => {
  const [messages, setMessages] = useState([]);
  const {id} = useParams();

  const getMessages = () => {
    return getMessagesByLobbyId(id).then(allMessages => setMessages(allMessages)); 
  };

  useEffect(() => {
    getMessages();
    console.log(messages)
  }, []); 
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageList;