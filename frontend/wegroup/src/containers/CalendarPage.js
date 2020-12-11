import React, { Component } from 'react';
import {Nav, Tab, Container, Row, Col, Image} from 'react-bootstrap';
import SideNav from "../components/SideNav";
import WeGroupNavbar from "./WeGroupNavbar";
import GroupTab from "../components/GroupTab";
import Calendar from "../components/Calendar";

// import "../styles/ActivityPage.css"
// import PostCard from "../components/PostCard";

const tabs = ['tab1', 'tab2', 'tab3', 'tab4'];

class CalendarPage extends Component {
    renderTabs() {
        return tabs.map((tab, index) =>
            <Nav.Item key={index}>
                <Nav.Link eventKey={index}>{tab}</Nav.Link>
            </Nav.Item>
        )
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
                        <div class="main-page">
                            <Calendar />
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default CalendarPage;
