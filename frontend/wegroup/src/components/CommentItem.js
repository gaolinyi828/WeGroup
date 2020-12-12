import React, { Component } from 'react';
import {Button, Row, Col } from 'react-bootstrap';
import '../styles/CommentItem.css';
import CommentService from "../services/CommentService";
import { withRouter } from "react-router-dom";

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.deleteComment = this.deleteComment.bind(this);
        this.renderButtons = this.renderButtons.bind(this);


        this.commentService = CommentService.instance;
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

    render() {
        return (
            <div style={{width: '90%', margin: '30px auto'}}>
                <Row style={{ display: "flex", minHeight: "150px" }}>
                    <Col sm={3} style={{ display: "flex", paddingRight: "0"}}>
                        <div className={'commentBorder'} style={{ display: "flex", width:"inherit", height:"inherit"}}>
                            <p className={'textPadding'}>
                                {this.props.comment.userId} <br />{this.props.comment.createdAt}
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