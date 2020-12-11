import React, { Component } from 'react';
import {Nav, Tab, Container, Row, Col, Image} from 'react-bootstrap';
import SideNav from "../components/SideNav";
import WeGroupNavbar from "./WeGroupNavbar";
import Post from "../components/Post"

//import "../styles/ActivityPage.css"


const tabs = ['tab1', 'tab2', 'tab3', 'tab4'];
const posts = [{title: 'post 1'}, {title: 'post 2'}];

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