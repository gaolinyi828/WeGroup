import React, { Component } from 'react';
import PostService from "../services/PostService";
import { Card } from "react-bootstrap";

class PostTab extends Component {
    renderMyPosts() {
        if (!this.props.posts || this.props.posts.length === 0) return (
            <div style={{textAlign: 'center', marginTop: '30%', fontWeight: 220, fontSize: '2rem'}}>
                <p>You don't have any post</p>
            </div>
        )
        return this.props.posts.map((post, index) =>
            <Card key={index} style={{ width: '90%', margin: '5%' }}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                        {post.text}
                    </Card.Text>
                    <Card.Link href={`/post_detail/${post._id}`}>See Detail</Card.Link>
                </Card.Body>
            </Card>
        )
    }

    render() {
        return (
            <div>
                {this.renderMyPosts()}
            </div>
        )
    }
}

export default PostTab;
