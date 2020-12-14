import React, { Component } from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import SideNav from "../components/SideNav";
import WeGroupNavbar from "./WeGroupNavbar";
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
            comment:'',
            text:''
        }
    }

    handleChange(event) {
        this.setState({...this.state, text: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const format = {text: this.state.text}
        this.commentService.updateComment(this.state.post._id, this.state.comment._id, format).then(r => {
            if (r.status !== 200) {
                alert("Something went wrong when creating post!");
            } else {
                alert("Comment edited");
                const url = "/post_detail/" + this.state.post._id
                this.props.history.push(url)
            }
        })
    }

    componentDidMount() {
        this.postService.getPostById(this.props.match.params.postid).then(res => res.json()).then(res => {
            this.setState({post: res});
        })

        this.commentService.getCommentById(this.props.match.params.postid, this.props.match.params.id).then(res => res.json()).then(res => {
            this.setState({comment: res});
        })
    }

    render() {
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
                                <div style={{width: '90%', margin: '2em auto 0 auto'}}>
                                    <Form.Group controlId="commentInput">
                                        <Form.Control as="textarea" onChange={this.handleChange} value={this.state.text} rows={5} placeholder={this.state.comment.text}/>
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