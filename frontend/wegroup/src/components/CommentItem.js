import React, { Component } from 'react';
import {Button, Row, Col } from 'react-bootstrap';
import '../styles/CommentItem.css';
import CommentService from "../services/CommentService";

class CommentItem extends Component {
    constructor(props) {
        super(props);

        this.postId = this.postId.bind(this);
        this.currentPost = this.getPostByPostId(this.postId)
        this.commentService = CommentService.instance;
    }

    editComment() {

    }

    deleteComment() {

    }
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    render() {
        return (
            <div style={{width: '90%', margin: '30px auto'}}>
                <Row style={{ display: "flex", minHeight: "150px" }}>
                    <Col sm={3} style={{ display: "flex", paddingRight: "0"}}>
                        <div className={'commentBorder'} style={{ display: "flex", width:"inherit", height:"inherit"}}>
                            <p className={'textPadding'}>
                                userId, avatar image <br /> {this.props.post.comments[this.props.index].createdAt}
                            </p>
                        </div>
                    </Col>
                    <Col sm={9} style={{ display: "flex",paddingLeft:"0" }}>
                        <div className={'commentBorder'} style={{ display: "flex", width:"inherit", height:"inherit"}}>
                            <p className={'textPadding'}>
                                {this.props.post.comments[this.props.index].text}
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
            </div>
        )
    }
}

export default CommentItem;