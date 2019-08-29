import { EDIT_RESERVATION, RESERVATION_ERROR, GET_MY_RESERVATION } from '../actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case EDIT_RESERVATION:
            return action.payload || false;
        case GET_MY_RESERVATION:
            return action.payload;
        case RESERVATION_ERROR:
            return action.payload;
        default:
            return state
    }
}