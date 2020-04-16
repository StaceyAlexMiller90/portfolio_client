import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import NavbarItem from "./NavbarItem";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <>
      <NavbarItem style={{color: 'white'}} path="/browse" linkText="Browse Collection" />
      <NavbarItem style={{color: 'white'}} path="/summary" linkText="Collection Summary" />
      <NavbarItem style={{color: 'white'}} path="/addrecords" linkText="Add Records" />
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.email}</Nav.Item>
      <Button variant="light" onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
