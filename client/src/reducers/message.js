import {
    GET_THREADS,
    POST_ERROR,
    ADD_THREAD,
    GET_THREAD,
    ADD_MESSAGE,

} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_THREADS:
            return {
                ...state,
                threads: payload,
                loading: false
            };
        case ADD_THREAD:
            return {
                ...state,
                threads: [payload, ...state.threads],
                loading: false
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case ADD_MESSAGE:
            return {
                ...state,
                thread: { ...state.thread, messages: payload },
                loading: false
            };
        default:
            return state;
    }
}