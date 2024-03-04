import React, { useEffect, useState } from "react";
import "../src/style/Global.css";
import { BrowserRouter as Router } from 'react-router-dom'
import ApplicationViews from "./views/ApplicationViews";
import Header from "./views/Header";
import Authorize from "./components/Auth/Authorize";


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