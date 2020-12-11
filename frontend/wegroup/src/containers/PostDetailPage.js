import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import SideNav from "../components/SideNav";
import WeGroupNavbar from "./WeGroupNavbar";
import Post from "../components/Post"


// const tabs = ['tab1', 'tab2', 'tab3', 'tab4'];
// const posts = [{title: 'post 1'}, {title: 'post 2'}];

class PostDetailPage extends Component {
    render() {
        return (
            <div>
                <WeGroupNavbar />
                <Container fluid style={{padding: 0}}>
                    <div>
                        <div>
                            <SideNav />
                        </div>
                        <div class="main-page">
                            <div>
                                <Post />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default PostDetailPage;