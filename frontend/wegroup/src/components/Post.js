import React, { Component } from 'react';
import {Jumbotron, Button, Row,Tab,} from 'react-bootstrap';
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import moment from 'moment';
import { getAllCommentsByPostId } from "../actions";
import UserService from "../services/UserService";
import PostService from "../services/PostService";

// const temp = {
//     "comments": [],
//     "interested": [],
//     "_id": "5fd30411f63c0d0aa9305d4f",
//     "userId": "5fd302bbf63c0d0aa9305d4e",
//     "tagId": "5fcffe58c0c2f34fccf5e711",
//     "createdAt": "2020-12-11T05:30:57.091Z",
//     "text": "test",
//     "img": null,
//     "__v": 0
// }
class Post extends Component {
    constructor(props) {
        super(props);

        this.userService = UserService.instance;

        this.state = {
            user: {
                _id: '',
                username: ''
            }
        }
    //
    }

    componentDidMount() {
        this.userService.loadUser().then(res => res.json()).then(res => {
            this.setState({
                user: {
                    _id: res._id,
                    username: res.username,
                    groups: res.teams,
                    posts: res.postsCreatedByUser,
                    interested_posts: res.postsInteracted
                }
            });
            console.log("user Id inside profile: "+ res._id);
        })
    }

    // interestPost() {
    //     const updatePostInterestList =  {
    //         "comments": this.currentPost.comments,
    //         "interested": this.currentPost.interested + this.state.user,
    //         "_id": this.currentPost._id,
    //         "userId": "5fd302bbf63c0d0aa9305d4e",
    //         "tagId": "5fcffe58c0c2f34fccf5e711",
    //         "createdAt": "2020-12-11T05:30:57.091Z",
    //         "text": "test",
    //         "img": null,
    //         "__v": 0
    //     }
    //     //need to allow update interested,comments list
    //     this.postService.updatePost(this.currentPost._id, this.state.user._id).then(r => {
    //         if (r.status !== 200) {
    //             // console.log("status not 200");
    //             alert("Something went wrong when creating post!");
    //         } else {
    //             setFormData({
    //                 text: '',
    //                 tagId : '',
    //             })
    //         }
    //     })
    // }
//param postid, render a card showing post name, who posted it(show profile image), user name, posted date, and some comments, set a max length of xxx
//     renderComments() {
//         if (this.commentsArray.length == 0) {
//             return (
//                 <div>
//                     There is no comment yet.
//                 </div>
//             )
//         } else {
//             return this.commentsArray.map((index) => {
//                 return (
//                     <Tab.Pane key={index} eventKey={index}>
//                         <Row key={index} style={{margin: '1rem'}}>
//                             <CommentItem/>
//                         </Row>
//                     </Tab.Pane>
//                 )
//             });
//         }
//     }
    renderInterestButton() {
        if (!this.props.post.interested.contains(this.state.user._id)) {
            return (
                <div style={{ display: "flex" }}>
                    <Button variant="warning" style={{ marginLeft: "auto" }} onClick={() => this.interestPost()}>Interest</Button>
                </div>
            )
        } else {
            return (
                <div style={{ display: "flex" }}>
                    <Button variant="warning" disabled style={{ marginLeft: "auto" }}>Interested</Button>
                </div>
            )
        }
    }

    formatDate(date) {
        return new moment(date).format("YYYY-MM-DD HH:mm:ss");
    }

    //post need a post title
    //tag need a getTagByTagId
    //post need a group formed property
    render() {
        return (
            <div>
                <Jumbotron fluid style={{width: '90%', margin: 'auto', minHeight: "150px"}}>
                    <h1>{this.props.post.title}</h1>
                    <p>
                        <span>User.getUser(Post.userId).name</span>
                        <span>&nbsp; &nbsp; &nbsp;</span>
                        <span>{this.formatDate(this.props.post.createdAt)}</span>
                    </p>
                    <p>
                        {this.props.post.text}
                        {this.state.user.username}
                    </p>
                    <div>
                        <h6>People interested in this project:</h6>
                        <span>
                        currentPost.interested.each do x
                            curUser = users.getUser(x)
                            curUser.userName
                            curUser.avatar(wrap in a circle, when mouse hover, show username,
                                also make it a href that can direct to user's public profile page)
                        </span>
                    </div>
                    <p style={{marginTop:"20px"}}>
                        Tag:
                        <span>
                            <Button variant="primary" disabled>{this.props.post.tagId}</Button>
                        </span>
                    </p>




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

                </div>
            </div>
        )
    }
}

export default Post;
