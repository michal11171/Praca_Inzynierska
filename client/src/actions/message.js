import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_THREADS,
    THREAD_ERROR,
    ADD_MESSAGE,
    GET_THREAD
} from './types';

//Get threads
export const getThreads = () => async dispatch => {
    try {
        const res = await axios.get('api/messages/threads');

        dispatch({
            type: GET_THREADS,
            payload: res.data && res.data.threads ? res.data.threads : []
        });
    } catch (err) {
        console.log('tu', err);
        dispatch({
            type: THREAD_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



//Add thread
export const getThread = (user2) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/messages/get_thread', { user2 }, config);

        dispatch({
            type: GET_THREAD,
            payload: res.data
        });
        // dispatch(setAlert('Pomyślnie dodano wątek', 'success'));
    } catch (err) {
        dispatch({
            type: THREAD_ERROR,
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
        const res = await axios.post(`/api/messages/send/${threadId}`, formData, config);

        dispatch({
            type: ADD_MESSAGE,
            payload: res.data
        });
        dispatch(setAlert('Pomyślnie dodano wiadomosc', 'success'));
    } catch (err) {
        dispatch({
            type: THREAD_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
