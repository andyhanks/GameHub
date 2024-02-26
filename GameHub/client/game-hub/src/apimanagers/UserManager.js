import React from "react";

const baseUrl = '/api/User';

export const login = (userObject) => {
  return fetch(`${baseUrl}/api/User/getbyemail?email=${userObject.email}`)
  .then((r) => r.json())
    .then((userProfile) => {
      if(userProfile.id){
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile
      }
      else{
        return undefined
      }
    });
};

export const getAllUsers = () => {
  return fetch(baseUrl) 
    .then((res) => res.json())
};

export const addUser = (singleUser) => { 
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(singleUser),
  });
  
};
export const getUserbyid = (id) => {
  return fetch(`${apiUrl}/api/User/${id}`)
    .then((r) => r.json());
}

export const logout = () => {
      localStorage.clear()
};