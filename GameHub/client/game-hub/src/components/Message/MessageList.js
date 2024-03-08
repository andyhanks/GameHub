
import { React } from "react";
import { Message } from "./Message";




const MessageList = ({messages, user}) => {
 

  return (
    <div className="message-container">
      <div className="container">
        <div className="row justify-content-center">
        <div className="cards-column">
          {messages.map((message) => (
            <Message key={message.id} message={message} user={user}/>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;