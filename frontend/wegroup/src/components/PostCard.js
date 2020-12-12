import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PostService from "../services/PostService";

class PostCard extends Component {
    constructor(props) {
        super(props);
        this.postService = PostService.instance;

        this.state = {
            post: {}
        }
    }

    componentDidMount() {
        this.postService.getPostById(this.props.postId).then(res => res.json()).then(res => {
            this.setState({post: res});
        })
    }

//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    render() {
        return (
            <Card style={{ width: '48rem' }}>
                <Card.Body>
                    <Card.Title>{this.state.post.title}</Card.Title>
                    <Card.Text>
                        {this.state.post.text}
                    </Card.Text>
                    <Card.Link href={`/post_detail/${this.state.post._id}`}>See Detail</Card.Link>
                </Card.Body>
            </Card>
        )
    }
}

export default PostCard;
