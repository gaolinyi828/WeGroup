import React, { Component } from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WeGroupNavbar from "../containers/WeGroupNavbar";

class Post extends Component {
    constructor(props) {
        super(props);

        this.postId = this.postId.bind(this);
        this.currentPost = this.getPostByPostId(this.postId)
    }
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <h2>currentPost.name</h2>
                    <p>
                        <span>User.getUser(Post.userId).name</span>
                        <span>&nbsp; &nbsp; &nbsp;</span>
                        <span>currentPost.createdAt</span>
                    </p>

                    <p>
                        currentPost.content
                    </p>
                    <div>
                        <h5>People interested in this project:</h5>
                        <span>
                        currentPost.interested.each do x
                            curUser = users.getUser(x)
                            curUser.userName
                            curUser.avatar(wrap in a circle, when mouse hover, show username,
                                also make it a href that can direct to user's public profile page)
                        </span>
                    </div>
                    <p>
                        Tag:
                        <span>
                            <Button variant="primary" disabled>currentPost.tag</Button>
                        </span>
                    </p>

                    <div>reply button,when clicked, redirect to comment form page</div>
                    <Button variant="danger" href="/posts/<%= currentPost._id %>/comments/new">Reply</Button>
                    need a comment form component
                    <div>if user state != currentPost.userId
                            if user.postInterested.contains(currentPost.postId)
                            <Button variant="secondary">Interested</Button>
                            when click again, uninterest this post, and change button to Interest
                            else
                            <Button variant="warning">Interest</Button>{' '}
                            when click, interest this post, and change button to Interested
                    </div>


                    <div>if user state == currentPost.userId && currentPost.interested.size > 0)
                        <Button variant="success">Form Group</Button>
                        need have a form group component
                        else
                        <Button variant="success" disabled>Form Group</Button>
                    </div>
                </Jumbotron>
                <div>
                    comment field

                    currentPost.comments.forEach(function(comment).orderByDate(decs, latest to eariest)

                    need a commentItem component
                </div>
            </div>
        )
    }
}

export default Post;