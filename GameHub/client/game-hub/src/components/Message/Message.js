import React from "react";
import { Button, Card, CardBody, CloseButton } from "reactstrap";
import { deleteMessage, getMessagesByLobbyId } from "../../apimanagers/MessageManager";
import { redirect, useParams, useNavigate, Link } from "react-router-dom";

export const Message = ({ message, user, messages, setMessages, lobbyId }) => {
  // Format the sendDate to a readable format
  const formattedDate = new Date(message.sendDate).toLocaleString();
  const {id} = useParams
  const navigate = useNavigate()

  return (
    <Card className="m-4">
      {console.log(lobbyId)}
      <CardBody> 
        <p className="text-left px2"> Sender: {message.userProfile.displayName}</p> 
        <p className="text-left px2"> Time sent: {formattedDate}</p>         
        <div className="text-center">{message.content}</div>
        {message.userId === user.id && <CloseButton
        onClick={(e)=>{
          e.preventDefault()
          deleteMessage(message.id)
          .then(() => {
            return getMessagesByLobbyId(lobbyId)
          })
          .then((r) => setMessages(r))
        }}/>}
        {user.id === message.userId && 
        <Link to={`/lobbies/edit/${message.id}`}><button className="btn btn-primary">edit</button></Link>}
      </CardBody>
    </Card>
  );
};
