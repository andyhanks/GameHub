// Hello.js

import React, { useState, useEffect } from 'react';
import { login } from '../../apimanagers/UserManager';
import { Card, CardBody } from 'reactstrap';
import UserDetails from '../User/UserDetails';
import { redirect } from 'react-router-dom';


export default function Hello() {
  ////////////////////////Gets Currently Logged In User From Local Storage////////////////////////////
  const [user, setUser] = useState();

  useEffect(() => {
    // Check if the user is logged in
    const loggedInUser = localStorage.getItem('userProfile');
    if (loggedInUser) {
      // If the user is logged in, set the user state
      setUser(JSON.parse(loggedInUser));
    } else {
      // If the user is not logged in, simulate a login
      // Replace this with your actual login logic using the login function
      // login({ email: 'user@example.com' }).then(userProfile => {
      //   setUser(userProfile);
      // });

      redirect("/")
    }
    ///////////////////////////////////////////////////////////////
  }, []); // Empty dependency array to run effect only once

  return (
  
    <Card className='m-4' >
      <CardBody style={{backgroundColor:'#133e7c', color:'#ea00d9'}}>
    <div>
      <h1>
        
      {user && <p>Welcome {user.firstName}!</p>}
      </h1>
      <p>[GameHub] is a game matchmaking system. </p>
      <p>After filling out your profile, take a look at the open Lobbies.</p>
      <p>See if there are any games that catch your eye!</p> 
      <div><UserDetails/></div>
    </div>

      </CardBody>
    </Card>
    
  );
}
