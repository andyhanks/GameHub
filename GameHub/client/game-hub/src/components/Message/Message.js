import React from "react";
import { Button, Card, CardBody, CardImg, CloseButton } from "reactstrap";
import { deleteMessage, getMessagesByLobbyId } from "../../apimanagers/MessageManager";
import { redirect, useParams, useNavigate, Link } from "react-router-dom";
import { EditIcon } from "../util/EditIcon";
import { CloseIcon } from "../util/CloseIcon";

export const Message = ({ message, user, setMessages, lobbyId }) => {
  // Format the sendDate to a readable format
  const formattedDate = new Date(message.sendDate).toLocaleString();
  const {id} = useParams
  const navigate = useNavigate()

  return (
    <Card className=" item-card" >
        <CardBody >
        {message.userId === user.id && 
        <div className="float-right" style={{
          flexDirection: "row-reverse",
          display: "flex",
          alignItems: "end"
        }}>
        <Link
        onClick={(e)=>{
          e.preventDefault()
          deleteMessage(message.id)
          .then(() => {
            return getMessagesByLobbyId(lobbyId)
          })
          .then((r) => setMessages(r))
        }}><CloseIcon></CloseIcon></Link> 
        <Link to={`/lobbies/edit/${message.id}`}><EditIcon></EditIcon></Link>
        </div>
        }         
        </CardBody>
      <CardBody> 
        <p className="text-left px2"><strong>{message.userProfile.displayName}</strong></p> 
        <div className="text-center">{message.content}</div>
        <p className="text-left px2"><i>{formattedDate}</i></p>         
      </CardBody>
    </Card>
  );
};
