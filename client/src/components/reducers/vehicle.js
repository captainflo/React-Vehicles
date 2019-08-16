import { GET_MY_VEHICLE } from '../actions/types';

export default function(state = {}, action){
    switch (action.type) {
        case GET_MY_VEHICLE:
            return action.payload || false;
        default:
            return state
    }
}