// import React, { useContext } from "react";
import Card from "../UI/Card/Card";
// import AuthContext from "../AuthContext/AuthContextProvider";
import classes from "./Home.css";
import Button from "../UI/Button/Button";

const Home = (props) => {
  // const authctx = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={props.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;