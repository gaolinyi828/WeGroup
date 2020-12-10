import React from "react";
import "../styles/SideNav.css";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Row from "react-bootstrap/Row";
import { Nav} from "react-bootstrap";


// need to ad nav panels
const SideNav = () => {
    return (
            <Nav className={'sidenav'}
            >
                <Nav.Item className={'item'}>
                        <Nav.Link style={{color: '#0a0a0a'}}>
                        <Row>
                                <NotificationsActiveIcon style={{fontSize: '6rem'}} />
                                </Row>
                                <Row>
                                    <div style={{margin: 'auto'}} >Activity</div>
                                </Row>
                        </Nav.Link>
                </Nav.Item >
                <Nav.Item className={'item'}>
                    <Nav.Link style={{color: '#0a0a0a'}}>
                        <Row>
                            <QuestionAnswerIcon style={{fontSize: '6rem'}} />
                        </Row>
                        <Row>
                            <div style={{margin: 'auto'}}>Chat</div>
                        </Row>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className={'item align-item-center'}>
                    <Nav.Link style={{color: '#0a0a0a'}}>
                        <Row>
                            <EventNoteIcon style={{fontSize: '6rem', margin: 'auto'}} />
                        </Row>
                        <Row>
                            <div style={{margin: 'auto'}}>Calendar</div>
                        </Row>
                    </Nav.Link>
                </Nav.Item>
            </Nav>

    )
}

export default SideNav;