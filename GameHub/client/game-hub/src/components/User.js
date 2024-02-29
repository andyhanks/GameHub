import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
// import cyborg from `src/images/cyborg.png`;

export const User = ({ user }) => {
  return (
    <Card className="m-4">
        <CardBody>
      <CardImg top src={user.imageLocation}  alt="avatar_pic" />
      <p className="text-left px-2">Registered User Id: {user.id}</p>
      <p className="text-left px2"> {user.displayName}</p>
     
        <div className="text-center">
        <Link to={`/users/${user.id}`}><button className="btn btn-primary">User Details</button></Link>
        </div>
      </CardBody>
    </Card>
  );
};
