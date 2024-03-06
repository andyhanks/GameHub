
import { Message } from "./Message";




const MessageList = ({messages}) => {
 

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