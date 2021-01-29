import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
    UPDATE_LIKESC,
    ADD_COMMENTP,
    REMOVE_COMMENTP,
    UPDATE_UNLIKESC
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };
        case ADD_COMMENTP:
            return {
                ...state,
                profile: { ...state.profile, comments: payload },
                loading: false
            };
        case REMOVE_COMMENTP:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    comments: state.profile.comments.filter(
                        comment => comment._id !== payload
                    )
                },
                loading: false
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false
            }
        // case UPDATE_LIKESC:
        //     return {
        //         ...state,
        //         profiles: state.profiles.map(profile => profile._id === payload.id ? { ...profile, likes: payload.likes } : profile),
        //         loading: false
        //     };
        case UPDATE_LIKESC:
            return {
                ...state,
                profile: { ...state.profile, likes: payload.likes },
                loading: false
            };
        case UPDATE_UNLIKESC:
            return {
                ...state,
                profile: { ...state.profile, unlikes: payload.unlikes },
                loading: false
            };
        default:
            return state;
    }
}