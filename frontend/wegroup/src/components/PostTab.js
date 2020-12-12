import React, { Component } from 'react';
import PostService from "../services/PostService";
import { Card } from "react-bootstrap";

class PostTab extends Component {
    renderMyPosts() {
        if (!this.props.posts) return <h2>You have no post yet</h2>
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
