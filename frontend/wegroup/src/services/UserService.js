let _singleton = Symbol();
const BASIC_URL = 'http://localhost:3000/';
const USER_API_URL = 'http://localhost:3000/users';


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
        return fetch(`${BASIC_URL}/signup`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
    }

    loginUser(user) {
        return fetch(`${BASIC_URL}/login`, {
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
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
}

export default UserService;
