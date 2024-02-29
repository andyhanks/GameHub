import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./components/Hello";
import UserList from "./components/UserList";
import Login from "./Login";
import UserDetails from "./components/UserDetails";




export default function ApplicationViews() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Hello/>}/>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );

}