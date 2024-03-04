const baseUrl = 'https://localhost:5001';

export const getAllLobbies = () => {
    return fetch(`${baseUrl}/api/Lobby`) 
      .then((res) => res.json())
  };