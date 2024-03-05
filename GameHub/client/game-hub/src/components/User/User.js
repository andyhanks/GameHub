import React from "react";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";


export const User = ({ user }) => {
//   const ValidatePic = () => {
//         fetch(user.imageLocation).then(r => {
//           if (r.ok){
//             return user.imageLocation
//           }else{
//             return "/images/cyborg.png"
//           }
//         }).catch(e => "/images/cyborg.png")
//   }

  return (
    <Card className="m-4">
        <CardBody>
      <CardImg top src={user.imageLocation}  alt="avatar_pic" />
      <p className="text-left px-2">Registered User Id: {user.id}</p>
      <p className="text-left px2"> {user.displayName}</p>
     
        <div className="text-center">
        <Link to={`/users/${user.id}`}><button className="btn btn-primary">User Details</button></Link>
        <Link to={`/users/update/${user.id}`}><button className="btn btn-primary">Update User</button></Link>
        </div>
      </CardBody>
    </Card>
  );
};
