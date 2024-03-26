import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { getUserById, getUserbyid } from "../../apimanagers/UserManager";
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";
import { addMessage, getAllMessages, getMessagesByLobbyId } from "../../apimanagers/MessageManager";
import { Message } from "../Message/Message";
import MessageList from "../Message/MessageList";
import * as signalR from '@microsoft/signalr'


export const GameRoom = () => {


  

    const [lobby, setLobby] = useState({});
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({});
    const [messages, setMessages] = useState([]);
    const {id} = useParams();
    const [conn, setConn] = useState();



    const getUser = () => {
       
        let userId = JSON.parse(localStorage.getItem('userProfile')).id; // use local storage id
         getUserById(userId).then((thisuser) => setUser(thisuser));
     }

     const getMessages = () => {
      return getMessagesByLobbyId(id)
      .then(allMessages => setMessages(allMessages)); 
    };
    
      useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/gameHub")
        .withAutomaticReconnect()
        .build();

        connection.on("ReceiveMessage", function (user, m) {
          console.log(`${user}: ${m}`)
          getMessages()
        });

        connection.start().then(() => {
          getMessages();
        }).catch((err) => {
          return console.error(err.toString());
        });
        setConn(connection);
      }, []); 

  

      const defaultMessage = {
        userId: user.id,
        lobbyId: parseInt(id),
        content: ""
      }

      const messageSubmit = (e) => { 

        e.preventDefault() 
        const newMessageEntry = { ...message }
        document.getElementById('content').value = ''
        newMessageEntry.sendDate = new Date()
        conn.invoke("sendMessage", user.displayName, newMessageEntry.content)
        .then(() => {
          addMessage(newMessageEntry)
          .then(getMessages)
        })
        .catch((err) => {
          return console.error(err.toString());
        });
        
      } 
        
        
        

      useEffect(() => {
        getUser();
      }, []);


     
    return (
        <div  style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: '1', backgroundColor: '#711c91', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{color:'#091833'}}>[GameHub]</h1>
        <div>{<MessageList messages={messages} user={user} setMessages={setMessages} lobbyId={id}/>}</div>
        </div>
        <div style={{ padding: '20px', backgroundColor:'#091833' }}>
        <h2 style={{color:'#ea00d9'}}>Welcome {user.displayName}! Game on! </h2>
      <Form onSubmit={messageSubmit}>
        <fieldset style={{color:'#0abdc6'}}>
          <FormGroup>
            <Label for="content"></Label>
            <Input id="content" type="textarea" 
                onChange={e => {
                    setMessage({
                      userId: user.id,
                      lobbyId: parseInt(id),
                      content: e.target.value
                    })
                  }
                } />
          </FormGroup>
          <FormGroup>
            <Button>Send</Button>
          </FormGroup>
        </fieldset>
      </Form>
      </div>
      </div>
    )
    
}