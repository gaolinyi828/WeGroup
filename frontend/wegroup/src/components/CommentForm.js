import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import CommentService from "../services/CommentService";
import { withRouter } from "react-router-dom";

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.commentService = CommentService.instance;
        this.state = {
            userId: '',
            postId: '',
            text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({...this.state, userId: newProps.userId, postId: newProps.post._id})
    }

    handleChange(event) {
        this.setState({...this.state, text: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.commentService.createComment(this.state).then(r => {
            if (r.status !== 201) {
                alert("Something went wrong when creating post!");
            } else {

            }
        })
        this.setState({
            ...this.state,
            text : ''
        })
        this.props.changeState();
        alert("Comment added");
        const url = "/post_detail/" + this.props.post._id
        this.props.history.push(url)

    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <div style={{width: '90%', margin: '30px auto'}}>
                    <Form.Group>
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

export default withRouter(CommentForm);