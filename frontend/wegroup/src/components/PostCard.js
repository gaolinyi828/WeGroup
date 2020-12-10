import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WeGroupNavbar from "../containers/WeGroupNavbar";

class PostCard extends Component {
    constructor(props) {
        super(props);

        this.postId = this.postId.bind(this);
        this.currentPost = this.getPostByPostId(this.postId)
    }
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    render() {
        return (
            <Jumbotron>
                <h3>currentPost.name</h3>
                <p>
                    <span>User.getUser(Post.userId).name</span>
                    <span>&nbsp; &nbsp; &nbsp;</span>
                    <span>Post.createdAt</span>
                </p>
                <p>
                    currentPost.content
                </p>
            </Jumbotron>
        )
    }
}

export default PostCard;