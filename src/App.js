import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
// import AuthContext from "./components/AuthContext/AuthContextProvider";
// import AuthContext from "./store/AuthContext/auth-context";
import MainHeader from "./components/MainHeader/ManHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggiedInInfo = localStorage.getItem("isLoggedIn");
    if (storedUserLoggiedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", '1');  
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <div>
      <main>  
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </div>
    </React.Fragment>
  );
}

export default App;
