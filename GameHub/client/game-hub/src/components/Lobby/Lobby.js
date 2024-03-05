import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export const Lobby = ({ lobby }) => {
  return (
    <Card className="m-4">
        <CardBody>
      <CardImg top src={lobby.imageLocation}  alt="avatar_pic" />
      <p className="text-left px-2">Game Id: {lobby.id}</p>
      <p className="text-left px-2"> {lobby.title}</p>
      <p className="text-left px-2"> {lobby.description}</p>
     
        <div className="text-center">
        <Link to={`/lobbies/${lobby.id}`}><button className="btn btn-primary">Game On!</button></Link>
        {/* <Link to={`/lobbies/update/${lobby.id}`}><button className="btn btn-primary">Edit Game</button></Link> */}
        </div>
      </CardBody>
    </Card>
  );
};
