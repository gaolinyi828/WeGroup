let _singleton = Symbol();
const USER_API_URL = 'http://localhost:8080/users';


class UserService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new UserService(_singleton);
        return this[_singleton]
    }

    createUser(user) {
        return fetch(`${USER_API_URL}/signup`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    loginUser(user) {
        return fetch(`${USER_API_URL}/login`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    loadUser() {
        const token = localStorage.getItem('token');
        return fetch(`${USER_API_URL}/auth`, {
            headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
    }

    updateUser(user) {
        return fetch(`${USER_API_URL}/update`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
    }

    getUsersByIds(userIds) {
        return fetch(`${USER_API_URL}/ids`, {
            body: JSON.stringify(userIds),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    getUserByUserId(userId) {
        return fetch(`${USER_API_URL}/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
    }
}

export default UserService;
