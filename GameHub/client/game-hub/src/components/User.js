import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const User = ({ user }) => {
  return (
    <Card className="m-4">
      <p className="text-left px-2">Users Registered: {user.Id}</p>
      <CardImg top src={user.ImageLocation} alt={user.DisplayName} />
      <CardBody>
        <p>
          <Link to={`/users/${user.id}`}>
          <strong>{user.DisplayName}</strong>
          </Link>
        </p>
        <p>{user.Bio}</p>
      </CardBody>
    </Card>
  );
};