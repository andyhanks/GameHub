const baseUrl = 'https://localhost:5001/api/Message';

export const getAllMessages = () => {
    return fetch(`${baseUrl}`) 
      .then((res) => res.json())
  };

  export const addMessage = (singleMessage) => {
    console.log(singleMessage)
    return fetch(baseUrl, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(singleMessage),
    });   
};

export const getMessagesByLobbyId = (id) => {
    return fetch(`${baseUrl}/${id}`) 
    .then((res) => res.json()
    );
}

export const deleteMessage = (id) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "DELETE"
    })
  }
export const editMessage = (message) => {
    return fetch(`${baseUrl}/${message.id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}