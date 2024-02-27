import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export const User = ({ user }) => {
  return (
    <Card className="m-4">
        <CardBody>
      <CardImg top src={user.imagelocation} alt={user.displayName} />
      <p className="text-left px-2">Registered User Id: {user.id}</p>
      <p className="text-left px2">User's Fullname: {user.fullName}</p>
     
        <div className="text-center">
        <Link to={`/users/${user.id}`}><button className="btn btn-primary">User Details</button></Link>
        </div>
      </CardBody>
    </Card>
  );
};