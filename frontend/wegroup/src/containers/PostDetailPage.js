import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import SideNav from "../components/SideNav";
import WeGroupNavbar from "./WeGroupNavbar";
import Post from "../components/Post"
import { withRouter } from "react-router";

import "../styles/PostDetailPage.css"
import PostService from "../services/PostService";


class PostDetailPage extends Component {
    constructor(props) {
        super(props);
        this.postService = PostService.instance;

        this.state = {
            post: {}
        }
    }

    componentDidMount() {
         this.postService.getPostById(this.props.match.params.id).then(res => res.json()).then(res => {
            this.setState({post: res});
        })
    }

    render() {
        return (
            <div>
                <WeGroupNavbar />
                <Container fluid style={{padding: 0}}>
                    <div>
                        <div>
                            <SideNav />
                        </div>
                        <div className={'postDetailPage'}>
                            <div>
                                <Post post={this.state.post} />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default withRouter(PostDetailPage);
