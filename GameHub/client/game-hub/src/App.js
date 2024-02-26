import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Router } from 'react-router-dom'
import ApplicationViews from "./ApplicationViews";
import Header from "./Header";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);


  useEffect(() => {
      if (!localStorage.getItem("userProfile")) {
          setIsLoggedIn(false)

      }
  }, [isLoggedIn])

 return (
<>
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
</>
)
}

export default App;