import React from "react";
import { Card, CardBody, CloseButton } from "reactstrap";
import { deleteMessage, getMessagesByLobbyId } from "../../apimanagers/MessageManager";
import { redirect, useParams, useNavigate } from "react-router-dom";

export const Message = ({ message, user }) => {
  // Format the sendDate to a readable format
  const formattedDate = new Date(message.sendDate).toLocaleString();
  const {id} = useParams
  const navigate = useNavigate()

  return (
    <Card className="m-4">
      <CardBody> 
        <p className="text-left px2"> Sender: {message.userProfile.displayName}</p> 
        <p className="text-left px2"> Time sent: {formattedDate}</p>         
        <div className="text-center">{message.content}</div>
        {message.userId === user.id && <CloseButton
        onClick={(e)=>{
          e.preventDefault()
          deleteMessage(message.id)
          window.location.reload()
        }}/>}
      
      </CardBody>
    </Card>
  );
};
