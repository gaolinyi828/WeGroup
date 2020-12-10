import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WeGroupNavbar from "../containers/WeGroupNavbar";
import '../styles/CommentItem.css';
class CommentItem extends Component {
    constructor(props) {
        super(props);

        this.postId = this.postId.bind(this);
        this.currentPost = this.getPostByPostId(this.postId)
    }
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    render() {
        return (
            <Row style={{ display: "flex", minHeight: "150px" }}>
                <Col sm={3} style={{ display: "flex", paddingRight: "0"}}>
                    <div class="commentBorder" style={{ display: "flex", width:"inherit", height:"inherit"}}>
                        <p class="textPadding">
                            userId, avatar image
                            timestamp
                        </p>
                    </div>
                </Col>
                <Col sm={9} style={{ display: "flex",paddingLeft:"0" }}>
                    <div class="commentBorder" style={{ display: "flex", width:"inherit", height:"inherit"}}>
                        <p class="textPadding">
                            comment.text
                        </p>
                        <div style={{ marginLeft: "auto", marginTop: "auto" }}>
                            <Button
                                variant="warning" href="/post/currentPost.postId/comments/currentComment.id/edit">
                                Edit
                            </Button>
                            <Button variant="danger" id="delete-comment"
                                    action="/post/currentPost.postId/comments/currentComment.id_method=DELETE"
                                    method="POST">
                                Delete
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

export default CommentItem;