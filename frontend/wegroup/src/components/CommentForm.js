import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import CommentService from "../services/CommentService";

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.commentService = CommentService.instance;
        this.state = {
            user: {
                _id: '',
                username: ''
            },
            postId: '',
            text:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const comment = new FormData(event.target.value);
        comment.append('user', this.state.user._id);
        comment.append('postId', this.props.post._id);
        if (this.state.user !== null && this.state.user !== undefined) {
            this.commentService.createComment(comment).then(r => {
                if (r.status !== 201) {
                    console.log("status not 200");
                    alert("Something went wrong when creating post!");
                } else {
                    // setFormData({
                    //     user: '',
                    //     postId: '',
                    //     text : '',
                    // })
                }
            })
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Add Comment to {this.props.post.title}</h3>
                <div style={{width: '90%', margin: 'auto'}}>
                    <Form.Group controlId="commentInput">
                        <Form.Control as="textarea" onChange={this.handleChange} value={this.state.text} rows={5} placeholder="Write something for this comment..."/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Reply
                    </Button>
                </div>
            </Form>
        )
    }
}

export default CommentForm;