import React from "react";

const baseUrl = 'https://localhost:5001';

export const login = (userObject) => {
  return fetch(`${baseUrl}/api/User/GetByEmail?email=${userObject.email}`)
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
  return fetch(`${baseUrl}/api/User`) 
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
  return fetch(`${baseUrl}/api/User/${id}`)
    .then((r) => r.json());
}

export const logout = () => {
      localStorage.clear()
};

export const register = (userObject, password) => {
  return  fetch(`${baseUrl}/api/User`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
    });
};
