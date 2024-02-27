import React from "react";
import { Route, Routes } from "react-router-dom";
// import UserProfileList from "./UserProfiles/UserProfileList";
// import UserProfileDetails from "./UserProfiles/UserProfileDetails";
import Hello from "./components/Hello";
import UserList from "./components/UserList";
import Login from "./Login";



export default function ApplicationViews() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Hello/>}/>
        <Route path="/users" element={<UserList />} />
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="/users/:id" element={<UserProfileDetails />} /> */}
      </Routes>
    </>
  );

}