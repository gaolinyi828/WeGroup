import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import TeamService from "../services/TeamService";

class GroupTab extends Component {
    constructor(props) {
        super(props);

        this.teamService = TeamService.instance;
        this.state = {
            groups: []
        }
    }

    componentWillReceiveProps(newProps) {
        this.teamService.findAllTeamsByIds(newProps.groups).then(res => res.json()).then(res => {
            this.setState({groups: res});
        });
    }

    renderGroups() {
        this.state.groups.map((group, index) => {
            return (
                <Card key={index} style={{ width: '90%', margin: '5%' }}>
                    <Card.Body>
                        <Card.Title>{group.teamName}</Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderGroups()}
            </div>
        )
    }
}

export default GroupTab;
