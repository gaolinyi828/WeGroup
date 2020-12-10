import UserService from "../services/UserService";
import {
    SIGN_UP,
    LOG_IN,
    LOG_OUT
} from './types';

const userService = UserService.instance;

const setAuthToken = token => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

export const signup = (dispatch, user) => {
    userService.createUser(user).then(res => res.json()).then(res => {
        setAuthToken(res.token);
        dispatch({
            type: SIGN_UP,
            payload: res
        });
    });
}

export const login = (dispatch, user) => {
    userService.loginUser(user).then(res => res.json()).then(res => {
        setAuthToken(res.token);
        dispatch({
            type: LOG_IN,
            payload: res
        });
    });
    alert("Successfully logged in");
};

export const logout = (dispatch) => {
    setAuthToken(null);
    dispatch({
        type: LOG_OUT,
    });
};
