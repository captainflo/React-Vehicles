import { AUTH_USER, AUTH_ERROR, EDIT_USER, GET_USER_ID, INFO_USER } from '../actions/types';
const INITIAL_STATE = {
    authenticated: '',
    user: '',
    errorMessage: '',
    infoUser: '',
};

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case AUTH_USER:
            return {...state, authenticated: action.payload || false};
        case INFO_USER:
            return {...state, infoUser: action.payload || false};
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