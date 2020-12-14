import React from "react";
import "../styles/SideNav.css";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Row from "react-bootstrap/Row";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


// need to add nav panels when we add chat and calendar features in the future
// This is the side nav bar component
const SideNav = () => {
    return (
            <Nav className={'sidenav'} style={{backgroundColor: '#692929', color: '#0a0a0a', textAlign: 'center'}}>
                <Nav.Item className={'item'}>
                    <Nav.Link>
                        <Row>
                            <Link to="/activity">
                                <NotificationsActiveIcon style={{fontSize: '3rem', color: 'white', margin: 'auto'}} />
                            </Link>
                        </Row>
                        <Row>
                            <div style={{margin: 'auto', color: 'white', fontSize: '12px'}} >Activity</div>
                        </Row>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className={'item'}>
                    <Nav.Link style={{color: '#0a0a0a'}}>
                        <Row>
                            <Link to="/chat">
                                <QuestionAnswerIcon style={{fontSize: '3rem', color: 'white', margin: 'auto'}} />
                            </Link>
                        </Row>
                        <Row>
                            <div style={{margin: 'auto', color: 'white', fontSize: '12px'}}>Chat</div>
                        </Row>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className={'item align-item-center'}>
                    <Nav.Link href="/calendar" style={{color: '#0a0a0a'}}>
                        <Row>
                            <Link to="/calendar">
                                <EventNoteIcon style={{fontSize: '3rem', color: 'white', margin: 'auto'}} />
                            </Link>
                        </Row>
                        <Row>
                            <div style={{margin: 'auto', color: 'white', fontSize: '12px'}}>Calendar</div>
                        </Row>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
    )
}

export default SideNav;
