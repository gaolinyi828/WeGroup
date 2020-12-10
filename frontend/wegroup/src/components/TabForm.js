import React from 'react';
import {Form, Col, Row, Button, Container} from 'react-bootstrap';



const TabForm = (props) => {
    return (
        <Container fluid>
            <Row>
                <Col xs={{span: 6, offset: 2}}>
                    <Form>
                        <Form.Group as={Row} controlId="searchTabDepartment">
                            <Form.Label column sm={2}>
                                Department
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Course Department: e.g. CS" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="searchTabCourseNumber">
                            <Form.Label column sm={2}>
                                Course Number
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Course Number, e.g. 5500" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="searchTabYear">
                            <Form.Label column sm={2}>
                                Year
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" placeholder="Course Year, e.g. 2020" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="searchTabYear">
                            <Form.Label column sm={2}>
                                Semester
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control as={"select"} >
                                    <option value={"Fall"}>Fall</option>
                                    <option value={"Summer"}>Summer</option>
                                    <option value={"Spring"}>Spring</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            {props.search && <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Search</Button>
                            </Col>}
                            {!props.search && <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Create</Button>
                            </Col>}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default TabForm;
