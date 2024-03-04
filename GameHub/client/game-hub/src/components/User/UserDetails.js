import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import {getAllUsers, getUserbyid } from "../../apimanagers/UserManager";
import { Card } from "reactstrap";

export const UserDetails = () => {
    const [user, setUsers] = useState([]);
    const {id} = useParams();

    const getUser = () => {
        getUserbyid(id).then((thisuser) => setUsers(thisuser));
    }

    const createdDate = new Date(user.createDateTime);
    const formattedDate = createdDate.toLocaleDateString(`en-US`);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
        <Card>
           <Link to={`/users/`}><button className="btn btn-primary">Back to User List</button></Link> 
            <div className="text-center">
            <img className="image" id="userImg" src={user.ImageLocation} alt={user.displayName}/>
            </div>
            <br />
            <p className="row justify-content-center">
                User's Full Name: <strong className="row justify-content-center">{user.fullName}</strong>
            </p>
        <p className="row justify-content-center">User Display Name: <i className="row justify-content-center">{user.displayName}</i></p>
        <div className="row justify-content-center">
           User Type: <strong className="row justify-content-center">{user?.userType?.typeName}</strong>
        </div>
        <br />
        <div className="row justify-content-center">
          Email:<i className="row justify-content-center">{user.email}</i>
        </div>
        <br />
        <div className="row justify-content-center">
           User Created On <strong className="row justify-content-center">{formattedDate}</strong>
        </div>
        <br />
        </Card>
        </>
    )
};

export default UserDetails