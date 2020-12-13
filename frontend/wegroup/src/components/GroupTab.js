import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import TeamService from "../services/TeamService";

class GroupTab extends Component {
    renderGroups() {
        if (!this.props.groups || this.props.groups.length === 0) return (
            <div style={{textAlign: 'center', marginTop: '30%', fontWeight: 220, fontSize: '2rem'}}>
                <p>You hasn't joined any group yet</p>
            </div>
        )
        return this.props.groups.map((group, index) => {
            return (
                <Card key={index} style={{ width: '90%', margin: '5%' }}>
                    <Card.Body>
                        <Card.Title>{group.teamName}</Card.Title>
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
