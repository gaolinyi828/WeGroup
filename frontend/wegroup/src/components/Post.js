import React, { Component } from 'react';
import {ListGroup, Jumbotron, Button, Row, Tab, Image} from 'react-bootstrap';
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import moment from 'moment';
import UserService from "../services/UserService";
import PostService from "../services/PostService";
import TagService from "../services/TagService";
import CommentService from "../services/CommentService";

class Post extends Component {
    constructor(props) {
        super(props);

        this.userService = UserService.instance;
        this.tagService = TagService.instance;
        this.postService = PostService.instance;
        this.commentService = CommentService.instance;

        this.interestPost = this.interestPost.bind(this);
        this.uninterestPost = this.uninterestPost.bind(this);
        this.replyComment = this.replyComment.bind(this);

        this.state = {
            user: {
                _id: '',
                username: ''
            },
            tag:'',
            comments: [],
            reload: false
        }
    }

    componentDidMount() {
        this.userService.loadUser().then(res => res.json()).then(res => {
            this.setState({
                ...this.state,
                user: {
                    _id: res._id,
                    username: res.username,
                    groups: res.teams,
                    posts: res.postsCreatedByUser,
                    interested_posts: res.postsInteracted
                }
            });
        })
    }

    componentWillReceiveProps(newProps) {
        this.tagService.getTagByTagId(newProps.post.tagId).then(res => res.json()).then(res => {
            this.setState({
                ...this.state,
                tag: res
            });
        });

        this.commentService.getAllCommentsByPostId(newProps.post._id).then(res => res.json()).then(res => {
            console.log(res)
            this.setState({
                ...this.state,
                comments: res
            });
        })
    }

    renderInterestList(post) {
        if (post.interested !== null && post.interested !== undefined) {
            if (post.interested.length >0) {
                return (<ListGroup horizontal>
                    {post.interested.map((person, index)=> (
                        <ListGroup.Item>
                        <Image src="data:image/png;base64,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" style={{width: "35px", height: "auto"}} roundedCircle />
                        <span href='' style={{width: "35px", height: "auto"}}>{person.username}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>);
            } else {
                return (
                    <span style={{fontStyle: "italic"}}>No one has interested this post yet</span>
                )
            }
        }
    }

    renderInterestButton() {
        if (this.props.post.interested) {
            if (!this.props.post.interested.includes(this.state.user._id)) {
                return (
                    <div style={{ display: "flex" }}>
                        <Button variant="warning" style={{ marginLeft: "auto" }} onClick={this.interestPost}>Interest</Button>
                    </div>
                )
            } else {
                return (
                    <div style={{ display: "flex" }}>
                        <Button variant="dark" style={{ marginLeft: "auto" }} onClick={this.uninterestPost}>Interested</Button>
                    </div>
                )
            }
        }
    }

    interestPost() {
        this.postService.addToInterestedList(this.props.post._id, this.state.user._id).then(r => {
            if (r.status !== 200) {
                alert("Something went wrong when creating post!");
            } else {
                // setFormData({
                //     text: '',
                //     tagId : '',
                // })
            }
        })
    }

    uninterestPost() {
        this.postService.deleteFromInterestedList(this.props.post._id, this.state.user._id).then(r => {
            if (r.status !== 200) {
                alert("Something went wrong when creating post!");
            } else {
                // setFormData({
                //     text: '',
                //     tagId : '',
                // })
            }
        })
    }

    renderComments(post) {
        if (this.state.comments && this.state.comments.length) {
            if (this.state.comments.length === 0) {
                return (
                    <Tab.Pane>
                        <Row style={{margin: '1rem'}}>
                            There is no comment yet.
                        </Row>
                    </Tab.Pane>
                )
            } else {
                return this.state.comments.map((comment,index) => {
                    return (
                        <Tab.Pane key={index} eventKey={index}>
                            <Row key={index} style={{margin: '1rem'}}>
                                <CommentItem comment={comment}/>
                            </Row>
                        </Tab.Pane>
                    )
                });
            }
        }
    }

    replyComment() {
        if(this.state.user &&this.state.user._id && this.props.post._id) {
            return (<CommentForm postId={this.props.post._id} userId={this.state.user._id}/>);
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
    //
    //{this.currentPost.text}
    //{this.currentPost.tagId.department}
    render() {
        return (
            <div>
                <Jumbotron fluid style={{width: '90%', margin: 'auto', minHeight: "150px"}}>
                    <h1>{this.props.post.title}</h1>
                    <p>
                        <span>Posted by: {this.props.post.userId}</span>
                        <span>&nbsp; &nbsp; &nbsp;</span>
                        <span>Posted at: {this.formatDate(this.props.post.createdAt)}</span>
                    </p>
                    <p>
                        {this.props.post.text}
                    </p>
                    <div>
                        <h6>People interested in this project:</h6>
                        <span>
                            {this.renderInterestList(this.props.post)}
                        </span>
                    </div>
                    <p style={{marginTop:"20px"}}>
                        Tag:
                        <span>
                            <Button variant="primary" disabled>{this.formatTagName(this.state.tag)}</Button>
                        </span>
                    </p>
                    {this.renderInterestButton()}
                    <div>if user state == currentPost.userId && currentPost.interested.size > 0)
                        <Button variant="success">Form Group</Button>
                        need have a form group component
                        else
                        <Button variant="success" disabled>Form Group</Button>
                    </div>
                </Jumbotron>
                <div>
                    {this.replyComment()}
                </div>
                <div>
                    {this.renderComments()}
                </div>
            </div>
        )
    }
}

export default Post;