// import React from 'react'

import { NavLink } from "react-router"
import { Nav, Navbar } from "rsuite"

import cl from './NavBar.module.css'

function NavBar() {
  return (
    <>
        <Navbar>
            <Nav>
            <div className={cl.navBrand}>Sade216.PostsApp</div>
            <Nav.Item as={NavLink} to="/">Home</Nav.Item>
            <Nav.Item as={NavLink} to='/about'>About</Nav.Item>
            {/* <Nav.Item >Products</Nav.Item>
            <Nav.Menu title="About">
                <Nav.Item>Company</Nav.Item>
                <Nav.Item>Team</Nav.Item>
                <Nav.Menu title="Contact">
                <Nav.Item>Via email</Nav.Item>
                <Nav.Item>Via telephone</Nav.Item>
                </Nav.Menu>
            </Nav.Menu> */}
            </Nav>
            <Nav pullRight>    
                <Nav.Item as={NavLink} to='/error'>ErrorPage</Nav.Item>
            </Nav>
        </Navbar>
    </>
  )
}

export default NavBar