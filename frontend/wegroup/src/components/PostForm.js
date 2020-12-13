import  {Form, Row, Col, Button, Modal} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import Select from "react-select";
import TagService from "../services/TagService";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import {IconButton} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TabForm from "./TabForm";

const PostForm = () => {
    const [formData, setFormData] = useState({
        img: null,
        text: '',
        tagId : '',
        userId: '',
        title: '',
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
        console.log(formData.title);
        postService.createPost(formData)
            .then(r => {
            if (r.status !== 200) {
                alert("Something went wrong when creating post!");
            } else {
                setFormData({
                    img: null,
                    text: '',
                    tagId : '',
                    title:'',
                })
                setFileName("Upload Design Image");
                alert("Post Succeed!");
            }
        })
    }

    const [allTags, setAllTags] = useState([]);
    useEffect(() => {
        fetchTag();
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const [selectedTag, setTag] = useState(null);

    const handleChange = (newValue: any, actionMeta: 'select-option') => {
        setTag(newValue);
        setFormData({...formData, 'tagId': newValue.tagId})
    }

    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const [showModal, setShowModal] = useState(false);
    const handleOnClickCreateTag = () => {
        setShowModal(true)
    }
    const handleClose = () => setShowModal(false);

    const handleOnSelectFile = (e) => {
        setFileName(e.target.files[0].name);
        setFormData({...formData, img: e.target.files[0]})
    }

    const [fileName, setFileName] = useState("Upload Design Image");


    return (
        <div>
            <Container>
                <Row>
                    <Col xs={{span: 4, offset: 2}}>
                        <Form style={{marginTop: '2rem', width: '44rem', padding: "3rem 5rem", backgroundColor: '#eeeeee' }}>
                            <Form.Group controlId="postTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control as="textarea" rows={1} name="title" onChange={handleOnChange} value={formData.title}/>
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Project Design</Form.Label>
                                <Form.File custom id="postImage">
                                    <Form.File.Input onChange={handleOnSelectFile}/>
                                    <Form.File.Label data-browse={"Browse"}>
                                        {fileName}
                                    </Form.File.Label>
                                </Form.File>
                            </Form.Group>
                            <Form.Group controlId="postDescription">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="text" onChange={handleOnChange} value={formData.text}/>
                            </Form.Group>
                            <Form.Group controlId="Tags">
                                <Form.Label>Tags</Form.Label>
                                <Select
                                className="basic-single"
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
                                <IconButton style={{fontSize: "1rem",padding: "12px 5px"}} onClick={handleOnClickCreateTag}>
                                    <AddCircleOutlineIcon style={{marginRight: "0.5rem", marginLeft: "0"}}/>create new tag
                                </IconButton>
                            </Form.Group>
                            <Button variant="primary" style={{backgroundColor: '#eb2b2b', border: "none"}} onClick={handleOnSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Modal show={showModal}>
                    <Modal.Body>
                        <TabForm search={false}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    )
}


export default PostForm;
