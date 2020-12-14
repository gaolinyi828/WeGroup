import WeGroupNavbar from "./WeGroupNavbar";
import {Container} from "react-bootstrap";
import SideNav from "../components/SideNav";
import React from "react";
import PostForm from "../components/PostForm";
import "../styles/ActivityPage.css";

// This is create post page component
const PostCreate = () => {
    return (
        <div>
            <WeGroupNavbar/>
            <Container fluid style={{padding: 0}}>
                <div>
                    <div>
                        <SideNav/>
                    </div>
                    <div className="main-page">
                        <PostForm/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default PostCreate;
