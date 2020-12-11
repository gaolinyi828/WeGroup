import  {Form, Row, Col, Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import TagService from "../services/TagService";
import PostService from "../services/PostService";
import UserService from "../services/UserService";

const PostForm = () => {
    const [formData, setFormData] = useState({
        text: '',
        tagId : '',
        userId: '',
    })
    const tagService = TagService.instance;
    const postService = PostService.instance;
    const userService = UserService.instance;
    const fetchTag = () => {
        tagService.getAllTags().then(res => res.json()).then(res => {
            setAllTags(res);
            let tagOptions = [];
            res.forEach((tag) => {
                const tagString = tag.department+'-'+tag.courseNumber+'-'+tag.semester+'-'+tag.year;
                const option = {value: tagString, label: tagString, tagId: tag._id};
                tagOptions.push(option);
                return;
            })
            setAllTags(tagOptions);
        })

    }

    const fetchUser= () => {
        userService.loadUser().then(res => res.json()).then(res => {
            setFormData({...formData, userId: res._id});
        })
    }


    const handleOnSubmit = () => {
        postService.createPost(formData).then(r => {
            if (r.status !== 200) {
                // console.log("status not 200");
                alert("Something went wrong when creating post!");
            } else {
                setFormData({
                    text: '',
                    tagId : '',
                })
            }
        })
    }

    const [allTags, setAllTags] = useState([]);
    useEffect(() => {
        fetchTag();
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const selectOptions = [
        {value: 'CS5500-FALL-2020', label: 'CS5500-FALL-2020'},
        {value: 'CS5610-FALL-2020', label: 'CS5610-FALL-2020'},
        {value: 'CS5800-FALL-2020', label: 'CS5800-FALL-2020'}
        ]
    const [selectedTag, setTag] = useState(null);

    const handleChange = (newValue: any, actionMeta: 'select-option') => {
        setTag(newValue);
        setFormData({...formData, 'tagId': newValue.tagId})
    }

    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
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
                                <Form.Control as="textarea" rows={3} name="text" onChange={handleOnChange} value={formData.text}/>
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
                                options={allTags}
                                value={selectedTag}
                                onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" style={{backgroundColor: '#eb2b2b', border: "none"}} onClick={handleOnSubmit}>
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
