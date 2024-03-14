import React, { useEffect, useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../apimanagers/UserManager";


export default function UpdateUser(user) {
  const navigate = useNavigate();
  const {id} = useParams();

  const [editedUser, setEditedUser] = useState({
    id: user.id,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    bio: "",
    imageLocation: "",
    preferredGames: "",
    ready: false,
    createDateTime: ""
  });



  // useEffect here
  useEffect(() => {
    getUserById(id) 
      .then((res) => {
        setEditedUser(res); // Set user data fetched from API
      });
  },
   [])
   if (!editedUser) {
    return null;
   }

 const handleSubmit = (e) => {
    e.preventDefault()
  
    return updateUser(editedUser)
      .then(() => {
        navigate(`/`)
      })
  };

  return (
    <Form className="user-form">
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input 
          id="firstName" 
          type="text" 
        value={editedUser.firstName} 
          onChange={(event) => {
            const copy = { ...editedUser}
            copy.firstName = event.target.value
            setEditedUser(copy)
          }}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input 
                 id="lastName" 
                 type="text" 
                 value={editedUser.lastName} 
                 onChange={(event) => {
                  const copy = { ...editedUser}
                  copy.lastName = event.target.value
                  setEditedUser(copy)
                 }} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input 
            id="displayName" 
            type="text" 
            value={editedUser.displayName} 
            onChange={(event) => {
              const copy = { ...editedUser}
              copy.displayName = event.target.value
              setEditedUser(copy)
            }}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input 
          id="email" 
          type="text" 
          value={editedUser.email} 
          onChange={(event) =>{
            const copy = {...editedUser}
            copy.email = event.target.value
            setEditedUser(copy)
            }} />
        </FormGroup>
        <FormGroup>
          <Label for="bio">A little about yourself:</Label>
          <Input 
          id="bio" 
          type="text" 
          value={editedUser.bio} 
          onChange= {(event) =>{
            const copy = {...editedUser}
            copy.bio = event.target.value
            setEditedUser(copy)
            }} />
        </FormGroup>
        <FormGroup>
          <Label for="imageLocation">Your Avatar:</Label>
          <Input 
          id="imageLocation" 
          type="text" 
          value={editedUser.imageLocation} 
          onChange={(event) =>{
            const copy = {...editedUser}
            copy.imageLocation = event.target.value
            setEditedUser(copy)
            }} />
        </FormGroup>
        <FormGroup>
          <Label for="preferredGames">What games do you like to play?</Label>
          <Input 
          id="preferredGames" 
          type="text" 
          value={editedUser.preferredGames} 
          onChange= {(event) =>{
            const copy = {...editedUser}
            copy.preferredGames = event.target.value
            setEditedUser(copy)
            }} />
        </FormGroup> 


        <FormGroup>
          <Button
           onClick={(clickEvent) => handleSubmit(clickEvent)} 
           className="btn btn-primary">Save Changes</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}