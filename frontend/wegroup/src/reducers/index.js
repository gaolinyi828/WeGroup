import {
    SIGN_UP,
    LOG_IN,
    LOG_OUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    user: null
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SIGN_UP:
            return {
                ...state,
                ...payload,
                isAuthenticated: true
            };
        case LOG_IN:
            return {
                ...state,
                ...payload,
                isAuthenticated: true
            };
        case LOG_OUT:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}
