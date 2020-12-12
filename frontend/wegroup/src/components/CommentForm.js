import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import CommentService from "../services/CommentService";

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.commentService = CommentService.instance;
        this.state = {
            userId: this.props.userId,
            postId: this.props.postId,
            text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({...this.state, text: event.target.value});
        console.log(this.state.text)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
            this.commentService.createComment(this.state).then(r => {
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

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Add Comment to {this.props.postId}</h3>
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