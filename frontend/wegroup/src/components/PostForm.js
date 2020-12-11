import  {Form, Row, Col, Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import React, {useState} from "react";
import Select from "react-select";


const PostForm = () => {
    const selectOptions = [
        {value: 'CS5500-FALL-2020', label: 'CS5500-FALL-2020'},
        {value: 'CS5610-FALL-2020', label: 'CS5610-FALL-2020'},
        {value: 'CS5800-FALL-2020', label: 'CS5800-FALL-2020'}
        ]
    // const history = useHistory();
    // const onClickSearch = () => {
    //     history.push('/tab_form_search');
    // }
    // const onClickCreate = () => {
    //     history.push('/tab_form_create');
    // }
    const [selectedTag, setTag] = useState(null);

    const handleChange = (newValue: any, actionMeta: 'select-option') => {
        setTag(newValue);
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={{span: 4, offset: 2}}>
                        <Form style={{marginTop: '2rem', width: '44rem', padding: "3rem 5rem", backgroundColor: '#eeeeee' }}>
                            <Form.Group>
                            <Form.Label>Project Design</Form.Label>
                                <Form.File custom data-browse="Browse" id="postImage" label="Upload Image"/>
                            </Form.Group>
                            <Form.Group controlId="postDescription">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                            <Form.Group controlId="Tags">
                                <Form.Label>Tags</Form.Label>
                                <Select
                                className="basic-single"
                                defaultValue={selectOptions[0]}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={false}
                                isSearchable={true}
                                name="tag"
                                options={selectOptions}
                                value={selectedTag}
                                onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{backgroundColor: '#eb2b2b', border: "none"}}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

// <div>
//     <Button variant="secondary" size="sm" style={{marginRight: '1rem'}} onClick={onClickSearch}>Select Tag</Button>
//     <Button variant="secondary" size="sm" onClick={onClickCreate}>Create New Tag</Button>
// </div>

export default PostForm;
