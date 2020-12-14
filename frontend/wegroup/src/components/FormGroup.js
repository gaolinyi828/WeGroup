import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import UserService from "../services/UserService";
import TeamService from "../services/TeamService";

class FormGroup extends Component {
    constructor(props) {
        super(props);

        this.userService = UserService.instance;
        this.teamService = TeamService.instance;
        this.onChangeGroupName = this.onChangeGroupName.bind(this);
        this.onFormGroup = this.onFormGroup.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.state = {
            group: {
                teamName: '',
                members: []
            },
            candidates: [],
            selected: []
        }
    }

    onChangeGroupName(e) {
        this.setState({group: {...this.state.group, teamName: e.target.value}});
    }

    componentDidMount() {
        this.userService.getUsersByIds(this.props.post.interested).then(res => res.json()).then(res => {
            this.setState({group: {...this.state.group, userId: this.props.post.userId, tagId: this.props.post.tagId, postId: this.props.post._id}, candidates: res})
        })
    }

    renderCandidates() {
        return this.state.candidates.map((candidate, index) =>
            <Form.Check key={index} id={candidate._id} type="checkbox" >
                <Form.Check.Input onChange={this.handleCheckClick} type="checkbox" />
                <Form.Check.Label>{candidate.username}</Form.Check.Label>
            </Form.Check>
        );
    }

    onFormGroup() {
        console.log('here');
        this.teamService.createTeam(this.state.group).then(res => {
            console.log(res);
            if (res.status !== 200) {
                alert("Something went wrong when creating group")
            } else {
                alert("Successfully create group");
                this.props.closeFormGroup();
            }
        });
    }

    handleCheckClick = (e) => {
        let newState = this.state;
        if (e.target.checked) {
            newState.group.members.push(e.target.id);
        } else {
            const index = newState.group.members.indexOf(e.target.id);
            if (index > -1) {
                newState.group.members.splice(index, 1);
            }
        }
        this.setState(newState);
    }

    render() {
        return (
            <Form>
                <div style={{width: '30%', margin: '30px auto'}}>
                    <h1 style={{display: 'flex', justifyContent: 'center'}}>Form Group</h1>
                </div>
                <Form.Group controlId="formGroup.NameInput">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control onChange={this.onChangeGroupName} type="text" placeholder="Your group name" />
                </Form.Group>
                <Form.Group id="formGridCheckbox">
                    <div key={`inline-checkbox`} className="mb-3">
                        {this.renderCandidates()}
                    </div>
                </Form.Group>
                <Button onClick={this.onFormGroup} variant="primary" type="button">
                    Form Group
                </Button>
            </Form>
        )
    }
}

export default FormGroup;
