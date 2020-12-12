import React, { Component } from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import SideNav from "../components/SideNav";
import WeGroupNavbar from "./WeGroupNavbar";
import Post from "../components/Post"
import { withRouter } from "react-router";

import "../styles/PostDetailPage.css"
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";


class EditCommentPage extends Component {
    constructor(props) {
        super(props);
        this.postService = PostService.instance;
        this.commentService = CommentService.instance;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            post: {},
            comments: [],
            text:''
        }
    }

    handleChange(event) {
        this.setState({...this.state, text: event.target.value});
        console.log(this.state.text)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        this.commentService.updateComment(this.state).then(r => {
            if (r.status !== 201) {
                console.log("status not 201");
                alert("Something went wrong when creating post!");
            } else {
                this.setState({
                    text : ''
                })
            }
        })
    }
    componentDidMount() {
        this.postService.getPostById(this.props.match.params.postid).then(res => res.json()).then(res => {
            this.setState({post: res});
        })

        this.commentService.getAllCommentsByPostId(this.props.match.params.postid).then(res => res.json()).then(res => {
            this.setState({comments: res});
        })
    }

    //{this.props.postId}
    render() {
        console.log((this.state))
        return (
            <div>
                <WeGroupNavbar />
                <Container fluid style={{padding: 0}}>
                    <div>
                        <div>
                            <SideNav />
                        </div>
                        <div className={'postDetailPage'}>
                            <Form onSubmit={this.handleSubmit}>
                                <h3 style={{display: 'flex', justifyContent: 'center'}}>Edit Comment of </h3>
                                <div style={{width: '90%', margin: 'auto'}}>
                                    <Form.Group controlId="commentInput">
                                        <Form.Control as="textarea" onChange={this.handleChange} value={this.state.text} rows={5} placeholder="Write something for this comment..."/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default withRouter(EditCommentPage);