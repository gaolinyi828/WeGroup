import React, { Component } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import { logout } from "../actions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

class WeGroupNavbar extends Component {
    constructor(props) {
        super(props);

        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
        alert("Successfully log out");
        this.props.history.push('/');
    }

    render() {
        return (
            <Navbar bg="danger" expand="lg">
                <Navbar.Brand style={{color: 'white'}} href="/">WeGroup</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {this.props.token ? <Nav.Link onClick={this.logoutUser}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    token: state.token
});
const mapDispatchToProps
    = dispatch => ({
    logout: () => logout(dispatch)
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(WeGroupNavbar);
