import React, { useState, useEffect } from "react";
import { getAllLobbies } from "../../apimanagers/LobbyManager";
import { Lobby } from "./Lobby";



const LobbyList = () => {
  const [lobbies, setLobbies] = useState([]);

  const getLobbies = () => {
    getAllLobbies().then(allLobbies => setLobbies(allLobbies)); 
  };

  useEffect(() => {
    getLobbies();
  }, []); 
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {lobbies.map((lobby) => (
            <Lobby key={lobby.id} lobby={lobby} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LobbyList;