import { AUTH_USER, AUTH_ERROR, EDIT_USER, GET_USER_ID } from '../actions/types';
const INITIAL_STATE = {
    authenticated: '',
    user: '',
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case AUTH_USER:
            return {...state, authenticated: action.payload || false};
        case EDIT_USER:
            return {...state, authenticated: action.payload || false};
        case GET_USER_ID:
                return {...state, user: action.payload};
            case AUTH_ERROR:
                return {...state, errorMessage: action.payload};
        default:
            return state
    }
}