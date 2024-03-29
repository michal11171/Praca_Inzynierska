import axios from 'axios';
import { setAlert } from './alert';

import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    ADD_COMMENTP,
    POST_ERROR,
    REMOVE_COMMENTP,
    UPDATE_LIKESC,
    UPDATE_UNLIKESC,
    UPDATE_LIKES,
    UPDATE_USER
} from './types';


export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profil zaktualizowany' : 'Profil utworzony', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Pomyślnie dodano miejsce pracy', 'success'));
        history.push('/dashboard');

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Usunięto miejsce pracy', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



export const deleteAccount = () => async dispatch => {
    if (window.confirm('Jesteś pewien? Twoje konto nie będzie mogło zostać przywrócone.')) {
        try {
            await axios.delete(`api/profile`);

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Twoje konto zostało usunięte', 'success'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }

};


export const addComment = (profileId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/profile/commentP/${profileId}`, formData, config);

        dispatch({
            type: ADD_COMMENTP,
            payload: res.data
        });
        dispatch(setAlert('Pomyślnie dodano opinie', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const deleteComment = (profileId, commentId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/commentP/${profileId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENTP,
            payload: commentId
        });
        dispatch(setAlert('Pomyślnie usunięto komentarz', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const addLikeP = id => async dispatch => {
    try {
        const res = await axios.put(`/api/profile/like/${id}`);
        dispatch({
            type: UPDATE_LIKESC,
            payload: { id, likes: res.data }
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const removeLikeP = id => async dispatch => {
    try {
        const res = await axios.put(`/api/profile/unlike/${id}`);

        dispatch({
            type: UPDATE_UNLIKESC,
            payload: { id, unlikes: res.data }
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const banUser = id => async dispatch => {
    try {
        const res = await axios.put(`/api/users/ban/${id}`);
        dispatch({
            type: UPDATE_USER,
            payload: { id, ban: res.data }

        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const unbanUser = id => async dispatch => {
    try {
        const res = await axios.put(`/api/users/unban/${id}`);
        dispatch({
            type: UPDATE_USER,
            payload: { id, ban: res.data }

        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};