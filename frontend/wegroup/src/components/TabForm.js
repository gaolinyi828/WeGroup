import React, {useState} from 'react';
import {Form, Col, Row, Button, Container} from 'react-bootstrap';
import TagService from "../services/TagService";
import {useHistory} from "react-router";



const TabForm = (props) => {
    const tagService = TagService.instance;
    const history = useHistory();
    const [formData, setFormData] = useState({
        department: '',
        courseNumber: '',
        semester: "Fall",
        year: '',
    })


    const handleOnCreate = () => {
        tagService.createTag(formData).then(res => {
            if (res.status !== 201) {
                alert("Something went wrong creating the tag!")
            } else {
                history.push("/create_post");
            }

        });
    }

    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    return (
        <Container fluid>
            <Row>
                <Col xs={{span: 10, offset: 2}}>
                    <Form>
                        <Form.Group as={Row} controlId="searchTabDepartment">
                            <Form.Label column sm={2} style={{marginRight: "1rem"}}>
                                Department
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control name={"department"} type="text" placeholder="Course Department: e.g. CS" onChange={handleOnChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="searchTabCourseNumber">
                            <Form.Label column sm={2} style={{marginRight: "1rem"}}>
                                Course Number
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control name= {"courseNumber"} type="number" placeholder="Course Number, e.g. 5500" onChange={handleOnChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="searchTabYear">
                            <Form.Label column sm={2} style={{marginRight: "1rem"}}>
                                Year
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control name={"year"} type="number" placeholder="Course Year, e.g. 2020" onChange={handleOnChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="searchTabYear">
                            <Form.Label column sm={2} style={{marginRight: "1rem"}}>
                                Semester
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control name={"semester"} as="select" onChange={handleOnChange}>
                                    <option value={"Fall"}>Fall</option>
                                    <option value={"Summer"}>Summer</option>
                                    <option value={"Spring"}>Spring</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            {props.search && <Col>
                                <Button type="submit">Search</Button>
                            </Col>}
                            {!props.search && <Col>
                                <Button onClick={handleOnCreate}>Create</Button>
                            </Col>}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default TabForm;
