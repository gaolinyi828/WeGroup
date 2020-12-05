import React, { Component } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

class WeGroupNavbar extends Component {
    render() {
        return (
            <Navbar bg="danger" expand="lg">
                <Navbar.Brand style={{color: 'white'}} href="/">WeGroup</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default WeGroupNavbar;