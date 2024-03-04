
import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "../components/Home/Hello";
import UserList from "../components/User/UserList";
import Login from "../components/Auth/Login";
import UserDetails from "../components/User/UserDetails";
import UpdateUser from "../components/User/UpdateUser";
import LobbyList from "../components/Lobby/LobbyList";




export default function ApplicationViews() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Hello/>}/>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails/>}/>
        <Route path="/users/update/:id" element={<UpdateUser/>}/>
        <Route path="/lobbies" element={<LobbyList/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );

}