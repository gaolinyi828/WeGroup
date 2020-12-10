import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { login } from '../actions';
import { connect } from 'react-redux';
import { Redirect} from 'react-router';
import WeGroupNavbar from "../containers/WeGroupNavbar";

class Login extends Component {
    constructor(props) {
        super(props);

        this.loginUser = this.loginUser.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }
    }

    loginUser(e) {
        e.preventDefault();
        this.props.login(this.state.user);
    }

    usernameChanged(e) {
        this.setState({user: { ...this.state.user, username: e.target.value }});
    }

    passwordChanged(e) {
        this.setState({user: { ...this.state.user, password: e.target.value }});
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/activity" />;
        }

        return (
            <div>
                <WeGroupNavbar />
                <Container fluid>
                    <Row>
                        <Col xs={{span: 4, offset: 4}}>
                            <Form onSubmit={this.loginUser} style={{padding: '5rem'}}>
                                <div style={{textAlign: 'center', marginTop: '1rem', marginBottom: '4rem'}}>
                                    <h1>WeGroup</h1>
                                </div>
                                <Form.Group controlId="formBasicUsername" style={{marginBottom: '2rem'}}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control onChange={this.usernameChanged} placeholder="Enter Username" required />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" style={{marginBottom: '2rem'}}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.passwordChanged} type="password" placeholder="Enter Password" required />
                                </Form.Group>
                                <Button style={{width: '100%', borderColor: '#dc3545', borderRadius: '10px', backgroundColor: '#dc3545'}} variant="primary" type="submit">
                                    Log in
                                </Button>
                                <hr />
                                <p>> Forgot your password?</p>
                                <p>> Don't have an account? <Link style={{color: '#dc3545'}} to="/signup">Sign up</Link></p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});
const mapDispatchToProps
    = dispatch => ({
    login: (user) => login(dispatch, user)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
