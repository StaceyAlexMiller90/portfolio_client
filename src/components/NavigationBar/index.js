import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export default function NavigationBar() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar style={{backgroundColor: 'black', color: 'white'}} variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        {/* <img alt='Logo' src={logo} style={{width: '200px'}}/> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggler'/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Home" />
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
