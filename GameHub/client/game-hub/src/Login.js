import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "./apimanagers/UserManager"; 


export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r){
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <div  style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1', backgroundColor: '#711c91', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{color:'#091833'}}>[GameHub]</h1>
      </div>
      <div style={{ padding: '20px', backgroundColor:'#091833' }}>
      <h2 style={{color:'#ea00d9'}}>Welcome Player! Please Login </h2>
    <Form onSubmit={loginSubmit}>
      <fieldset style={{color:'#0abdc6'}}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </div>
    </div>
  
  );
}