import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WeGroupNavbar from "../containers/WeGroupNavbar";

class FormGroup extends Component {
    constructor(props) {
        super(props);

        this.postId = this.postId.bind(this);
        this.currentPost = this.getPostByPostId(this.postId)
    }
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    render() {
        return (
            <Form>
                <h1 style={{display: 'flex', justifyContent: 'center'}}>Form Group</h1>
                <div style={{width: '30%', margin: '30px auto'}}>
                    <Form.Group controlId="formGroup.NameInput">
                        <Form.Control type="text" placeholder="Your group name" />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox">
                        <div key={`inline-checkbox`} className="mb-3">
                            currentPost.interested.each
                            <div><Form.Check inline label="member.userId" type="checkbox"/></div>
                            <div><Form.Check inline label="member.userId" type="checkbox"/></div>
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <div><a href="/post/currentPost.postId">Go back</a></div>
                </div>
            </Form>
        )
    }
}

export default FormGroup;