import React, { useEffect, useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { getUserbyid, updateUser } from "../../apimanagers/UserManager";


export default function UpdateUser() {
  const navigate = useNavigate();
  const {id} = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    bio: "",
    imageLocation: "",
    preferredGames: "",
    ready: false,
    createDateTime: "",
    userTypeId: "",
    password: ""
  });


  // useEffect here
  useEffect(() => {
    getUserbyid(id) 
      .then(userData => {
        setUser(userData); // Set user data fetched from API
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

 const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user)
      .then(() => navigate("/users"))
      .catch(error => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" value={user.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" value={user.lastName} onChange={e => setUser({...user, lastName: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" value={user.displayName} onChange={e => setUser({...user, displayName: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label for="bio">A little about yourself:</Label>
          <Input id="bio" type="text" value={user.bio} onChange={e => setUser({...user, bio: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label for="imageLocation">Your Avatar:</Label>
          <Input id="imageLocation" type="text" value={user.imageLocation} onChange={e => setUser({...user, imageLocation: e.target.value})} />
        </FormGroup>
        <FormGroup>
          <Label for="preferredGames">What games do you like to play?</Label>
          <Input id="preferredGames" type="text" value={user.preferredGames} onChange={e => setUser({...user, preferredGames: e.target.value})}/>
        </FormGroup>
        <FormGroup check>
              <Label check>
                <Input type="checkbox" checked={user.userTypeId === 2} value={user.userTypeId} onChange={e => setUser({...user, userTypeId: e.target.value})} />{' '}
                Admin
              </Label>
        </FormGroup>

        <FormGroup>
          <Button>Save</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}