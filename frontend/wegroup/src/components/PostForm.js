import  {Form, Row, Col, Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import React from "react";
import { useHistory } from "react-router-dom";


const PostForm = ({}) => {
    const history = useHistory();
    const onClickSearch = () => {
        history.push('/tab_form_search');
    }
    const onClickCreate = () => {
        history.push('/tab_form_create');
    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={{span: 4, offset: 4}}>
                        <Form style={{marginTop: '1rem'}}>
                            <Form.Group>
                                <Form.File id="postImage" label="Upload Project Design" />
                            </Form.Group>
                            <Form.Group controlId="postDescription">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group controlId="Tags">
                                <Form.Label>Tags</Form.Label>
                                <div>
                                    <Button variant="secondary" size="sm" style={{marginRight: '1rem'}} onClick={onClickSearch}>Select Tag</Button>
                                    <Button variant="secondary" size="sm" onClick={onClickCreate}>Create New Tag</Button>
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PostForm;
