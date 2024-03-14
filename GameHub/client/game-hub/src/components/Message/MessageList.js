
import { React } from "react";
import { Message } from "./Message";




const MessageList = ({messages, setMessages, user, lobbyId}) => {
 

  return (
    <div className="message-container">
      <div className="container">
        <div className="row justify-content-center">
        <div className="cards-column">
          {messages.map((message) => (
            <Message key={message.id} message={message} messages={messages} setMessages={setMessages} user={user} lobbyId={lobbyId}/>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;