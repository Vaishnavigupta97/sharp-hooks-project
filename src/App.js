import React, { useContext } from "react";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
// import AuthContext from "./components/AuthContext/AuthContextProvider";
// import AuthContext from "./store/AuthContext/auth-context";
import MainHeader from "./components/MainHeader/ManHeader/MainHeader";
import AuthContext from "./components/AuthContext/AuthContextProvider";

function App() {
  const ctx = useContext(AuthContext)
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
