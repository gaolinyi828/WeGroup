let _singleton = Symbol();
const TEAM_API_URL = 'http://localhost:8080/teams';


class TeamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TeamService(_singleton);
        return this[_singleton]
    }

    createTeam(team) {
        return fetch(`${TEAM_API_URL}/team`, {
            body: JSON.stringify(team),
            headers: {
            'Content-Type': 'application/json'
            },
            method: 'POST'
        }
    )}

    deleteTeam(teamId) {
        return fetch(`${TEAM_API_URL}/team/delete/${teamId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        }
        )
    }

    getTeamListByUserId(userId) {
        return fetch(`${TEAM_API_URL}/team/getTeamList/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
    }
}