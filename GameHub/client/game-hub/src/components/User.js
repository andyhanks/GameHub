import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const User = ({ user }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">Registered User Id: {user.id}</p>
      <p className="text-left px2">User's Fullname: {user.fullName}</p>
      <CardImg top src={user.imagelocation} alt={user.displayName} />
      <CardBody>
        <p>
          {/* <Link to={`/users/${user.id}`}>
          <strong>{user.displayname}</strong>
          </Link> */}
        </p>
        <p>User Bio:{user.Bio}</p>
      </CardBody>
    </Card>
  );
};