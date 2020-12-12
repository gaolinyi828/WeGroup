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
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const comment = new FormData(e.target);
    //     if (this.state.user !== null && this.state.user !== undefined) {
    //         this.commentService.createComment(this.postId, e.text).then(r => {
    //             if (r.status !== 201) {
    //                 console.log("status not 200");
    //                 alert("Something went wrong when creating post!");
    //             } else {
    //                 // setFormData({
    //                 //     user: '',
    //                 //     postId: '',
    //                 //     text : '',
    //                 // })
    //             }
    //         })
    //     }
    // }

    //handleChange
//onSubmit={this.handleSubmit()}
    render() {
        return (
            <Form >
                <h3 style={{display: 'flex', justifyContent: 'center'}}>Add Comment to {this.props.post.title}</h3>
                <div style={{width: '90%', margin: 'auto'}}>
                    <Form.Group controlId="commentInput">
                        <Form.Control as="textarea" name='comment' rows={5} placeholder="Write something for this comment..."/>
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