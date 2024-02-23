import React from "react";

const baseUrl = '/api/User';

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