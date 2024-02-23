import React from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom'
import UserList from "./components/UserList";

function App() {
 return (
<>
  <BrowserRouter>
    <UserList/>
  </BrowserRouter>
</>
)
}

export default App;