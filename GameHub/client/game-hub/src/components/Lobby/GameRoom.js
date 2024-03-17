import { useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { getUserById, getUserbyid } from "../../apimanagers/UserManager";
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";
import { addMessage, getAllMessages, getMessagesByLobbyId } from "../../apimanagers/MessageManager";
import { Message } from "../Message/Message";
import MessageList from "../Message/MessageList";



export const GameRoom = () => {


  

    const [lobby, setLobby] = useState({});
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({});
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const {id} = useParams();
    const connection = useRef(null)



    const getUser = () => {
       
        let userId = JSON.parse(localStorage.getItem('userProfile')).id; // use local storage id
         getUserById(userId).then((thisuser) => setUser(thisuser));
     }

     const getMessages = () => {
      return getMessagesByLobbyId(id)
      .then(allMessages => setMessages(allMessages)); 
    };
    
      useEffect(() => {
        // Establish WebSocket connection
        const socket = new WebSocket('ws://localhost:8888');

        // // Event handler for when the connection is opened
        socket.addEventListener('open', function (event) {
            console.log("Websocket connection opened");
            // Send a message to the server
            socket.send("Websocket connection opened");
        });

        

        // console.log(socket)
        // socket.onopen = () => {
        //   console.log('WebSocket connection established');
        //   // You can interact with the WebSocket here
        //   socket.send(`${user.displayName} has joined the room`);
        // };

        // // Event handler for incoming messages
        // socket.addEventListener('message', function (event) {
        //     console.log('Message from server:', event.data);
        // });

        // Event handler for errors
        // socket.addEventListener('error', function (event) {
        //     console.error('Socket error:', event);
        // });

        // Event handler for when the connection is closed
        socket.addEventListener('close', function (event) {
            console.log("Websocket connection closed");
        });

        connection.current = socket
        getMessages();
        
        // return () => connection.close()
      }, []); 

  

      const defaultMessage = {
        userId: user.id,
        lobbyId: parseInt(id),
        content: ""
      }

      const messageSubmit = (e) => { 
        e.preventDefault() 
        // console.log(defaultMessage, message)
        const newMessageEntry = { ...message }
        setMessage(defaultMessage)
        // ws.send('message sent')
        document.getElementById('content').value = ''
        newMessageEntry.sendDate = new Date()
        addMessage(newMessageEntry)
        .then(getMessages)
      
        
      } //fill this!!!
        
        
        

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
                    // ws.send('typing')
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