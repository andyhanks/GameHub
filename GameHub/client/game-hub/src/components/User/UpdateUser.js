import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../apimanagers/UserManager";


export default function UpdateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    bio: "",
    imageLocation: "",
    preferredGames: "",
    ready: false,
    createDateTime: Date.now(),
    userTypeId: "",
    password: ""
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [imageLocation, setimageLocation] = useState("");
  const [preferredGames, setPreferredGames] = useState("");
  const [ready, setReady] = useState(false);
  const [createDateTime, setCreateDateTime] = useState(0);
  const [userTypeId, setUserTypeId] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  

  const handleSubmit = (e) => {
    return updateUser(user).then(() => navigate("/users"));
};

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="bio">A little about yourself:</Label>
          <Input id="bio" type="text" onChange={e => setBio(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="imageLocation">Your Avatar:</Label>
          <Input id="imageLocation" type="text" onChange={e => setimageLocation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="preferredGames">What games do you like to play?</Label>
          <Input id="preferredGames" type="text" onChange={e => setPreferredGames(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={() => setUserTypeId(!userTypeId)} />{' '}
                Admin
              </Label>
        </FormGroup>
        <FormGroup check>
              <Label check>
                <Input type="checkbox" onChange={() => setReady(!ready)} />{' '}
                Ready
              </Label>

        </FormGroup>
        <FormGroup>
    <Label for="createDateTime">
      Date
    </Label>
    <Input
      id="createDate"
      name="date"
      placeholder="date placeholder"
      type="date"
      onChange={e => setCreateDateTime(e.target.value)}
    />
  </FormGroup>
        <FormGroup>
          <Button>Save</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}