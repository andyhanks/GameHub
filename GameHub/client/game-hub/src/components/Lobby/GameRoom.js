import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { getUserbyid } from "../../apimanagers/UserManager";
import { Button, Card, Form, FormGroup, Input, Label } from "reactstrap";

export const GameRoom = () => {

    const [lobby, setLobby] = useState({});
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({});
    const [messages, setMessages] = useState([]);
    const {id} = useParams();

    const getUser = () => {
       
        let userId = JSON.parse(localStorage.getItem('userProfile')).id; // use local storage id
         getUserbyid(userId).then((thisuser) => setUser(thisuser));
     }
        const messageSubmit = () => {} //fill this!!!
     const createdDate = new Date(user.createDateTime);
     const formattedDate = createdDate.toLocaleDateString(`en-US`);
 
     useEffect(() => {
         getUser();
     }, []);
     
    return (
        <div  style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: '1', backgroundColor: '#711c91', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{color:'#091833'}}>[GameHub]</h1>
        </div>
        <div style={{ padding: '20px', backgroundColor:'#091833' }}>
        <h2 style={{color:'#ea00d9'}}>Welcome {user.displayName}! Game on! </h2>
      <Form onSubmit={messageSubmit}>
        <fieldset style={{color:'#0abdc6'}}>
          <FormGroup>
            <Label for="message"></Label>
            <Input id="message" type="textarea" 
                onChange={e => setMessage({
                    userId: user.id,
                    lobbyId: parseInt(id),
                    message: e.target.value
                })} />
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