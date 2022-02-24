import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../App.scss"
import nuuk from "../img/nuuk.svg"

const HeaderNav = () => {
  return (
    <div className="header_nav">
      <Navbar bg="mediumgray" width="100%" variant="dark">
      <Navbar.Brand><a href="/panel"><img src={nuuk} height="auto" width="150vw"alt="Nuuk logo"></img></a></Navbar.Brand>
      <Navbar.Brand><h2 className="title">FlexAxis</h2></Navbar.Brand>
         
        
      </Navbar>
    </div>
  );
};

export default HeaderNav;
