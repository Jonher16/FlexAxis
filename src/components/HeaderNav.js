import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../App.scss"
import nuuk from "../img/nuuk.svg"

const HeaderNav = () => {
  return (
    <div>
      <Navbar bg="mediumgray" width="100%" variant="dark">
      <Navbar.Brand><img src={nuuk} height="auto" width="200vw"alt="Nuuk logo"></img></Navbar.Brand>
      <Navbar.Brand><h1>FlexAxis</h1></Navbar.Brand>
         
        
      </Navbar>
    </div>
  );
};

export default HeaderNav;
