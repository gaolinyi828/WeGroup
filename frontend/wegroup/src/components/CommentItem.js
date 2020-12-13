import React, { Component } from 'react';
import {Button, Row, Col } from 'react-bootstrap';
import '../styles/CommentItem.css';
import CommentService from "../services/CommentService";
import UserService from "../services/UserService";
import { withRouter } from "react-router-dom";
import moment from "moment";

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.deleteComment = this.deleteComment.bind(this);
        this.renderButtons = this.renderButtons.bind(this);


        this.commentService = CommentService.instance;
        this.userService = UserService.instance;
        this.state = {
            commentOwner: ''
        }
    }

    componentWillReceiveProps(newProps) {
        this.userService.getUserByUserId(newProps.comment.userId).then(res => res.json()).then(res => {
            this.setState({
                ...this.state,
                commentOwner: res.username
            });
        })
    }


    deleteComment(event) {
        event.preventDefault();
        this.commentService.deleteComment(this.props.comment.postId, this.props.comment._id).then(r => {
            if (r.status !== 200) {
                alert("Something went wrong when deleting comment!");
            } else {
                alert("Comment deleted");
                const url = "/post_detail/" + this.props.comment.postId
                this.props.history.push(url)
            }
        })
    }

    renderButtons(){
        if(this.props.comment.userId === this.props.userId) {
            return (
                <div style={{ marginLeft: "auto", marginTop: "auto" }}>
                    <Button
                        variant="warning" href={`/post_detail/${this.props.comment.postId}/comment/${this.props.comment._id}`}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={this.deleteComment}>
                        Delete
                    </Button>
                </div>
            )
        }
    }

    formatDate(date) {
        return new moment(date).format("YYYY-MM-DD HH:mm:ss");
    }

    render() {
        return (
            <div style={{width: '90%', margin: '10px auto 10px auto'}}>
                <Row style={{ display: "flex", minHeight: "150px" }}>
                    <Col sm={3} style={{ display: "flex", paddingRight: "0"}}>
                        <div className={'commentBorder'} style={{ display: "flex", width:"inherit", height:"inherit"}}>
                            <p className={'textPadding'}>
                                {this.state.commentOwner} <br />{this.formatDate(this.props.comment.createdAt)}
                            </p>
                        </div>
                    </Col>
                    <Col sm={9} style={{ display: "flex",paddingLeft:"0" }}>
                        <div className={'commentBorder'} style={{ display: "flex", width:"inherit", height:"inherit"}}>
                            <p className={'textPadding'}>
                                {this.props.comment.text}
                            </p>
                            {this.renderButtons()}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(CommentItem);