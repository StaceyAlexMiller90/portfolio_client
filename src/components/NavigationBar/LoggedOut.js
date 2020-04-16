import React from "react";
import NavbarItem from "./NavbarItem";

export default function LoggedOut() {
  return (
    <>
      <NavbarItem style={{color: 'white'}} path="/login" linkText="Login" />
      <NavbarItem style={{color: 'white'}} path="/signup" linkText="Sign Up" />
    </>
  );
}
