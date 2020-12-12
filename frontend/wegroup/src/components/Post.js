import React, { Component } from 'react';
import {Jumbotron, Button, Row,Tab,} from 'react-bootstrap';
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import moment from 'moment';
import { getAllCommentsByPostId } from "../actions";
import UserService from "../services/UserService";
import PostService from "../services/PostService";
import CommentService from "../services/CommentService";
import TagService from "../services/TagService";

const temp = {
    "comments": [],
    "interested": [],
    "_id": "5fd30411f63c0d0aa9305d4f",
    "userId": "5fd302bbf63c0d0aa9305d4e",
    "tagId": "5fcffe58c0c2f34fccf5e711",
    "createdAt": "2020-12-11T05:30:57.091Z",
    "text": "test",
    "img": null,
    "__v": 0
}
class Post extends Component {
    constructor(props) {
        super(props);


        // this.commentsArray = this.props.getAllCommentsByPostId(this.postId)
        //this.posts = [];
        this.userService = UserService.instance;
        this.postService = PostService.instance;

        this.tagService = TagService.instance;


        //this.currentPost = this.posts[0];
        this.postId = temp._id;

        this.state = {
            user: {
                _id: '',
                username: ''
            },
            posts: {
                posts: []
            },
            tag:{

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

        this.postService.getAllPostsByTag("5fcffe58c0c2f34fccf5e711").then(res => res.json()).then(res => {
            this.setState({
                posts: {
                    res
                }
            });
            console.log(this.state.posts);
        })

        this.tagService.getTagByTagId("5fcffe58c0c2f34fccf5e711").then(res => res.json()).then(res => {
            this.setState({
                tag: {
                    res
                }
            });
            console.log(this.state.tag.res);
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
        if (!this.currentPost.interested.contains(this.state.user._id)) {
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

    formatTagName(tag) {
        if (tag !== null && tag !== undefined) {
            return tag.department+"-"+tag.courseNumber+"-"+tag.year+"-"+tag.semester;
        }
    }

    //post need a post title
    //tag need a getTagByTagId
    //post need a group formed property
    //{this.currentPost.title}
    //<span>{this.formatDate(this.state.posts.posts[0].createdAt)}</span>
    //{this.currentPost.text}
    //{this.currentPost.tagId.department}
    render() {
        return (
            <div>
                <Jumbotron fluid style={{width: '90%', margin: 'auto', minHeight: "150px"}}>
                    <h1>suppose to have a post title here</h1>
                    <p>
                        <span>User.getUser(Post.userId).name</span>
                        <span>&nbsp; &nbsp; &nbsp;</span>

                    </p>
                    <p>
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
                            <Button variant="primary" disabled>{this.formatTagName(this.state.tag.res)}</Button>
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
                    <CommentForm postId={this.state.posts[0]}/>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default Post;