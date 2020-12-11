import React, { Component } from 'react';
import {Jumbotron, Button, Container, Row, Col, Tab, Image} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import PostCard from "./PostCard";

const commentsArray = ['tab1', 'tab2', 'tab3', 'tab4'];
class Post extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.postId = this.postId.bind(this);
    //     this.currentPost = this.getPostByPostId(this.postId)
    // }
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
    renderComments() {
        return commentsArray.map((index) => {
            return (
                <Tab.Pane key={index} eventKey={index}>
                    <Row key={index} style={{margin: '1rem'}}>
                        <CommentItem />
                    </Row>
                </Tab.Pane>
            )
        });
    }

    render() {
        return (
            <div>
                <Jumbotron fluid style={{width: '90%', margin: 'auto', minHeight: "150px"}}>
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

                    <div style={{ display: "flex" }}>

                            <Button variant="warning" style={{ marginLeft: "auto" }}>Interest</Button>
                    </div>


                    <div>if user state == currentPost.userId && currentPost.interested.size > 0)
                        <Button variant="success">Form Group</Button>
                        need have a form group component
                        else
                        <Button variant="success" disabled>Form Group</Button>
                    </div>
                </Jumbotron>
                <div>
                    <CommentForm />
                </div>
                <div>
                    {this.renderComments()}
                </div>
            </div>
        )
    }
}

export default Post;