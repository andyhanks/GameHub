import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { editMessage, getMessageById } from "../../apimanagers/MessageManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const UpdateMessage = (message) => {
    const navigate = useNavigate();
    const{id} = useParams();
    const [editedMessage, setEditedMessage] = useState({

    })

  // useEffect here
  useEffect(() => {
    getMessageById(id) 
    .then((res) => {
      setEditedMessage(res); // Set user data fetched from API
    });
  },
  [])
  // if (!editedMessage) {
  //   return null;
  // }
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
  
    
    return editMessage(editedMessage)
    .then(() => {
            navigate(`/lobbies/${editedMessage.lobbyId}`)
          })
      };
      
      return (
        <Form className="message-form">
          <fieldset>
            <FormGroup>
              <Label htmlFor="content">Message to edit:</Label>
              <Input 
              id="content" 
              type="text" 
              value={editedMessage.content} 
              onChange={(event) => {
                const copy = { ...editedMessage}
                copy.content = event.target.value
                setEditedMessage(copy)
              }}/>
            </FormGroup>
            <FormGroup>
              <Button
               onClick={(clickEvent) => handleSubmit(clickEvent)} 
               className="btn btn-primary">Save Changes</Button>
            </FormGroup>
          </fieldset>
        </Form>
      );
}