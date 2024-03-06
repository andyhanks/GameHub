import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Message = ({ message }) => {
  // Format the sendDate to a readable format
  const formattedDate = new Date(message.sendDate).toLocaleString();

  return (
    <Card className="m-4">
      <CardBody> 
        <p className="text-left px2"> Lobby in which message belongs: {message.lobbyId}</p>  
        <p className="text-left px2"> Sender: {message.userId}</p> 
        <p className="text-left px2"> Time sent: {formattedDate}</p>         
        <div className="text-center">{message.content}</div>
      </CardBody>
    </Card>
  );
};
