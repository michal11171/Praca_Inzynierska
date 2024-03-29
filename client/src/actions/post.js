import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    FILTER_BY_VALUE,
    UPDATE_FAVOURITES,
    REPORT_POST,
    UPDATE_REPORTS
} from './types';


export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const deletePost = id => async dispatch => {
    try {
        const res = await axios.delete(`api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch(setAlert('Pomyślnie usunięto ogłoszenie', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert('Pomyślnie dodano ogłoszenie', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(setAlert('Pomyślnie dodano komentarz', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const deleteComment = (postId, commentId) => async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
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

export const addFavourites = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/favourite/${id}`);

        dispatch({
            type: UPDATE_FAVOURITES,
            payload: { id, favourites: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const removeFavourites = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/unfavourite/${id}`);

        dispatch({
            type: UPDATE_FAVOURITES,
            payload: { id, favourites: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


export const reportPost = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/report/${id}`);

        dispatch({
            type: UPDATE_REPORTS,
            payload: { id, reports: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const unreportPost = id => async dispatch => {
    try {
        const res = await axios.put(`api/posts/unreport/${id}`);

        dispatch({
            type: UPDATE_REPORTS,
            payload: { id, reports: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const filterByValue = payload => ({
    type: FILTER_BY_VALUE,
    payload
});