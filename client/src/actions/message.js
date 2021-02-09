import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_THREADS,
    POST_ERROR,
    ADD_THREAD,
    ADD_MESSAGE,
} from './types';

//Get threads
export const getThreads = () => async dispatch => {
    try {
        const res = await axios.get('api/threads');

        dispatch({
            type: GET_THREADS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



//Add thread
export const addThread = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/get_thread', formData, config);

        dispatch({
            type: ADD_THREAD,
            payload: res.data
        });
        dispatch(setAlert('Pomyślnie dodano wątek', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Add message
export const addMessage = (threadId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/send/${threadId}`, formData, config);

        dispatch({
            type: ADD_MESSAGE,
            payload: res.data
        });
        dispatch(setAlert('Pomyślnie dodano wiadomosc', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
