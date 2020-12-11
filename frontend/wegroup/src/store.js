import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
    token: localStorage.getItem('token'),
    user: null
};

const store = createStore(
    reducer,
    initialState,
);

export default store;
