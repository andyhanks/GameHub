import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { getUserbyid } from "../../apimanagers/UserManager";


export const User = ({ user }) => {

    let activeUser = JSON.parse(localStorage.getItem('userProfile')); // use local storage id
  
 

  return (
    <Card style={{width: "50%"}} className="m-4">
        <CardBody >
      <CardImg
      top src={user.imageLocation}  alt="avatar_pic" />
      <p className="text-left px-2">Registered User Id: {user.id}</p>
      <p className="text-left px2"> {user.displayName}</p>
     
        <div className="text-center">
        <Link to={`/users/${user.id}`}><button className="btn btn-primary">User Details</button></Link>
       {activeUser.userTypeId === 2 && 
        <Link to={`/users/update/${user.id}`}><button className="btn btn-primary">Update User</button></Link>}
        </div>
      </CardBody>
    </Card>
  );
};
