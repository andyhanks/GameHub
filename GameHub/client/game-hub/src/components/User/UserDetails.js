import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../apimanagers/UserManager";
import { Card, CardImg } from "reactstrap";

export const UserDetails = () => {
    const [user, setUsers] = useState([]);
    const {id} = useParams();


    const getUser = () => {
       
       let userId = id ? id : JSON.parse(localStorage.getItem('userProfile')).id; // if the id is not null then use it, if it is then use local storage id
        getUserById(userId).then((thisuser) => setUsers(thisuser));
    }

    const createdDate = new Date(user.createDateTime);
    const formattedDate = createdDate.toLocaleDateString(`en-US`);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
        <Card className="item-card">
           {/* <Link to={`/users/`}><button className="btn btn-primary">Back to User List</button></Link>  */}
            
            <div className="text-center">
           <CardImg  style={{width: "400px"}}top src={user.imageLocation}  alt="avatar_pic" />
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
        <div className="row justify-content-center">
          Bio: <i className="row justify-content-center">{user.bio}</i>
        </div>
        <br/>
        <div className="row justify-content-center">
        Likes To Play: <i className="row justify-content-center">{user.preferredGames}</i>
        </div>
        <br />
        <br />
        </Card>
        </>
    )
};

export default UserDetails