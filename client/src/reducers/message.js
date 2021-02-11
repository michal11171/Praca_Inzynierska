import {
    GET_THREADS,
    GET_THREAD,
    ADD_MESSAGE,
    THREAD_ERROR

} from '../actions/types';

const initialState = {
    threads: [],
    thread: null,
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
        case GET_THREAD:
            return {
                ...state,
                thread: payload,
                loading: false
            };
        case THREAD_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case ADD_MESSAGE:
            return {
                ...state,
                thread: { ...state.thread, messages: [...state.thread.messages, payload] },
                loading: false
            };
        default:
            return state;
    }
}
