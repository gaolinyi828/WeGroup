import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class PostCard extends Component {
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    render() {
        return (
            <Card style={{ width: '38rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Post Subtitle</Card.Subtitle>
                    <Card.Text>
                        Post Content
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        )
    }
}

export default PostCard;
